import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AeroSentinal | Predictive Maintenance",
  description: "Holistic Aircraft Predictive Maintenance System",
};

import Link from "next/link";
import { Bell, Settings, User } from "lucide-react";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-obsidian-base text-on-surface font-sans min-h-screen flex flex-col overflow-x-hidden pt-[73px]">
      {/* Top Navigation */}
      <nav className="bg-obsidian-base/80 backdrop-blur-md w-full fixed top-0 left-0 z-50 border-b border-secondary/20 flex justify-between items-center px-8 lg:px-12 py-4">
        <div className="text-2xl font-bold text-tactical-amber tracking-tighter uppercase">AeroSentinal</div>
        <div className="hidden md:flex gap-8 items-center text-[11px] font-bold uppercase tracking-widest">
          <Link href="/dashboard" className="text-on-surface-variant/70 hover:text-tactical-amber transition-colors duration-200">DASHBOARD</Link>
          <Link href="/simulator" className="text-on-surface-variant/70 hover:text-tactical-amber transition-colors duration-200">SIMULATOR</Link>
          <Link href="/ml-models" className="text-on-surface-variant/70 hover:text-tactical-amber transition-colors duration-200">ML MODELS</Link>
          <Link href="/docs" className="text-on-surface-variant/70 hover:text-tactical-amber transition-colors duration-200">DOCUMENTATION</Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-tactical-amber hover:text-primary transition-colors active:scale-95">
            <Bell className="w-5 h-5 fill-current" />
          </button>
          <button className="text-tactical-amber hover:text-primary transition-colors active:scale-95">
            <Settings className="w-5 h-5 fill-current" />
          </button>
          <button className="text-tactical-amber hover:text-primary transition-colors active:scale-95">
            <User className="w-5 h-5 fill-current" />
          </button>
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-grow relative">
        {children}
      </main>
    </div>
  );
}
