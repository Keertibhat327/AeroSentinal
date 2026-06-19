"""
AeroSentinal — Backend API Tests
===================================
Tests for all endpoints using pytest + httpx async client.
Run with: pytest backend/tests/ -v
"""

import pytest
from httpx import AsyncClient, ASGITransport
from backend.app.main import app


@pytest.fixture
def client():
    """Create a test client."""
    transport = ASGITransport(app=app)
    return AsyncClient(transport=transport, base_url="http://test")


# ============================================================
# Health Check
# ============================================================

@pytest.mark.asyncio
async def test_health_check(client):
    async with client:
        r = await client.get("/health")
    assert r.status_code == 200
    data = r.json()
    assert data["status"] == "healthy"
    assert "subsystems" in data
    assert len(data["subsystems"]) == 5


# ============================================================
# Engine Endpoints
# ============================================================

@pytest.mark.asyncio
async def test_engine_quick(client):
    async with client:
        r = await client.get("/predict/engine/quick?unit_id=1&cycle=100")
    assert r.status_code == 200
    data = r.json()
    assert data["subsystem"] == "engine"
    assert 0 <= data["health_score"] <= 100
    assert data["predicted_rul"] >= 0
    assert "is_synthetic_data" in data


@pytest.mark.asyncio
async def test_engine_post(client):
    async with client:
        r = await client.post("/predict/engine", json={
            "unit_id": 1,
            "cycle": 200,
            "sensors": {"T24": 641.82, "T50": 1589.7},
            "operating_condition": 1,
        })
    assert r.status_code == 200
    data = r.json()
    assert data["subsystem"] == "engine"
    assert data["model_type"] == "BiLSTM+Attention"


# ============================================================
# Hydraulics Endpoint
# ============================================================

@pytest.mark.asyncio
async def test_hydraulics_quick(client):
    async with client:
        r = await client.get("/predict/hydraulics/quick")
    assert r.status_code == 200
    data = r.json()
    assert data["subsystem"] == "hydraulics"
    assert "reconstruction_error" in data


@pytest.mark.asyncio
async def test_hydraulics_post(client):
    async with client:
        r = await client.post("/predict/hydraulics", json={
            "sensors": {"PS1": 50.0},  # Low pressure = potential fault
        })
    assert r.status_code == 200
    data = r.json()
    assert data["reconstruction_error"] > 0


# ============================================================
# Landing Gear Endpoint
# ============================================================

@pytest.mark.asyncio
async def test_landing_gear(client):
    async with client:
        r = await client.get("/predict/landing-gear?brake_wear_pct=60")
    assert r.status_code == 200
    data = r.json()
    assert data["subsystem"] == "landing_gear"
    assert data["wear_severity"] in ("nominal", "moderate", "severe", "critical")
    assert data["brake_wear_pct"] == 60.0


@pytest.mark.asyncio
async def test_landing_gear_critical(client):
    async with client:
        r = await client.get("/predict/landing-gear?brake_wear_pct=90")
    assert r.status_code == 200
    data = r.json()
    assert data["wear_severity"] == "critical"
    assert data["health_score"] <= 15


# ============================================================
# APU Endpoint
# ============================================================

@pytest.mark.asyncio
async def test_apu_healthy(client):
    async with client:
        r = await client.get("/predict/apu?fouling_factor=0")
    assert r.status_code == 200
    data = r.json()
    assert data["subsystem"] == "apu"
    assert data["health_score"] >= 90


@pytest.mark.asyncio
async def test_apu_degraded(client):
    async with client:
        r = await client.get("/predict/apu?fouling_factor=0.8")
    assert r.status_code == 200
    data = r.json()
    assert data["health_score"] < 60


# ============================================================
# ECS Endpoint
# ============================================================

@pytest.mark.asyncio
async def test_ecs_nominal(client):
    async with client:
        r = await client.get("/predict/ecs?fouling_pct=0")
    assert r.status_code == 200
    data = r.json()
    assert data["health_score"] == 100
    assert data["coupling_effect_on_engine"] == 0.0
    assert data["delta_t_masked"] is False


@pytest.mark.asyncio
async def test_ecs_fouled_coupling(client):
    """The key differentiator: ECS fouling causes measurable engine coupling."""
    async with client:
        r = await client.get("/predict/ecs?fouling_pct=50")
    assert r.status_code == 200
    data = r.json()
    assert data["health_score"] == 50
    assert data["coupling_effect_on_engine"] > 5  # Significant coupling
    assert data["bleed_demand_anomaly"] is True
    assert data["delta_t_masked"] is True


# ============================================================
# Fusion Endpoint
# ============================================================

@pytest.mark.asyncio
async def test_fusion_health(client):
    async with client:
        r = await client.get("/fusion/health?aircraft_id=TEST01&ecs_fouling=30")
    assert r.status_code == 200
    data = r.json()
    assert data["aircraft_id"] == "TEST01"
    assert len(data["subsystems"]) == 5
    assert "acars_message" in data
    assert len(data["acars_message"]) <= 220
    assert "aog_risk" in data
    assert data["aog_risk"]["cost_per_hour_usd"] == 150000.0
    assert data["is_synthetic_data"] is True


@pytest.mark.asyncio
async def test_fusion_cross_domain_alerts(client):
    """When ECS is fouled, fusion should generate cross-domain alerts."""
    async with client:
        r = await client.get("/fusion/health?ecs_fouling=45")
    assert r.status_code == 200
    data = r.json()
    assert len(data["cross_domain_alerts"]) > 0
    assert any("ECS" in a for a in data["cross_domain_alerts"])


# ============================================================
# ACARS Endpoint
# ============================================================

@pytest.mark.asyncio
async def test_acars_compression(client):
    async with client:
        r = await client.get("/fusion/acars?ecs_fouling=40")
    assert r.status_code == 200
    data = r.json()
    assert len(data["message"]) <= 220
    assert data["compression_ratio"] > 5  # Should compress well
    assert data["original_json_bytes"] > data["compressed_bytes"]


# ============================================================
# Simulator Endpoint
# ============================================================

@pytest.mark.asyncio
async def test_simulator_what_if(client):
    async with client:
        r = await client.post("/simulate/what-if", json={
            "ecs_fouling_pct": 50,
            "brake_wear_pct": 30,
        })
    assert r.status_code == 200
    data = r.json()
    assert "naive_assessment" in data
    assert "fusion_assessment" in data
    assert "attribution_explanation" in data
    assert data["is_synthetic_data"] is True

    # The naive engine score should be lower than fusion
    # (because naive doesn't correct for ECS coupling)
    naive_engine = next(s for s in data["naive_assessment"]["subsystems"] if s["name"] == "engine")
    fusion_engine = next(s for s in data["fusion_assessment"]["subsystems"] if s["name"] == "engine")
    assert naive_engine["health_score"] <= fusion_engine["health_score"]


# ============================================================
# NLP Endpoint
# ============================================================

@pytest.mark.asyncio
async def test_nlp_recommend(client):
    async with client:
        r = await client.get("/nlp/recommend?query=engine+temperature+high")
    assert r.status_code == 200
    data = r.json()
    assert data["knowledge_base_size"] == 18
    assert len(data["results"]) > 0
    assert data["disclaimer"].startswith("Phase 1")
    # Should find engine-related results
    subsystems = [res["subsystem"] for res in data["results"]]
    assert "engine" in subsystems or "apu" in subsystems


@pytest.mark.asyncio
async def test_nlp_filter_by_subsystem(client):
    async with client:
        r = await client.get("/nlp/recommend?query=temperature&subsystem=ecs")
    assert r.status_code == 200
    data = r.json()
    for result in data["results"]:
        assert result["subsystem"] == "ecs"


# ============================================================
# Honesty Contract Tests
# ============================================================

@pytest.mark.asyncio
async def test_all_predictions_carry_synthetic_flag(client):
    """Every prediction endpoint MUST include is_synthetic_data."""
    endpoints = [
        "/predict/engine/quick?unit_id=1&cycle=100",
        "/predict/hydraulics/quick",
        "/predict/landing-gear",
        "/predict/apu",
        "/predict/ecs",
        "/fusion/health",
    ]
    async with client:
        for ep in endpoints:
            r = await client.get(ep)
            assert r.status_code == 200, f"Failed: {ep}"
            data = r.json()
            assert "is_synthetic_data" in data, f"Missing is_synthetic_data in {ep}"
