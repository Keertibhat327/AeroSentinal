"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Settings, User } from "lucide-react";

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "DASHBOARD" },
    { href: "/simulator", label: "SIMULATOR" },
    { href: "/ml-models", label: "ML MODELS" },
    { href: "/docs", label: "DOCUMENTATION" },
  ];

  return (
    <div className="bg-obsidian-base text-on-surface font-sans min-h-screen flex flex-col overflow-x-hidden pt-[73px]">
      {/* TopNavBar */}
      <header className="w-full fixed top-0 left-0 z-50 bg-obsidian-base border-b border-secondary/20">
        <div className="flex justify-between items-center px-8 lg:px-12 py-4 max-w-[1440px] mx-auto">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-tactical-amber tracking-tighter uppercase">
              AeroSentinal
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-[11px] font-bold uppercase tracking-widest">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className={`transition-all duration-200 active:scale-95 ${
                      isActive 
                        ? "text-tactical-amber border-b-2 border-tactical-amber pb-1" 
                        : "text-on-surface-variant/70 hover:text-tactical-amber"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex items-center gap-4 text-on-surface-variant/70">
            <button aria-label="Notifications" className="hover:text-tactical-amber transition-colors duration-200">
              <Bell className="w-5 h-5 fill-current" />
            </button>
            <button aria-label="Settings" className="hover:text-tactical-amber transition-colors duration-200">
              <Settings className="w-5 h-5 fill-current" />
            </button>
            <button aria-label="Account" className="hover:text-tactical-amber transition-colors duration-200">
              <User className="w-5 h-5 fill-current" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {children}

      {/* Footer */}
      <footer className="w-full border-t border-secondary/10 bg-surface-container-lowest mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center px-8 lg:px-12 py-6 max-w-[1440px] mx-auto gap-4 text-[11px] font-bold uppercase tracking-widest">
          <div className="text-bronze-oxide">
            © 2024 AEROSENTINAL AEROSPACE • SYSTEM STATUS: <span className="text-status-optimal">OPTIMAL</span>
          </div>
          <div className="flex gap-6 text-bronze-oxide/60">
            <span className="hover:text-tactical-amber transition-colors cursor-default">UPTIME: 99.99%</span>
            <span className="hover:text-tactical-amber transition-colors cursor-default">DATA LINK: ENCRYPTED</span>
            <span className="hover:text-tactical-amber transition-colors cursor-default">SATCOM: ACTIVE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
