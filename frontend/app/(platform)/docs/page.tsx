"use client";

import { useEffect, useState } from "react";
import { Network, Database, Workflow, ShieldAlert, AlertTriangle } from "lucide-react";

export default function Documentation() {
  const [activeSection, setActiveSection] = useState("overview");

  // Simple scroll spy logic
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex-grow flex max-w-[1440px] mx-auto w-full px-4 md:px-8 py-8 gap-8 font-sans">
      {/* Sidebar Navigation */}
      <aside className="hidden md:block w-64 shrink-0 pr-8 border-r border-secondary/20 h-[calc(100vh-140px)] sticky top-[100px] overflow-y-auto">
        <div className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-3">SYSTEM ARCHITECTURE</h3>
          <ul className="space-y-1">
            <li>
              <a href="#overview" className={`block py-1.5 font-mono text-[14px] transition-all border-l-2 pl-3 ${activeSection === "overview" ? "text-tactical-amber border-tactical-amber bg-tactical-amber/5" : "text-on-surface-variant border-transparent hover:text-secondary hover:border-secondary/50"}`}>
                Architecture Overview
              </a>
            </li>
            <li>
              <a href="#fusion" className={`block py-1.5 font-mono text-[14px] transition-all border-l-2 pl-3 ${activeSection === "fusion" ? "text-tactical-amber border-tactical-amber bg-tactical-amber/5" : "text-on-surface-variant border-transparent hover:text-secondary hover:border-secondary/50"}`}>
                FastAPI Fusion Backend
              </a>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-3">DATA FOUNDATION</h3>
          <ul className="space-y-1">
            <li>
              <a href="#datasets" className={`block py-1.5 font-mono text-[14px] transition-all border-l-2 pl-3 ${activeSection === "datasets" ? "text-tactical-amber border-tactical-amber bg-tactical-amber/5" : "text-on-surface-variant border-transparent hover:text-secondary hover:border-secondary/50"}`}>
                Dataset Sources
              </a>
            </li>
            <li>
              <a href="#cmapss" className={`block py-1.5 font-mono text-[14px] transition-all border-l-2 pl-3 ${activeSection === "cmapss" ? "text-tactical-amber border-tactical-amber bg-tactical-amber/5" : "text-on-surface-variant border-transparent hover:text-secondary hover:border-secondary/50"}`}>
                NASA C-MAPSS
              </a>
            </li>
            <li>
              <a href="#hydraulics" className={`block py-1.5 font-mono text-[14px] transition-all border-l-2 pl-3 ${activeSection === "hydraulics" ? "text-tactical-amber border-tactical-amber bg-tactical-amber/5" : "text-on-surface-variant border-transparent hover:text-secondary hover:border-secondary/50"}`}>
                UCI Hydraulics
              </a>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-secondary mb-3">ANALYTICS ENGINE</h3>
          <ul className="space-y-1">
            <li>
              <a href="#cross-domain" className={`block py-1.5 font-mono text-[14px] transition-all border-l-2 pl-3 ${activeSection === "cross-domain" ? "text-tactical-amber border-tactical-amber bg-tactical-amber/5" : "text-on-surface-variant border-transparent hover:text-secondary hover:border-secondary/50"}`}>
                Cross-Domain Fault
              </a>
            </li>
            <li>
              <a href="#ecs-coupling" className={`block py-1.5 font-mono text-[14px] transition-all border-l-2 pl-3 ${activeSection === "ecs-coupling" ? "text-tactical-amber border-tactical-amber bg-tactical-amber/5" : "text-on-surface-variant border-transparent hover:text-secondary hover:border-secondary/50"}`}>
                ECS / Engine Coupling
              </a>
            </li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-tactical-amber mb-3 opacity-80">OPERATIONAL PARAMETERS</h3>
          <ul className="space-y-1">
            <li>
              <a href="#limitations" className={`block py-1.5 font-mono text-[14px] transition-all border-l-2 pl-3 ${activeSection === "limitations" ? "text-tactical-amber border-tactical-amber bg-tactical-amber/5" : "text-tactical-amber/80 border-transparent hover:text-tactical-amber hover:border-tactical-amber/50"}`}>
                Known Limitations
              </a>
            </li>
            <li>
              <a href="#policy" className={`block py-1.5 font-mono text-[14px] transition-all border-l-2 pl-3 ${activeSection === "policy" ? "text-tactical-amber border-tactical-amber bg-tactical-amber/5" : "text-tactical-amber/80 border-transparent hover:text-tactical-amber hover:border-tactical-amber/50"}`}>
                Honesty-First Policy
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Documentation Canvas */}
      <main className="flex-grow max-w-3xl pb-24">
        <div className="mb-12 border-b border-secondary/20 pb-8">
          <div className="flex items-center gap-2 mb-4 text-bronze-oxide font-mono text-[14px]">
            <span>DOCS</span>
            <span>&gt;</span>
            <span>CORE SYSTEMS</span>
            <span>&gt;</span>
            <span className="text-on-surface">TECHNICAL OVERVIEW</span>
          </div>
          <h1 className="text-4xl font-bold text-tactical-amber mb-4 tracking-tight">AeroSentinal Technical Documentation</h1>
          <p className="text-base text-on-surface-variant leading-relaxed">
            Comprehensive technical specifications, architectural decisions, and operational constraints for the AeroSentinal aerospace telemetry platform.
          </p>
        </div>

        {/* Architecture Overview */}
        <section id="overview" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-on-surface mb-6 flex items-center gap-3">
            <Network className="text-secondary w-6 h-6" />
            Architecture Overview
          </h2>
          
          <div className="bg-panel-surface border border-secondary/20 rounded-lg p-6 mb-6">
            <p className="mb-4 text-on-surface leading-relaxed text-sm">
              The AeroSentinal platform employs a high-throughput, low-latency microservices architecture optimized for real-time sensor data ingestion and predictive maintenance analytics. The core routing and aggregation layer is built on the <strong>FastAPI Fusion Backend</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="border border-secondary/10 bg-surface-dim p-4 rounded">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-tactical-amber mb-2">INGESTION LAYER</h4>
                <p className="text-sm text-on-surface-variant">WebSocket streams handling 10kHz sensor polling rates with auto-scaling buffering.</p>
              </div>
              <div className="border border-secondary/10 bg-surface-dim p-4 rounded">
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-tactical-amber mb-2">INFERENCE LAYER</h4>
                <p className="text-sm text-on-surface-variant">GPU-accelerated ML models for anomaly detection deployed via ONNX runtime.</p>
              </div>
            </div>
          </div>
          
          <h3 id="fusion" className="font-mono text-lg text-secondary mb-4 mt-8 scroll-mt-24">FastAPI Fusion Backend</h3>
          <p className="mb-4 text-on-surface-variant text-sm leading-relaxed">
            The backend API is designed for strictly typed, asynchronous data handling. We utilize FastAPI for its native <code className="font-mono text-[13px] bg-surface-variant/50 px-1.5 py-0.5 rounded text-tactical-amber">pydantic</code> validation, crucial for ensuring incoming telemetry vectors match expected dimensionalities before being passed to the inference engines.
          </p>
          <div className="bg-panel-surface border border-secondary/20 p-4 rounded overflow-x-auto text-sm">
            <pre><code className="font-mono text-[13px] text-on-surface">
{`@app.post("/api/v1/telemetry/ingest", response_model=IngestionAck)
async def ingest_sensor_data(
    payload: TelemetryVector, 
    background_tasks: BackgroundTasks
):
    # Validate dimensionality (e.g., 21 sensor outputs for C-MAPSS)
    if len(payload.sensor_readings) != EXPECTED_DIMS:
        raise HTTPException(status_code=422, detail="Dimensionality mismatch")
        
    # Queue for async inference
    background_tasks.add_task(process_telemetry_fusion, payload)
    
    return IngestionAck(status="OPTIMAL", timestamp=datetime.utcnow())`}
            </code></pre>
          </div>
        </section>

        {/* Dataset Sources */}
        <section id="datasets" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-on-surface mb-6 flex items-center gap-3">
            <Database className="text-secondary w-6 h-6" />
            Dataset Sources
          </h2>
          <p className="mb-6 text-on-surface-variant text-sm leading-relaxed">
            The predictive models powering AeroSentinal are trained on industry-standard, high-fidelity simulation and test rig data.
          </p>
          
          <div className="space-y-6">
            {/* C-MAPSS */}
            <div id="cmapss" className="border border-secondary/20 rounded-lg overflow-hidden scroll-mt-24">
              <div className="bg-surface-variant/30 border-b border-secondary/20 px-6 py-3 flex justify-between items-center">
                <h3 className="font-mono text-lg text-on-surface">NASA C-MAPSS</h3>
                <span className="bg-surface-dim border border-bronze-oxide text-bronze-oxide text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">ENGINE TURBOFAN</span>
              </div>
              <div className="p-6 bg-panel-surface">
                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Commercial Modular Aero-Propulsion System Simulation. Used for Engine Remaining Useful Life (RUL) predictions. The dataset consists of multiple multivariate time series where each sequence is from a different engine of the same fleet.
                </p>
                <div className="grid grid-cols-3 gap-2 border-t border-secondary/10 pt-4 mt-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 mb-1">OPERATIONAL SETTINGS</div>
                    <div className="font-mono text-sm">3</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 mb-1">SENSOR MEASUREMENTS</div>
                    <div className="font-mono text-sm">21</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 mb-1">FAULT MODES</div>
                    <div className="font-mono text-sm">HPC Degradation</div>
                  </div>
                </div>
              </div>
            </div>

            {/* UCI Hydraulics */}
            <div id="hydraulics" className="border border-secondary/20 rounded-lg overflow-hidden scroll-mt-24">
              <div className="bg-surface-variant/30 border-b border-secondary/20 px-6 py-3 flex justify-between items-center">
                <h3 className="font-mono text-lg text-on-surface">UCI Hydraulics</h3>
                <span className="bg-surface-dim border border-bronze-oxide text-bronze-oxide text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded">SYSTEM FLUIDS</span>
              </div>
              <div className="p-6 bg-panel-surface">
                <p className="text-sm text-on-surface-variant mb-4 leading-relaxed">
                  Condition monitoring of hydraulic systems dataset. Used for detecting cooler condition, valve condition, internal pump leakage, and hydraulic accumulator state.
                </p>
                <div className="grid grid-cols-3 gap-2 border-t border-secondary/10 pt-4 mt-4">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 mb-1">SAMPLE RATE</div>
                    <div className="font-mono text-sm">1Hz - 100Hz</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 mb-1">SENSORS</div>
                    <div className="font-mono text-sm">14 (PS, FS, TS)</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-widest text-secondary/60 mb-1">TARGET CONDITIONS</div>
                    <div className="font-mono text-sm">4 Attributes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics Engine */}
        <section id="cross-domain" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-on-surface mb-6 flex items-center gap-3">
            <Workflow className="text-secondary w-6 h-6" />
            Cross-Domain Fault Attribution
          </h2>
          <div className="bg-panel-surface border-l-4 border-l-tactical-amber p-6 mb-6">
            <h3 className="font-mono text-lg text-tactical-amber mb-2">Core Analytic Philosophy</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Modern aerospace systems do not fail in isolation. AeroSentinal's primary differentiator is its ability to map cascading failures across physical domains.
            </p>
          </div>
          
          <h3 id="ecs-coupling" className="font-mono text-lg text-secondary mb-4 mt-8 scroll-mt-24">ECS / Engine Coupling</h3>
          <p className="mb-4 text-on-surface-variant text-sm leading-relaxed">
            The Environmental Control System (ECS) relies heavily on bleed air extracted from the engine compressor stages. A common misattribution in legacy monitoring systems is diagnosing an ECS inefficiency when the root cause is early-stage High Pressure Compressor (HPC) degradation.
          </p>
          <p className="mb-6 text-on-surface-variant text-sm leading-relaxed">
            Our Fusion Backend calculates a <strong>Coupling Coefficient (CC)</strong> between Engine Sensor T50 (LPT outlet temperature) and ECS Pack Inlet Pressure. When <code className="font-mono text-[13px] bg-surface-variant/50 px-1 rounded text-on-surface">CC &gt; 0.85</code> concurrently with a pressure drop, the fault is attributed upstream to the engine, preventing unnecessary ECS maintenance actions.
          </p>
          
          <div className="bg-surface-dim border border-secondary/10 rounded p-4 flex items-start gap-4">
            <AlertTriangle className="text-tactical-amber w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-on-surface mb-1">CRITICAL ALERT SCENARIO</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                If ECS Cross-Domain faults are detected alongside Hydraulic pressure anomalies, the UI will initiate a 2Hz blink frequency on the master status pill, indicating potential critical systemic power loss.
              </p>
            </div>
          </div>
        </section>

        {/* Limitations & Policy */}
        <section id="limitations" className="mb-16 scroll-mt-24">
          <h2 className="text-2xl font-semibold text-status-critical mb-6 flex items-center gap-3">
            <ShieldAlert className="text-status-critical w-6 h-6" />
            Known Limitations & Policy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-panel-surface border border-status-critical/30 p-5 rounded-lg">
              <h3 className="font-mono text-lg text-status-critical mb-3">Model Boundaries</h3>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                <li className="flex items-start gap-2">
                  <span className="text-status-critical font-bold">×</span>
                  <span>C-MAPSS models do not account for bird strikes or foreign object damage (FOD).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-status-critical font-bold">×</span>
                  <span>Hydraulic leakage detection accuracy degrades below -40°C ambient temperatures due to fluid viscosity changes not represented in UCI training data.</span>
                </li>
              </ul>
            </div>
            
            <div id="policy" className="bg-surface-dim border border-secondary/20 p-5 rounded-lg scroll-mt-24">
              <h3 className="font-mono text-lg text-secondary mb-3">Honesty-First Policy</h3>
              <p className="text-sm text-on-surface-variant mb-3 leading-relaxed">
                AeroSentinal operates under a strict "Honesty-First" design policy. If confidence bounds for an RUL prediction fall below 75%, the system will default to <code className="font-mono text-[12px] text-tactical-amber bg-surface-variant/50 px-1 rounded">DATA_DEGRADED</code> status rather than present a potentially misleading estimate.
              </p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                We prioritize operator awareness over dashboard completeness. Blank data is safer than wrong data.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
