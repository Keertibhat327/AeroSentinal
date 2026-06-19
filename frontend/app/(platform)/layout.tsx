"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Plane, Settings, LayoutDashboard, BookOpen, AlertCircle } from "lucide-react";
import clsx from "clsx";
import { useStore } from "@/lib/store";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { backendOnline } = useStore();
  // Client-only clock — starts null so SSR and initial client render both output nothing,
  // eliminating the second-level hydration mismatch.
  const [zuluTime, setZuluTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () => {
      const now = new Date();
      const date = now.toISOString().split('T')[0];
      const time = now.toISOString().split('T')[1].substring(0, 8);
      setZuluTime(`${date} | ZULU: ${time}`);
    };
    fmt();
    const id = setInterval(fmt, 1000);
    return () => clearInterval(id);
  }, []);

  const navItems = [
    { name: "Fleet Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Aircraft Diagnostics", href: "/dashboard/aircraft/N1234A", icon: Plane },
    { name: "Repair Assistant", href: "/dashboard/assistant", icon: BookOpen },
    { name: "System Settings", href: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 flex-shrink-0 border-r border-white/10 glass-panel border-y-0 border-l-0 rounded-none z-20 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/" className="text-xl font-bold text-gradient tracking-tight">AeroSentinal</Link>
        </div>

        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          <div className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Platform</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all font-medium text-sm",
                  isActive 
                    ? "bg-primary-500/10 text-primary-400" 
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                )}
              >
                <item.icon className={clsx("w-5 h-5", isActive ? "text-primary-400" : "text-gray-500")} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className={clsx(
            "px-3 py-2 rounded-lg flex items-center gap-3 text-sm",
            backendOnline ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"
          )}>
            <div className={clsx("w-2 h-2 rounded-full animate-pulse", backendOnline ? "bg-emerald-400" : "bg-amber-400")} />
            {backendOnline ? "Backend Online" : "Offline / Mocked"}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 flex-shrink-0 glass-panel border-x-0 border-t-0 rounded-none flex items-center justify-between px-8 z-10">
          <div className="text-sm text-gray-400 font-mono">
            {zuluTime ?? '——————————————'}
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-400 hover:text-white transition-colors">
              <AlertCircle className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center text-primary-400 font-bold text-xs">
              DS
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
