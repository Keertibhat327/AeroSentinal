"use client";

import { useState } from "react";
import { Search, BookOpen, AlertTriangle, Wrench, Loader2 } from "lucide-react";
import clsx from "clsx";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

type NLPResult = {
  problem: string;
  recommended_action: string;
  subsystem: string;
  relevance_score: number;
  source: string;
  model_type: string;
  disclaimer: string;
};

const SUBSYSTEM_COLORS: Record<string, string> = {
  engine: "text-rose-400 bg-rose-500/10 border-rose-500/20",
  hydraulics: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  landing_gear: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  apu: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  ecs: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
};

export default function NLPPage() {
  const [query, setQuery] = useState("");
  const [subsystem, setSubsystem] = useState("");
  const [results, setResults] = useState<NLPResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearched(true);

    try {
      const params = new URLSearchParams({ query, top_k: "5" });
      if (subsystem) params.set("subsystem", subsystem);

      const res = await fetch(`${API_BASE}/nlp/recommend?${params}`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setResults(data.results || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <header className="pb-4 border-b border-white/10">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-primary-400" />
          Repair Assistant
        </h1>
        <p className="text-gray-400 mt-1">
          Search maintenance knowledge base for repair recommendations.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-500/10 border border-amber-500/20 text-amber-400">
          <AlertTriangle className="w-3 h-3" />
          Phase 1 Stand-in: TF-IDF retrieval over 18 curated pairs. Phase 2: Fine-tuned LLM pending.
        </div>
      </header>

      {/* Search Bar */}
      <div className="glass-panel p-6">
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Describe the maintenance issue... (e.g., 'engine temperature high during cruise')"
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 focus:ring-1 focus:ring-primary-500/30 transition-all"
            />
          </div>
          <select
            value={subsystem}
            onChange={(e) => setSubsystem(e.target.value)}
            className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 focus:outline-none focus:border-primary-500/50 transition-all"
          >
            <option value="">All Subsystems</option>
            <option value="engine">Engine</option>
            <option value="hydraulics">Hydraulics</option>
            <option value="landing_gear">Landing Gear</option>
            <option value="apu">APU</option>
            <option value="ecs">ECS</option>
          </select>
          <button
            onClick={handleSearch}
            disabled={loading || !query.trim()}
            className="px-6 py-3 bg-primary-600 hover:bg-primary-500 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            Search
          </button>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-300">
            {results.length > 0 ? `${results.length} recommendation${results.length > 1 ? "s" : ""} found` : "No matching recommendations"}
          </h2>

          {results.map((result, i) => (
            <div key={i} className="glass-panel glass-panel-hover p-6 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={clsx("text-xs font-semibold px-2.5 py-1 rounded-md border uppercase tracking-wider", SUBSYSTEM_COLORS[result.subsystem] || "text-gray-400")}>
                      {result.subsystem.replace("_", " ")}
                    </span>
                    <span className="text-xs text-gray-500">
                      Relevance: {(result.relevance_score * 100).toFixed(1)}%
                    </span>
                  </div>
                  <h3 className="font-semibold text-white">{result.problem}</h3>
                </div>
              </div>

              <div className="flex gap-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                <Wrench className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">Recommended Action</div>
                  <p className="text-sm text-gray-300 leading-relaxed">{result.recommended_action}</p>
                </div>
              </div>

              <div className="text-xs text-gray-500 italic">{result.disclaimer}</div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Search Suggestions */}
      {!searched && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-400">Try searching for:</h2>
          <div className="flex flex-wrap gap-3">
            {[
              "engine temperature high during cruise",
              "hydraulic pressure fluctuation",
              "brake wear uneven",
              "APU fails to start",
              "cabin temperature unstable",
              "excessive bleed air demand",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => { setQuery(suggestion); }}
                className="px-4 py-2 glass-panel text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
