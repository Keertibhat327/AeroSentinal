"use client";

import { useStore } from "@/lib/store";
import { TimeChart } from "@/components/charts/TimeChart";
import { SlidersHorizontal, Activity, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

export default function SimulatorPage() {
  const { simulator, setEcsFouling, aircraft } = useStore();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl">
      <header className="pb-4 border-b border-white/10">
        <h1 className="text-3xl font-bold tracking-tight">Cross-Domain Simulator</h1>
        <p className="text-gray-400 mt-1">
          Inject faults into the ECS to observe thermodynamic coupling effects on the Turbofan Engine.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Controls Column */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass-panel p-6 border-t-4 border-t-emerald-500">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-semibold">Fault Injection</h2>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-gray-300">ECS Heat Exchanger Fouling</label>
                  <span className="text-sm text-emerald-400 font-bold">{simulator.ecsFoulingPercent}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={simulator.ecsFoulingPercent}
                  onChange={(e) => setEcsFouling(parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Simulates particle buildup reducing heat transfer efficiency.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6 bg-white/5">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-gray-300 space-y-2">
                <p><strong className="text-white">The Naive Approach:</strong> Isolated models flag the engine as degrading when it requires more bleed air.</p>
                <p><strong className="text-white">AeroSentinal Fusion:</strong> Correlates the engine's bleed demand with the ECS's fouling state to correctly attribute the fault.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Charts & Diagnostics Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary-400" /> Real-time Telemetry
            </h2>
            <div className="h-[350px]">
              <TimeChart />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="glass-panel p-6 border border-rose-500/20 bg-rose-500/5">
                <h3 className="font-semibold text-rose-400 mb-2">Isolated Engine Model</h3>
                <div className="text-sm text-gray-300">
                  {aircraft.engine.score < 80 ? (
                    <div className="flex gap-2 text-rose-300">
                      <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                      <p>False positive! Engine flagged for degradation due to anomalous compressor load.</p>
                    </div>
                  ) : (
                    <p className="text-gray-400">Engine operating normally.</p>
                  )}
                </div>
             </div>

             <div className="glass-panel p-6 border border-emerald-500/20 bg-emerald-500/5">
                <h3 className="font-semibold text-emerald-400 mb-2">AeroSentinal Fusion</h3>
                <div className="text-sm text-gray-300">
                  {simulator.ecsFoulingPercent > 20 ? (
                    <div className="flex gap-2 text-emerald-300">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <p>Root cause isolated: Engine load spike is a secondary effect of ECS fouling. Engine remains healthy.</p>
                    </div>
                  ) : (
                    <p className="text-gray-400">System operating nominally.</p>
                  )}
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
