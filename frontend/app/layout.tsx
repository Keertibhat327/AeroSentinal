import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Activity, Plane, Settings, LayoutDashboard, BookOpen } from "lucide-react";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AeroSentinal Prototype",
  description: "Holistic Aircraft Predictive Maintenance System",
};

function Sidebar() {
  const navItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Fleet 3D View", href: "/aircraft/N1234A", icon: Plane },
    { name: "Simulator", href: "/simulator", icon: Activity },
    { name: "Repair Assistant", href: "/nlp", icon: BookOpen },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 glass-panel border-l-0 rounded-none rounded-r-3xl z-50 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gradient tracking-tight">AeroSentinal</h1>
        <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">PHM Prototype</p>
      </div>

      <nav className="flex-1 px-4 mt-8 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-xl transition-all group"
          >
            <item.icon className="w-5 h-5 group-hover:text-primary-400 transition-colors" />
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6">
        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <div className="text-xs text-gray-400">System Status</div>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-medium text-emerald-400">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={clsx(inter.className, "min-h-screen antialiased")}>
        <Sidebar />
        <main className="ml-64 p-8 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
