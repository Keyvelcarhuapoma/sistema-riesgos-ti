'use client';

import React, { useState } from 'react';
import { AlertTriangle, LogOut, Activity, Search } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import RiskMatrix from '@/components/RiskMatrix';
import ConfirmModal from '@/components/ConfirmModal';
import { supabase } from '@/lib/supabaseClient';

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);
  const [cveId, setCveId] = useState('');
  const [loadingCve, setLoadingCve] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', category: 'Amenaza Cibernética', probability: 'Media (2)', impact: 'Medio (2)', description: '', mitigation: ''
  });

  const searchCVE = async () => {
    if (!cveId) return;
    setLoadingCve(true);
    try {
      const response = await fetch(`https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=${cveId.toUpperCase()}`);
      const data = await response.json();
      if (data.vulnerabilities && data.vulnerabilities.length > 0) {
        const cveData = data.vulnerabilities[0].cve;
        const description = cveData.descriptions.find((d: any) => d.lang === 'en')?.value || '';
        
        setFormData({
          ...formData,
          title: `Vulnerabilidad ${cveId.toUpperCase()}`,
          description: description,
          category: 'Amenaza Cibernética',
          impact: 'Alto (3)',
        });
        alert('¡CVE encontrado! Datos autocompletados desde el NIST (Gobierno EE.UU.).');
      } else {
        alert('CVE no encontrado en la base de datos oficial.');
      }
    } catch (error) {
      alert('Error conectando a la API del NIST.');
    }
    setLoadingCve(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-800">
      {/* Componente importado */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6">
          <div className="text-sm text-slate-500 font-medium">
            Enterprise Suite <span className="mx-2">/</span> Módulo de Prevención de Riesgos
          </div>
          <button onClick={() => window.location.href = '/'} className="flex items-center text-sm text-slate-600 hover:text-slate-900">
            <LogOut size={16} className="mr-2" /> Salir
          </button>
        </header>

        {/* Dashboard Area */}
        <main className="flex-1 overflow-auto p-6 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            {/* Header Title */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 mb-6 flex justify-between items-center shadow-sm">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  Módulo de Prevención de Riesgos
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-semibold border border-blue-200">Auditoría Activa 2025</span>
                </h1>
                <p className="text-sm text-slate-500 mt-1">Identificación, evaluación cualitativa y registro de controles de mitigación para activos de información críticos.</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-6">
              <StatCard title="RIESGOS IDENTIFICADOS" value="24" subtitle="activos mapeados" trend="+3 este trimestre" />
              <StatCard title="CONTROLES IMPLEMENTADOS" value="88%" subtitle="de cobertura" progress={88} />
              <StatCard title="EXPOSICIÓN RESIDUAL" value="Moderado" subtitle="Umbral de tolerancia: 65/100" />
            </div>

            <div className="grid grid-cols-3 gap-6">
              {/* Formulario */}
              <div className="col-span-2 bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 bg-red-50 text-red-700 p-3 rounded-lg border border-red-100 mb-6">
                  <AlertTriangle size={20} />
                  <div>
                    <h3 className="font-semibold text-sm">Nuevo Registro de Riesgo Tecnológico</h3>
                    <p className="text-xs">Complete los parámetros técnicos para calcular la criticidad.</p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Buscador de API NIST */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 flex gap-3 items-end mb-4">
                    <div className="flex-1">
                      <label className="block text-[11px] font-bold text-blue-800 uppercase tracking-wider mb-1">Importar desde NVD (API EE.UU.)</label>
                      <input type="text" placeholder="Ej: CVE-2021-44228" className="w-full border border-blue-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={cveId} onChange={e => setCveId(e.target.value)} />
                    </div>
                    <button type="button" onClick={searchCVE} disabled={loadingCve} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                      <Search size={16} /> {loadingCve ? 'Buscando...' : 'Buscar en BD'}
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Título del Riesgo *</label>
                    <input type="text" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Categoría</label>
                      <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                        <option>Amenaza Cibernética</option><option>Falla Técnica</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Probabilidad</label>
                      <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" value={formData.probability} onChange={e => setFormData({...formData, probability: e.target.value})}>
                        <option>Baja (1)</option><option>Media (2)</option><option>Alta (3)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Impacto</label>
                      <select className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" value={formData.impact} onChange={e => setFormData({...formData, impact: e.target.value})}>
                        <option>Bajo (1)</option><option>Medio (2)</option><option>Alto (3)</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Descripción de la vulnerabilidad</label>
                    <textarea rows={3} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Plan de Mitigación / Controles</label>
                    <textarea rows={2} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm" value={formData.mitigation} onChange={e => setFormData({...formData, mitigation: e.target.value})}></textarea>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3 border-t border-slate-100 pt-5">
                  <button className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-300 rounded-lg">Cancelar</button>
                  <button onClick={() => setShowModal(true)} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg shadow-md">Registrar Riesgo</button>
                </div>
              </div>

              {/* Componente importado */}
              <RiskMatrix />
            </div>
          </div>
        </main>
      </div>

      {/* Componente importado */}
      <ConfirmModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onConfirm={async () => { 
          const { error } = await supabase.from('risks').insert([{
            title: formData.title,
            category: formData.category,
            impact: formData.impact,
            probability: formData.probability,
            description: formData.description,
            mitigation: formData.mitigation
          }]);
          if (error) {
            alert('Error guardando en la BD: ' + error.message);
          } else {
            alert('¡Riesgo guardado de forma inmutable en Supabase PostgreSQL!'); 
            setFormData({ title: '', category: 'Amenaza Cibernética', probability: 'Media (2)', impact: 'Medio (2)', description: '', mitigation: '' });
            setShowModal(false); 
          }
        }} 
        formData={formData} 
      />
    </div>
  );
}

// Mini componente para las tarjetas de estadísticas
function StatCard({ title, value, subtitle, trend, progress }: any) {
  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{title}</h3>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-black text-slate-800">{value}</span>
        <span className="text-sm font-medium text-slate-500 mb-1">{subtitle}</span>
      </div>
      {trend && <div className="mt-3 text-xs font-semibold text-blue-600 flex items-center"><Activity size={12} className="mr-1"/> {trend}</div>}
      {progress && (
        <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
}
