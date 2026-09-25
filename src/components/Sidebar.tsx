'use client';

import React from 'react';
import { Activity, Server, ShieldAlert, FileText, CheckCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col h-full shrink-0">
      <div className="p-6">
        <h2 className="text-xs font-bold text-slate-400 tracking-wider mb-4">MATRIZ DE RIESGOS TI</h2>
        <nav className="space-y-1">
          <SidebarItem href="/dashboard" icon={<Activity size={18} />} text="Panel General" active={pathname === '/dashboard'} />
          <SidebarItem href="/dashboard/activos" icon={<Server size={18} />} text="Activos Críticos" active={pathname === '/dashboard/activos'} />
          <SidebarItem href="/dashboard/vulnerabilidades" icon={<ShieldAlert size={18} />} text="Vulnerabilidades" active={pathname === '/dashboard/vulnerabilidades'} />
          <SidebarItem href="/dashboard/auditoria" icon={<FileText size={18} />} text="Auditoría & Logs" active={pathname === '/dashboard/auditoria'} />
        </nav>
      </div>
      <div className="mt-auto p-4 border-t border-slate-200 flex items-center text-xs text-blue-600 font-medium">
        <CheckCircle size={14} className="mr-2" /> ISO 27001 Status: 99.4% Validado
      </div>
    </div>
  );
}

function SidebarItem({ icon, text, active, href }: { icon: React.ReactNode, text: string, active: boolean, href: string }) {
  return (
    <Link href={href} className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}>
      <span className={`${active ? 'text-blue-600' : 'text-slate-400'} mr-3`}>{icon}</span>
      {text}
    </Link>
  );
}
