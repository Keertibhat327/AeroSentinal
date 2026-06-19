"""
AeroSentinal — NLP Repair Recommendation (Phase 1 Stand-in)
=============================================================
Lightweight TF-IDF + cosine similarity retrieval over a curated
set of maintenance problem/action pairs.

IMPORTANT: This is explicitly labeled as a retrieval-based placeholder.
It is NOT a fine-tuned LLM. The UI must display:
  "Phase 2: LLM fine-tune pending — current: TF-IDF retrieval stand-in"

The curated dataset is a small, hand-picked set of representative
maintenance actions for the 5 active subsystems.
"""

import json
from pathlib import Path
from typing import Optional

# We use sklearn's TfidfVectorizer for simplicity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


# ============================================================
# Curated Maintenance Knowledge Base
# ============================================================
# Format: (problem_description, recommended_action, subsystem, source)
# Source is always "curated" for this stand-in — never claim these
# came from MaintNet unless they actually did.

KNOWLEDGE_BASE = [
    # Engine
    {
        "problem": "Engine exhaust gas temperature exceeding normal operating range during cruise",
        "action": "Inspect turbine blades for erosion or FOD damage. Check fuel nozzle spray patterns. Perform borescope inspection of hot section. If EGT margin less than 10C, schedule engine shop visit.",
        "subsystem": "engine",
        "source": "curated",
    },
    {
        "problem": "Engine compressor stall detected during climb phase",
        "action": "Review FADEC logs for fuel scheduling anomalies. Inspect compressor blades for damage or fouling. Check bleed air valve operation. Perform compressor wash if fouling suspected.",
        "subsystem": "engine",
        "source": "curated",
    },
    {
        "problem": "Engine oil consumption rate above fleet average",
        "action": "Check for oil leaks at accessory gearbox seals. Inspect carbon seals for wear. Monitor oil quantity trend over next 5 flights. If consumption exceeds 0.5 qt/hr, schedule seal replacement.",
        "subsystem": "engine",
        "source": "curated",
    },
    {
        "problem": "Engine vibration amplitude increasing trend over last 50 cycles",
        "action": "Perform vibration survey at all N1/N2 speed ranges. Check fan blade tip clearances. Inspect engine mounts for fatigue cracks. Compare with fleet vibration baseline.",
        "subsystem": "engine",
        "source": "curated",
    },
    {
        "problem": "Reduced engine thrust response during takeoff",
        "action": "Check FADEC thrust management system. Inspect variable stator vane actuator. Verify bleed air valves fully closed during takeoff. Review fuel flow vs N1 correlation.",
        "subsystem": "engine",
        "source": "curated",
    },

    # Hydraulics
    {
        "problem": "Hydraulic system pressure fluctuations during flight control actuation",
        "action": "Check hydraulic pump delivery pressure and flow rate. Inspect pressure relief valve settings. Look for internal leakage in flight control actuators. Check hydraulic fluid level and condition.",
        "subsystem": "hydraulics",
        "source": "curated",
    },
    {
        "problem": "Hydraulic fluid temperature exceeding normal operating limits",
        "action": "Inspect hydraulic heat exchanger for blockage or reduced flow. Check return filter for contamination. Verify reservoir pressurization. Consider fluid replacement if oxidation detected.",
        "subsystem": "hydraulics",
        "source": "curated",
    },
    {
        "problem": "Hydraulic accumulator pre-charge pressure low",
        "action": "Check nitrogen pre-charge pressure with calibrated gauge. Inspect bladder for leaks using soap solution. Recharge to specification if below limits. Replace accumulator if bladder integrity compromised.",
        "subsystem": "hydraulics",
        "source": "curated",
    },

    # Landing Gear
    {
        "problem": "Brake wear indicators showing uneven wear across main gear",
        "action": "Inspect brake assembly for stuck pistons or uneven hydraulic pressure distribution. Check anti-skid system valve operation. Replace brake assembly if wear exceeds limits. Inspect wheel bearings.",
        "subsystem": "landing_gear",
        "source": "curated",
    },
    {
        "problem": "Landing gear extension time exceeding normal limits",
        "action": "Check hydraulic pressure to gear actuator. Inspect gear door sequence valves. Lubricate gear pivot points per maintenance manual. Check for mechanical interference in gear bay.",
        "subsystem": "landing_gear",
        "source": "curated",
    },
    {
        "problem": "Tire pressure below minimum for multiple main gear tires",
        "action": "Inspect tires for cuts, bulges, or foreign object damage. Check wheel rim for corrosion or cracks. Inflate to specification. If recurring, inspect valve cores and bead seal area.",
        "subsystem": "landing_gear",
        "source": "curated",
    },

    # APU
    {
        "problem": "APU exhaust gas temperature high during start sequence",
        "action": "Inspect APU combustor and turbine section. Check fuel control unit calibration. Verify inlet air ducting is unobstructed. Perform compressor wash. If EGT exceeds limits on three consecutive starts, remove APU for shop visit.",
        "subsystem": "apu",
        "source": "curated",
    },
    {
        "problem": "APU fails to reach idle speed within time limit",
        "action": "Check starter motor engagement and torque output. Inspect fuel shutoff valve operation. Verify battery voltage during start attempt. Check for compressor fouling or foreign object ingestion.",
        "subsystem": "apu",
        "source": "curated",
    },
    {
        "problem": "APU bleed air output insufficient for main engine start",
        "action": "Check APU bleed valve operation. Inspect load control valve scheduling. Verify APU is at rated speed before selecting bleed. Check for bleed duct leaks between APU and engine.",
        "subsystem": "apu",
        "source": "curated",
    },

    # ECS
    {
        "problem": "Cabin temperature control unstable with frequent oscillation",
        "action": "Inspect pack valve modulation. Check temperature sensors in cabin zones and duct. Verify mixing valve actuator operation. If oscillation correlates with bleed source switching, inspect check valves.",
        "subsystem": "ecs",
        "source": "curated",
    },
    {
        "problem": "ECS pack output air temperature higher than selected",
        "action": "Inspect primary and secondary heat exchangers for fouling or blockage. Check ram air inlet for obstruction. Verify turbine cooling air flow path. Consider heat exchanger cleaning or replacement.",
        "subsystem": "ecs",
        "source": "curated",
    },
    {
        "problem": "Excessive bleed air demand detected causing engine performance impact",
        "action": "CROSS-DOMAIN: Verify ECS pack demand is not artificially elevated due to heat exchanger fouling. Inspect pack flow control valve. Check for pneumatic duct leaks. Coordinate with engine team to confirm bleed extraction limits.",
        "subsystem": "ecs",
        "source": "curated",
    },
    {
        "problem": "Cabin pressurization rate abnormal during descent",
        "action": "Check outflow valve controller scheduling. Inspect positive pressure relief valve. Verify cabin altitude vs aircraft altitude rate correlation. Check safety valve for proper seating.",
        "subsystem": "ecs",
        "source": "curated",
    },
]


class NLPRetrievalService:
    """
    TF-IDF + cosine similarity retrieval for maintenance recommendations.
    
    This is a Phase 1 stand-in. The UI must clearly label this as:
    "Retrieval-based placeholder — Phase 2: LLM fine-tune pending"
    """

    _instance: Optional["NLPRetrievalService"] = None
    _vectorizer: Optional[TfidfVectorizer] = None
    _tfidf_matrix = None

    @classmethod
    def get_instance(cls) -> "NLPRetrievalService":
        if cls._instance is None:
            cls._instance = cls()
            cls._instance._build_index()
        return cls._instance

    def _build_index(self):
        """Build TF-IDF index from the knowledge base."""
        corpus = [entry["problem"] for entry in KNOWLEDGE_BASE]
        self._vectorizer = TfidfVectorizer(
            stop_words="english",
            ngram_range=(1, 2),
            max_features=500,
        )
        self._tfidf_matrix = self._vectorizer.fit_transform(corpus)

    def search(self, query: str, top_k: int = 3, subsystem: Optional[str] = None) -> list[dict]:
        """
        Search for maintenance recommendations matching a query.
        
        Returns top-k results with similarity scores.
        """
        if self._vectorizer is None or self._tfidf_matrix is None:
            self._build_index()

        query_vec = self._vectorizer.transform([query])
        similarities = cosine_similarity(query_vec, self._tfidf_matrix).flatten()

        # Filter by subsystem if specified
        if subsystem:
            for i, entry in enumerate(KNOWLEDGE_BASE):
                if entry["subsystem"] != subsystem:
                    similarities[i] = 0.0

        # Get top-k indices
        top_indices = np.argsort(similarities)[::-1][:top_k]

        results = []
        for idx in top_indices:
            score = float(similarities[idx])
            if score < 0.01:
                continue  # Skip near-zero matches

            entry = KNOWLEDGE_BASE[idx]
            results.append({
                "problem": entry["problem"],
                "recommended_action": entry["action"],
                "subsystem": entry["subsystem"],
                "relevance_score": round(score, 4),
                "source": entry["source"],
                "model_type": "TF-IDF + Cosine Similarity (Phase 1 stand-in)",
                "disclaimer": "Retrieval-based placeholder. Phase 2: LLM fine-tune pending.",
            })

        return results

    @property
    def knowledge_base_size(self) -> int:
        return len(KNOWLEDGE_BASE)
