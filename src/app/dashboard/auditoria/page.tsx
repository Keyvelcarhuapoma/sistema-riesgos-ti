import React from 'react';
import Sidebar from '@/components/Sidebar';
import { FileText } from 'lucide-react';

export default function AuditoriaPage() {
  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-200 text-center max-w-md">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-slate-100 text-slate-600 rounded-full">
              <FileText size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Auditoría & Logs</h1>
          <p className="text-slate-500 mb-6">El historial inmutable de auditoría (ISO 27001) se implementará en la Fase 2 del proyecto.</p>
          <a href="/dashboard" className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">Volver al Panel General</a>
        </div>
      </div>
    </div>
  );
}
