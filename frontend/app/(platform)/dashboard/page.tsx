"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { Plane, AlertTriangle, ShieldAlert, CheckCircle2, DollarSign } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

export default function DashboardPage() {
  const { aircraft, fetchHealth, checkBackend } = useStore();

  useEffect(() => {
    checkBackend();
    fetchHealth();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Healthy': return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'Warning': return <AlertTriangle className="w-5 h-5 text-amber-400" />;
      case 'Critical': return <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />;
      default: return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy': return "text-emerald-400 border-emerald-500/30";
      case 'Warning': return "text-amber-400 border-amber-500/30";
      case 'Critical': return "text-rose-500 border-rose-500/30";
      default: return "text-gray-400 border-white/10";
    }
  };

  const hasAlerts = aircraft.globalHealthScore < 75;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Fleet Overview</h1>
        <p className="text-gray-400 mt-1">Real-time health monitoring and predictive analytics.</p>
      </header>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 flex flex-col justify-center">
          <div className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">Fleet Status</div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-white">1</div>
            <div className="text-sm text-gray-400">Active<br/>Aircraft</div>
          </div>
        </div>

        <div className="glass-panel p-6 border-l-4 border-l-amber-500">
          <div className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">Active Alerts</div>
          <div className="flex items-center gap-4">
            <div className={clsx("text-4xl font-bold", hasAlerts ? "text-amber-400" : "text-emerald-400")}>
              {hasAlerts ? 1 : 0}
            </div>
            <div className="text-sm text-gray-400">Subsystem<br/>Warnings</div>
          </div>
        </div>

        <div className="glass-panel p-6 border-l-4 border-l-rose-500">
          <div className="text-sm text-gray-400 font-medium uppercase tracking-wider mb-2">Total AOG Risk Exposure</div>
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-rose-400 font-mono">
              ${(aircraft.aogRisk.totalRiskUsd / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-gray-400">Estimated<br/>Impact</div>
          </div>
        </div>
      </div>

      {/* Fleet Grid */}
      <section>
        <h2 className="text-xl font-bold mb-6">Monitored Aircraft</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href={`/dashboard/aircraft/${aircraft.aircraftId}`} className="group block">
            <div className={clsx(
              "glass-panel glass-panel-hover p-6 border-t-4 transition-all duration-300 h-full flex flex-col",
              getStatusColor(aircraft.globalHealthScore >= 75 ? 'Healthy' : aircraft.globalHealthScore >= 50 ? 'Warning' : 'Critical')
            )}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-gray-300 group-hover:text-primary-400 transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-mono">{aircraft.aircraftId}</h3>
                    <div className="text-xs text-gray-400 uppercase tracking-widest">Boeing 737 MAX 8</div>
                  </div>
                </div>
                {getStatusIcon(aircraft.globalHealthScore >= 75 ? 'Healthy' : aircraft.globalHealthScore >= 50 ? 'Warning' : 'Critical')}
              </div>

              <div className="mb-6 flex-1">
                <div className="flex justify-between items-end mb-2">
                  <div className="text-sm text-gray-400">Global Health Score</div>
                  <div className="text-3xl font-bold font-mono text-white">{aircraft.globalHealthScore}%</div>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={clsx("h-full transition-all duration-1000", aircraft.globalHealthScore >= 75 ? "bg-emerald-500" : aircraft.globalHealthScore >= 50 ? "bg-amber-500" : "bg-rose-500")}
                    style={{ width: `${aircraft.globalHealthScore}%` }}
                  />
                </div>
              </div>

              {aircraft.acarsMessage && (
                <div className="mt-auto p-3 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-gray-300 truncate">
                  <span className="text-primary-400 font-bold mr-2">ACARS</span>
                  {aircraft.acarsMessage}
                </div>
              )}
            </div>
          </Link>

          {/* Placeholder for scaling */}
          <div className="glass-panel p-6 border-dashed border-white/20 flex flex-col items-center justify-center text-center opacity-50 grayscale">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-gray-500">+</span>
            </div>
            <h3 className="font-bold text-gray-400 mb-1">Add Aircraft</h3>
            <p className="text-xs text-gray-500">Connect telemetry stream</p>
          </div>
        </div>
      </section>
    </div>
  );
}
