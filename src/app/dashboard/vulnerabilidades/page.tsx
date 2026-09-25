import React from 'react';
import Sidebar from '@/components/Sidebar';
import { ShieldAlert, Bug, Activity } from 'lucide-react';

export default function VulnerabilidadesPage() {
  const vulns = [
    { cve: 'CVE-2021-44228', name: 'Log4Shell Ejecución Remota', cvss: 10.0, status: 'Parcheado', date: '2021-12-10', asset: 'SRV-WEB-02' },
    { cve: 'CVE-2023-23397', name: 'Outlook Elevation of Privilege', cvss: 9.8, status: 'Abierto', date: '2023-03-14', asset: 'Red Corporativa' },
    { cve: 'CVE-2023-38545', name: 'curl SOCKS5 Heap Buffer', cvss: 7.5, status: 'Mitigado', date: '2023-10-11', asset: 'NET-FW-01' },
    { cve: 'CVE-2024-3094', name: 'XZ Utils Backdoor', cvss: 10.0, status: 'Investigando', date: '2024-03-29', asset: 'Clúster Linux' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="text-sm text-slate-500 font-medium">Enterprise Suite <span className="mx-2">/</span> Vulnerabilidades (Scanner)</div>
        </header>
        
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Centro de Vulnerabilidades</h1>
              <p className="text-sm text-slate-500 mt-1">Monitoreo continuo de CVEs y exposiciones (Integración NVD NIST).</p>
            </div>
            <button className="px-4 py-2 bg-slate-800 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-900 flex items-center">
              <Activity size={16} className="mr-2" /> Ejecutar Escaneo Rápido
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-red-500">
                <div className="text-xs font-bold text-slate-500 uppercase">CVSS Crítico (9.0 - 10.0)</div>
                <div className="mt-2 text-3xl font-black text-slate-800">2</div>
             </div>
             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-t-4 border-t-orange-500">
                <div className="text-xs font-bold text-slate-500 uppercase">CVSS Alto (7.0 - 8.9)</div>
                <div className="mt-2 text-3xl font-black text-slate-800">1</div>
             </div>
             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase">En investigación</div>
                <div className="mt-2 text-3xl font-black text-slate-800">1</div>
             </div>
             <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
                <div className="text-xs font-bold text-slate-500 uppercase">Parcheados (Últ. 30 días)</div>
                <div className="mt-2 text-3xl font-black text-slate-800">12</div>
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">CVE / Identificador</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">CVSS v3.1</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Activo Afectado</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado de Remediación</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {vulns.map((v) => (
                  <tr key={v.cve} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-blue-600 hover:underline cursor-pointer">{v.cve}</div>
                      <div className="text-xs text-slate-500 mt-1">{v.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 font-bold rounded text-xs ${v.cvss >= 9 ? 'bg-red-100 text-red-800' : 'bg-orange-100 text-orange-800'}`}>
                        {v.cvss.toFixed(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">{v.asset}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                        v.status === 'Abierto' ? 'border-red-200 bg-red-50 text-red-700' :
                        v.status === 'Mitigado' ? 'border-yellow-200 bg-yellow-50 text-yellow-700' :
                        v.status === 'Investigando' ? 'border-blue-200 bg-blue-50 text-blue-700' :
                        'border-green-200 bg-green-50 text-green-700'
                      }`}>
                        {v.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}
