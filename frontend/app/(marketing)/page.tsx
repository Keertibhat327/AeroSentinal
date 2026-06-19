"use client";

import Link from "next/link";
import { ArrowRight, Book, Cpu, Droplets, PlaneLanding, Thermometer, Power, ChevronDown, Network, Activity, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex-grow relative bg-obsidian-base font-sans">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            alt="Hero Background" 
            className="w-full h-full object-cover" 
            src="/runway_hero.jpg"
          />
          {/* Tactical Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian-base/80 via-obsidian-base/40 to-obsidian-base"></div>
        </div>
        
        {/* Hero Content Overlay */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-12 flex flex-col items-start w-full gap-8">
          <div className="max-w-3xl border-l-2 border-tactical-amber pl-6">
            <h1 className="text-4xl md:text-[48px] md:leading-[56px] font-bold text-on-surface mb-4 tracking-tight">
              AeroSentinal: Holistic Aircraft Predictive Maintenance
            </h1>
            <p className="font-mono text-lg text-on-surface-variant/80 mb-8 max-w-2xl tracking-wide">
              5 independently trained ML subsystems. Real-time fusion orchestration. Zero-AOG precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" className="bg-tactical-amber text-on-primary-fixed text-[11px] font-bold uppercase tracking-widest px-8 py-3 rounded hover:bg-primary transition-colors active:scale-95 flex items-center justify-center gap-2">
                <span>Launch Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/docs" className="bg-transparent border border-tactical-amber text-tactical-amber text-[11px] font-bold uppercase tracking-widest px-8 py-3 rounded hover:bg-tactical-amber/10 transition-colors active:scale-95 flex items-center justify-center gap-2">
                <span>View Documentation</span>
                <Book className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-on-surface-variant/50 animate-bounce">
          <span className="text-[10px] font-bold uppercase tracking-widest">SCROLL</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </section>

      {/* Subsystems Section */}
      <section className="py-24 px-8 md:px-12 max-w-[1440px] mx-auto relative z-20 bg-obsidian-base">
        <div className="mb-16 border-b border-secondary/20 pb-4">
          <h2 className="text-2xl font-semibold text-tactical-amber">CORE ML SUBSYSTEMS</h2>
          <p className="text-sm text-on-surface-variant mt-2">Active Telemetry Models & Architectural Topologies</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Engine Model */}
          <div className="bg-panel-surface border border-secondary/20 rounded p-6 relative overflow-hidden group hover:border-tactical-amber/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-tactical-amber opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <Cpu className="text-tactical-amber" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-on-surface">ENGINE RUL (BiLSTM + Attention)</h3>
              </div>
              <span className="px-2 py-1 bg-status-optimal/10 text-status-optimal text-[10px] font-bold uppercase tracking-widest rounded-sm border border-status-optimal/20">NOMINAL</span>
            </div>
            <div className="mb-6">
              <div className="font-mono text-lg text-on-surface">BiLSTM + Attention</div>
              <div className="text-sm text-on-surface-variant mt-1 leading-relaxed">Sequence-to-sequence remaining useful life prediction.</div>
            </div>
            <div className="space-y-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
              <div className="flex justify-between border-b border-secondary/10 pb-1">
                <span>ACCURACY</span>
                <span className="text-on-surface">98.4%</span>
              </div>
              <div className="flex justify-between border-b border-secondary/10 pb-1">
                <span>LATENCY</span>
                <span className="text-on-surface">12ms</span>
              </div>
            </div>
          </div>

          {/* Hydraulics Model */}
          <div className="bg-panel-surface border border-secondary/20 rounded p-6 relative overflow-hidden group hover:border-tactical-amber/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-status-critical opacity-100 tactical-glow"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <Droplets className="text-status-critical" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-on-surface">HYDRAULICS (1D Conv Autoencoder)</h3>
              </div>
              <span className="px-2 py-1 bg-status-critical/10 text-status-critical text-[10px] font-bold uppercase tracking-widest rounded-sm border border-status-critical/20 animate-pulse">ATTENTION</span>
            </div>
            <div className="mb-6">
              <div className="font-mono text-lg text-on-surface">1D Conv Autoencoder</div>
              <div className="text-sm text-on-surface-variant mt-1 leading-relaxed">Unsupervised anomaly detection in pressure telemetry.</div>
            </div>
            <div className="space-y-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
              <div className="flex justify-between border-b border-secondary/10 pb-1">
                <span>F1 SCORE</span>
                <span className="text-on-surface">0.94</span>
              </div>
              <div className="flex justify-between border-b border-secondary/10 pb-1">
                <span>ANOMALY RATE</span>
                <span className="text-status-critical">0.02%</span>
              </div>
            </div>
          </div>

          {/* Landing Gear Model */}
          <div className="bg-panel-surface border border-secondary/20 rounded p-6 relative overflow-hidden group hover:border-tactical-amber/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-tactical-amber opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <PlaneLanding className="text-tactical-amber" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-on-surface">LANDING GEAR (XGBoost)</h3>
              </div>
              <span className="px-2 py-1 bg-status-optimal/10 text-status-optimal text-[10px] font-bold uppercase tracking-widest rounded-sm border border-status-optimal/20">NOMINAL</span>
            </div>
            <div className="mb-6">
              <div className="font-mono text-lg text-on-surface">XGBoost</div>
              <div className="text-sm text-on-surface-variant mt-1 leading-relaxed">Structural fatigue classification and shock absorption multi-class.</div>
            </div>
            <div className="space-y-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
              <div className="flex justify-between border-b border-secondary/10 pb-1">
                <span>PRECISION</span>
                <span className="text-on-surface">97.1%</span>
              </div>
              <div className="flex justify-between border-b border-secondary/10 pb-1">
                <span>RECALL</span>
                <span className="text-on-surface">96.8%</span>
              </div>
            </div>
          </div>

          {/* Avionics Model */}
          <div className="bg-panel-surface border border-secondary/20 rounded p-6 relative overflow-hidden group hover:border-tactical-amber/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-tactical-amber opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <Thermometer className="text-tactical-amber" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-on-surface">ECS SUBSYSTEM</h3>
              </div>
              <span className="px-2 py-1 bg-status-optimal/10 text-status-optimal text-[10px] font-bold uppercase tracking-widest rounded-sm border border-status-optimal/20">NOMINAL</span>
            </div>
            <div className="mb-6">
              <div className="font-mono text-lg text-on-surface">Cross-Domain Fusion</div>
              <div className="text-sm text-on-surface-variant mt-1 leading-relaxed">Brayton-cycle simulation logic for environmental control health.</div>
            </div>
            <div className="space-y-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
              <div className="flex justify-between border-b border-secondary/10 pb-1">
                <span>FUSION LOGIC</span>
                <span className="text-on-surface">ACTIVE</span>
              </div>
              <div className="flex justify-between border-b border-secondary/10 pb-1">
                <span>SIMULATOR</span>
                <span className="text-on-surface">BRAYTON</span>
              </div>
            </div>
          </div>

          {/* APU Model */}
          <div className="bg-panel-surface border border-secondary/20 rounded p-6 relative overflow-hidden group hover:border-tactical-amber/50 transition-colors">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-tactical-amber opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <Power className="text-tactical-amber" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-on-surface">AUX POWER UNIT</h3>
              </div>
              <span className="px-2 py-1 bg-status-optimal/10 text-status-optimal text-[10px] font-bold uppercase tracking-widest rounded-sm border border-status-optimal/20">NOMINAL</span>
            </div>
            <div className="mb-6">
              <div className="font-mono text-lg text-on-surface">Transformer</div>
              <div className="text-sm text-on-surface-variant mt-1 leading-relaxed">Thermal event forecasting and startup anomaly detection.</div>
            </div>
            <div className="space-y-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">
              <div className="flex justify-between border-b border-secondary/10 pb-1">
                <span>RMSE</span>
                <span className="text-on-surface">0.05</span>
              </div>
              <div className="flex justify-between border-b border-secondary/10 pb-1">
                <span>HORIZON</span>
                <span className="text-on-surface">48hrs</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* System Architecture Section */}
      <section className="py-24 px-8 md:px-12 max-w-[1440px] mx-auto relative z-20 bg-obsidian-base border-t border-secondary/10">
        <div className="mb-16 border-l-2 border-tactical-amber pl-6">
          <h2 className="text-2xl font-semibold text-tactical-amber uppercase tracking-widest">System Architecture</h2>
          <p className="text-sm text-on-surface-variant mt-2">Multi-Subsystem Data Fusion & Risk Profiling</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
          <div className="md:col-span-2 relative rounded overflow-hidden border border-tactical-amber/20 shadow-2xl bg-surface-container-lowest">
            <img 
              alt="System Architecture Diagram" 
              className="w-full h-auto object-cover mix-blend-screen opacity-90" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkNYBggc_S9Vn5eoa6ReRSNJnDytiOML0rc_2nMOvFej1peA-pascVLeAnLEzsWNil7FYGgYDaDkCBU3H18uMG5i6ZlnAqvGAfwDffDDSwRa4-yH3FjY3JTL5XQ6x9s5oHlYk66UtA1OXxH7PZOdb3lB4cvhDErP35E1e96vlyGTTz6kE3PY0gpMx-_F7xdvnFsVZ3bwZRmMzQ53qunDmSh9pdFkBJ3eOJ3RhwCkt6Pm7zD_zNl2yBR00y8dX4Xv2zF06t0G8n2u4"
            />
            <div className="absolute top-4 left-4 bg-obsidian-base/80 px-3 py-1 border border-tactical-amber/30 backdrop-blur-sm">
              <span className="text-[10px] font-bold uppercase tracking-widest text-tactical-amber">FUSION TOPOLOGY V4.0</span>
            </div>
          </div>
          
          <div className="flex flex-col gap-6">
            <div className="bg-panel-surface p-6 border-l-2 border-bronze-oxide">
              <p className="text-base text-on-surface-variant/90 leading-relaxed">
                Our platform utilizes a multi-subsystem data fusion architecture to aggregate health scores from engine, hydraulics, and landing gear into a unified aircraft risk profile.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-bronze-oxide">
                <Network className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-widest">Unified Data Bus</span>
              </div>
              <div className="flex items-center gap-3 text-bronze-oxide">
                <Activity className="w-5 h-5" />
                <span className="text-[11px] font-bold uppercase tracking-widest">Risk Aggregation Engine</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 px-8 md:px-12 relative z-20 bg-surface-container-lowest overflow-hidden">
        <div className="absolute inset-0 opacity-20 z-0">
          <img 
            alt="Aircraft Data Flow Background" 
            className="w-full h-full object-cover mix-blend-screen" 
            src="https://lh3.googleusercontent.com/aida/AP1WRLty2nAJJz_vclviDO_es2Y8rTwUdwRRsEhw5x8OD-PAlRHXPyFoaOQj_nUS_3bbNwZzMS9f1kSF3GHgomTgENNR4GnioeuMlPRt7viMl4Q_HLEUEsxhl2O5h5z4qOLcnAy6zedDcptyrOdwWqA3x2J5J-SyLgOdZP0blowX77wwfoFIpqZzDH6YP6BFKmqgjnygprz9yqVJyfBx6NJybyWMOk3meOyGNvCZW9lv-RdjBJHNSedWGqpeJg"
          />
          <div className="absolute inset-0 bg-obsidian-base/80"></div>
        </div>
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="mb-16 border-l-2 border-tactical-amber pl-6">
            <h2 className="text-3xl font-bold text-on-surface">ARCHITECTURAL TOPOLOGY</h2>
            <p className="text-base text-on-surface-variant/80 mt-4 max-w-2xl leading-relaxed">Data ingestion from thousands of airborne sensors, fused via our FastAPI fusion backend and Brayton-cycle simulator to predict component fatigue before failure.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-obsidian-base/90 p-6 rounded border border-secondary/10 backdrop-blur-sm">
              <div className="text-tactical-amber font-mono text-[32px] mb-4">01</div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">TELEMETRY INGESTION (ARINC 429)</h4>
              <p className="text-sm text-on-surface-variant/70 leading-relaxed">Continuous streaming of pressure, temperature, and vibration metrics via secure ARINC 429 databuses.</p>
            </div>
            <div className="bg-obsidian-base/90 p-6 rounded border border-secondary/10 backdrop-blur-sm">
              <div className="text-tactical-amber font-mono text-[32px] mb-4">02</div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">FEATURE EXTRACTION (NORMALIZATION)</h4>
              <p className="text-sm text-on-surface-variant/70 leading-relaxed">Automated signal processing pipelines filtering noise and isolating critical condition indicators.</p>
            </div>
            <div className="bg-obsidian-base/90 p-6 rounded border border-secondary/10 backdrop-blur-sm">
              <div className="text-tactical-amber font-mono text-[32px] mb-4">03</div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">SUBSYSTEM INFERENCE (ML FLOW)</h4>
              <p className="text-sm text-on-surface-variant/70 leading-relaxed">Independent ML models analyze specific component health, generating localized probability distributions.</p>
            </div>
            <div className="bg-obsidian-base/90 p-6 rounded border border-secondary/10 backdrop-blur-sm">
              <div className="text-tactical-amber font-mono text-[32px] mb-4">04</div>
              <h4 className="text-[11px] font-bold uppercase tracking-widest text-on-surface mb-2">FUSION ORCHESTRATION (FASTAPI)</h4>
              <p className="text-sm text-on-surface-variant/70 leading-relaxed">Meta-learner synthesizes localized outputs into a holistic aircraft health score and predictive maintenance schedule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Precision Intelligence Section */}
      <section className="py-24 px-8 md:px-12 max-w-[1440px] mx-auto relative z-20 flex flex-col md:flex-row items-center gap-12">
        <div className="w-full md:w-1/2">
          <div className="mb-8 border-b border-secondary/20 pb-4 inline-block">
            <h2 className="text-2xl font-semibold text-tactical-amber">PRECISION INTELLIGENCE</h2>
          </div>
          <h3 className="text-3xl font-bold text-on-surface mb-6">Deep Neural Networks for Unparalleled Foresight</h3>
          <p className="text-base text-on-surface-variant/80 mb-6 leading-relaxed">
            Our BiLSTM + Attention architecture captures complex, long-term temporal dependencies in engine degradation patterns. By dynamically weighting historical sensor data, the model achieves zero-AOG precision in remaining useful life (RUL) estimation.
          </p>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li className="flex items-center gap-3">
              <CheckCircle className="text-tactical-amber w-5 h-5" />
              <span>Attention mechanism focuses on critical deterioration phases</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-tactical-amber w-5 h-5" />
              <span>Bidirectional LSTM processes sequences forward and backward</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="text-tactical-amber w-5 h-5" />
              <span>Robust against sensor noise and intermittent data loss</span>
            </li>
          </ul>
        </div>
        
        <div className="w-full md:w-1/2 relative rounded overflow-hidden border border-secondary/20 shadow-2xl">
          <img 
            alt="Neural Network Topology" 
            className="w-full h-auto object-cover" 
            src="/neural_network.png"
          />
          <div className="absolute bottom-4 left-4 bg-obsidian-base/90 px-3 py-1.5 rounded border border-tactical-amber/30 backdrop-blur-md">
            <span className="text-[11px] font-bold uppercase tracking-widest text-tactical-amber">MODEL TOPOLOGY VISUALIZATION</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface-container-lowest w-full border-t border-secondary/20 py-12 px-8 md:px-12 relative z-30">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b border-secondary/10 pb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-semibold text-tactical-amber tracking-tight mb-4">AeroSentinal</div>
            <p className="text-sm text-on-surface-variant/70 max-w-sm leading-relaxed">
              Advanced predictive maintenance solutions leveraging fusion-orchestrated machine learning for next-generation aerospace reliability.
            </p>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-on-surface mb-6">SYSTEM PORTALS</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant/80">
              <li><Link href="/dashboard" className="hover:text-tactical-amber transition-colors">Operations Dashboard</Link></li>
              <li><Link href="/simulator" className="hover:text-tactical-amber transition-colors">Flight Simulator</Link></li>
              <li><Link href="/ml-models" className="hover:text-tactical-amber transition-colors">Model Registry</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-on-surface mb-6">RESOURCES</h4>
            <ul className="space-y-3 text-sm text-on-surface-variant/80">
              <li><Link href="/docs" className="hover:text-tactical-amber transition-colors">API Documentation</Link></li>
              <li><a href="#" className="hover:text-tactical-amber transition-colors">Architecture Whitepaper</a></li>
              <li><a href="#" className="hover:text-tactical-amber transition-colors">Support Protocol</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-[11px] font-bold uppercase tracking-widest text-bronze-oxide flex items-center gap-4">
            <span>© 2024 AEROSENTINAL AEROSPACE</span>
            <span className="w-1 h-1 bg-bronze-oxide rounded-full"></span>
            <span className="text-status-optimal flex items-center gap-2">
              <span className="w-2 h-2 bg-status-optimal rounded-full animate-pulse"></span>
              SYSTEM STATUS: OPTIMAL
            </span>
          </div>
          <div className="flex flex-wrap gap-6 text-[11px] font-bold uppercase tracking-widest text-bronze-oxide/60">
            <span className="cursor-default">UPTIME: 99.99%</span>
            <span className="cursor-default">DATA LINK: ENCRYPTED</span>
            <span className="cursor-default">SATCOM: ACTIVE</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
