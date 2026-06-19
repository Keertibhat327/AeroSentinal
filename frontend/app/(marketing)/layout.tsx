import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AeroSentinal | Predictive Maintenance",
  description: "Holistic Aircraft Predictive Maintenance System",
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="fixed top-0 w-full z-50 glass-panel border-x-0 border-t-0 rounded-none bg-background/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-gradient tracking-tight">AeroSentinal</div>
        </div>
      </header>
      <main className="flex-1 pt-16">
        {children}
      </main>
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <p>AeroSentinal Prototype — Phase 1</p>
        <p className="mt-2 text-xs">3D assets procedurally generated (placeholder).</p>
      </footer>
    </div>
  );
}
