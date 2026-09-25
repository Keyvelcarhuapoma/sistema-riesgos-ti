import React from 'react';
import Sidebar from '@/components/Sidebar';
import { FileText, Clock, User, Download, Lock } from 'lucide-react';

export default function AuditoriaPage() {
  const logs = [
    { id: 1, time: 'Hace 5 min', user: 'admin@secops.com', action: 'Intento fallido de inicio de sesión', resource: 'Autenticación', ip: '189.21.44.12' },
    { id: 2, time: 'Hace 12 min', user: 'admin@secops.com', action: 'Inicio de sesión exitoso (MFA validado)', resource: 'Dashboard', ip: '192.168.1.45' },
    { id: 3, time: 'Hace 2 horas', user: 'j.perez@secops.com', action: 'Modificó política de retención', resource: 'Configuración S3', ip: '10.0.1.23' },
    { id: 4, time: 'Hace 5 horas', user: 'Sistema Automático', action: 'Escaneo de vulnerabilidades NVD completado', resource: 'Módulo CVE', ip: 'localhost' },
    { id: 5, time: 'Ayer', user: 'm.gomez@secops.com', action: 'Registró nuevo riesgo (Log4Shell)', resource: 'Base de Datos (risks)', ip: '192.168.1.18' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="text-sm text-slate-500 font-medium">Enterprise Suite <span className="mx-2">/</span> Auditoría & Logs</div>
        </header>
        
        <main className="flex-1 overflow-auto p-8">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Trazabilidad y Logs</h1>
              <p className="text-sm text-slate-500 mt-1">Registro inmutable de actividades para cumplimiento normativo (SOC 2, ISO 27001).</p>
            </div>
            <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-sm font-semibold rounded-lg shadow-sm hover:bg-slate-50 flex items-center">
              <Download size={16} className="mr-2" /> Exportar CSV
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Lock size={120} />
            </div>
            
            <div className="space-y-6 relative z-10">
              {logs.map((log, index) => (
                <div key={log.id} className="flex relative">
                  {index !== logs.length - 1 && (
                    <div className="absolute top-8 left-4 bottom-0 w-0.5 bg-slate-100 -ml-px" />
                  )}
                  <div className="relative flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-300 z-10">
                    <Clock size={14} className="text-slate-500" />
                  </div>
                  <div className="ml-4 min-w-0 flex-1 bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-semibold text-slate-800">{log.action}</div>
                        <div className="text-xs text-slate-500 mt-1 flex items-center">
                          <User size={12} className="mr-1" /> {log.user} 
                          <span className="mx-2">•</span> 
                          Módulo: {log.resource}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-medium text-slate-400">{log.time}</div>
                        <div className="text-[10px] font-mono text-slate-400 mt-1">IP: {log.ip}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}
