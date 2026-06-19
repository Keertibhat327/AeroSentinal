"""
AeroSentinal — NLP Router
============================
Maintenance repair recommendation retrieval.

IMPORTANT: This endpoint uses TF-IDF retrieval, NOT a fine-tuned LLM.
The response includes a disclaimer field to enforce honesty.
"""

from fastapi import APIRouter, Query
from pydantic import BaseModel, Field
from typing import Optional

router = APIRouter()


class NLPQuery(BaseModel):
    query: str = Field(..., description="Natural language description of the maintenance issue")
    subsystem: Optional[str] = Field(None, description="Filter by subsystem (engine, hydraulics, etc.)")
    top_k: int = Field(3, ge=1, le=10, description="Number of results to return")


class NLPResult(BaseModel):
    problem: str
    recommended_action: str
    subsystem: str
    relevance_score: float
    source: str
    model_type: str
    disclaimer: str


class NLPResponse(BaseModel):
    query: str
    results: list[NLPResult]
    knowledge_base_size: int
    model_type: str = "TF-IDF + Cosine Similarity"
    disclaimer: str = "Phase 1 retrieval-based stand-in. Phase 2: Fine-tuned LLM (LLaMA/Gemma) pending."
    is_synthetic_data: bool = True


@router.post("/recommend", response_model=NLPResponse)
async def get_recommendations(request: NLPQuery):
    """
    Search the maintenance knowledge base for repair recommendations.
    
    Uses TF-IDF + cosine similarity retrieval over 18 curated
    maintenance problem/action pairs covering all 5 active subsystems.
    
    **This is NOT a fine-tuned LLM.** See the `disclaimer` field.
    """
    from backend.app.services.nlp import NLPRetrievalService

    service = NLPRetrievalService.get_instance()
    results = service.search(
        query=request.query,
        top_k=request.top_k,
        subsystem=request.subsystem,
    )

    return NLPResponse(
        query=request.query,
        results=[NLPResult(**r) for r in results],
        knowledge_base_size=service.knowledge_base_size,
    )


@router.get("/recommend", response_model=NLPResponse)
async def get_recommendations_get(
    query: str = Query(..., description="Describe the maintenance issue"),
    subsystem: Optional[str] = Query(None),
    top_k: int = Query(3, ge=1, le=10),
):
    """GET version of the recommendation endpoint for easy testing."""
    from backend.app.services.nlp import NLPRetrievalService

    service = NLPRetrievalService.get_instance()
    results = service.search(query=query, top_k=top_k, subsystem=subsystem)

    return NLPResponse(
        query=query,
        results=[NLPResult(**r) for r in results],
        knowledge_base_size=service.knowledge_base_size,
    )
