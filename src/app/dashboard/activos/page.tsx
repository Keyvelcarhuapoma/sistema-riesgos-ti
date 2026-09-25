'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import { Server, Database, Cloud, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function ActivosPage() {
  const [activos, setActivos] = useState([
    { id: 'SRV-DB-01', name: 'Clúster PostgreSQL Principal', type: 'Database', ip: '10.0.1.5', status: 'Operativo', crit: 'Extrema' },
    { id: 'SRV-WEB-02', name: 'Servidor Web Node.js', type: 'Server', ip: '10.0.2.10', status: 'Advertencia', crit: 'Alta' },
    { id: 'NET-FW-01', name: 'Firewall Perimetral DMZ', type: 'Network', ip: '192.168.1.1', status: 'Operativo', crit: 'Extrema' },
    { id: 'CLD-S3-04', name: 'AWS S3 Backups', type: 'Cloud', ip: 'N/A', status: 'Operativo', crit: 'Media' },
  ]);

  const handleRegistrar = () => {
    const nombreActivo = window.prompt("Ingresa el nombre del nuevo Activo TI (ej. Servidor de Correos):");
    if (nombreActivo) {
      const nuevoActivo = {
        id: `NEW-${Math.floor(Math.random() * 1000)}`,
        name: nombreActivo,
        type: 'Server',
        ip: '192.168.x.x',
        status: 'Operativo',
        crit: 'Alta'
      };
      setActivos([...activos, nuevoActivo]);
      alert("¡Activo registrado correctamente en la CMDB local!");
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'Database': return <Database size={18} className="text-purple-500" />;
      case 'Cloud': return <Cloud size={18} className="text-blue-500" />;
      default: return <Server size={18} className="text-slate-500" />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="text-sm text-slate-500 font-medium">Enterprise Suite <span className="mx-2">/</span> Activos Críticos</div>
        </header>
        
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Inventario de Activos (CMDB)</h1>
              <p className="text-sm text-slate-500 mt-1">Gestión y clasificación de activos de información según ISO 27001.</p>
            </div>
            <button 
              onClick={handleRegistrar}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-blue-700"
            >
              + Registrar Activo
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Activo</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">IP / Red</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Criticidad</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {activos.map((activo) => (
                  <tr key={activo.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getIcon(activo.type)}
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-slate-900">{activo.name}</div>
                          <div className="text-xs text-slate-500">{activo.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-mono">{activo.ip}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${activo.crit === 'Extrema' ? 'bg-red-100 text-red-800' : activo.crit === 'Alta' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {activo.crit}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {activo.status === 'Operativo' ? (
                        <div className="flex items-center text-sm text-green-600 font-medium"><ShieldCheck size={16} className="mr-1"/> Seguro</div>
                      ) : (
                        <div className="flex items-center text-sm text-amber-600 font-medium"><AlertTriangle size={16} className="mr-1"/> Requiere revisión</div>
                      )}
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
