"use client";

import { Canvas } from "@react-three/fiber";
import { PresentationControls, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Thermometer, Droplets, ArrowDownToLine, Zap, Wind, Link as LinkIcon, CheckCircle } from "lucide-react";
import AircraftModel from "@/components/3d/AircraftModel";
import { Suspense } from "react";

const features = [
  { icon: Thermometer, name: "Engine", desc: "RUL predictions via BiLSTM+Attention on NASA C-MAPSS data." },
  { icon: Droplets, name: "Hydraulics", desc: "1D Conv Autoencoder anomaly detection on UCI test rig telemetry." },
  { icon: ArrowDownToLine, name: "Landing Gear", desc: "Physics-informed XGBoost for brake wear and kinetic energy limits." },
  { icon: Zap, name: "APU", desc: "Random Forest health scoring for EGT margin deviations." },
  { icon: Wind, name: "ECS", desc: "Reverse-Brayton thermodynamic simulation tracking heat exchanger fouling." }
];

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full opacity-50">
          <Canvas camera={{ position: [0, 5, 25], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
            <Environment preset="city" />
            <PresentationControls global rotation={[0.1, -0.3, 0]} polar={[-0.2, 0.2]} azimuth={[-0.5, 0.5]}>
              <Suspense fallback={null}>
                <AircraftModel />
              </Suspense>
            </PresentationControls>
          </Canvas>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-start pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 max-w-3xl"
          >
            Predictive Maintenance, <span className="text-gradient">Fused.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10"
          >
            AeroSentinal aggregates live telemetry from five distinct aircraft subsystems into a unified, actionable health picture. Powered by independent ML models and deep cross-domain physics coupling.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pointer-events-auto"
          >
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-xl transition-colors">
              Launch Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">How AeroSentinal Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Ingest & Predict", desc: "Independent models process telemetry (C-MAPSS, UCI) to generate localized health scores." },
              { step: "2", title: "Cross-Domain Fusion", desc: "The orchestration layer contextualizes scores, identifying root causes that cross subsystem boundaries." },
              { step: "3", title: "Actionable Output", desc: "Generates compressed ACARS alerts and quantified AOG financial risk for dispatchers." }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-8 text-center"
              >
                <div className="w-12 h-12 bg-primary-500/20 text-primary-400 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-3">{s.title}</h3>
                <p className="text-gray-400">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Domain Coupling Highlight */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="glass-panel border-emerald-500/30 bg-emerald-500/5 p-8 md:p-12 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <LinkIcon className="w-64 h-64" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 text-sm font-bold uppercase tracking-widest rounded-md mb-6">
              The AeroSentinal Difference
            </div>
            <h2 className="text-3xl font-bold mb-6">Cross-Domain Attribution</h2>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              When the Environmental Control System (ECS) suffers from heat exchanger fouling, it draws more bleed air from the engine. 
              An isolated engine model sees this load spike and falsely flags a compressor fault. 
              AeroSentinal's fusion layer recognizes the ECS state and correctly attributes the anomaly, <strong>preventing false engine removals</strong>.
            </p>
            <ul className="space-y-4 text-emerald-300">
              <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> ECS fouling detected</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> Engine bleed demand spike correlated</li>
              <li className="flex items-center gap-3"><CheckCircle className="w-5 h-5" /> Engine health score corrected</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Subsystem Grid */}
      <section className="py-24 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-12 text-center">Five Independent Subsystems</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="glass-panel p-6 hover:border-primary-500/30 transition-colors"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.name}</h3>
                <p className="text-sm text-gray-400">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Honesty Policy Stat */}
      <section className="py-24 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-6xl font-bold font-mono text-primary-400 mb-4 tracking-tighter">100%</div>
          <h3 className="text-xl font-bold mb-2">Transparent Data Provenance</h3>
          <p className="text-gray-400 max-w-xl mx-auto">
            Every metric and diagnosis explicitly identifies whether it was derived from real historical datasets or our physics-informed synthetic simulators.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
