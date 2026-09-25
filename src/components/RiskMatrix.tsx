import React from 'react';

export default function RiskMatrix() {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-full">
      <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center justify-between">
        Cálculo de Severidad 3x3
        <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-mono">Score: 4/9</span>
      </h3>
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-100 mb-6">
        <p className="text-xs font-semibold text-blue-800">Riesgo Moderado / Medio (4)</p>
        <p className="text-[10px] text-blue-600 mt-1">Requiere revisión operacional mensual y asignación de propietario.</p>
      </div>
      
      {/* 3x3 Heatmap */}
      <div className="grid grid-cols-3 gap-1 mb-6">
        <div className="h-12 bg-blue-100 rounded flex flex-col items-center justify-center text-[10px] text-blue-800 font-bold">P3 × I1 <br/> 3 - Medio</div>
        <div className="h-12 bg-red-200 rounded flex flex-col items-center justify-center text-[10px] text-red-800 font-bold">P3 × I2 <br/> 6 - Alto</div>
        <div className="h-12 bg-red-400 rounded flex flex-col items-center justify-center text-[10px] text-white font-bold">P3 × I3 <br/> 9 - Crítico</div>
        
        <div className="h-12 bg-slate-100 rounded flex flex-col items-center justify-center text-[10px] text-slate-500 font-bold">P2 × I1 <br/> 2 - Bajo</div>
        <div className="h-12 bg-blue-500 rounded ring-2 ring-blue-600 ring-offset-2 flex flex-col items-center justify-center text-[10px] text-white font-bold shadow-lg transform scale-105">P2 × I2 <br/> 4 - Medio</div>
        <div className="h-12 bg-red-200 rounded flex flex-col items-center justify-center text-[10px] text-red-800 font-bold">P2 × I3 <br/> 6 - Alto</div>
        
        <div className="h-12 bg-slate-100 rounded flex flex-col items-center justify-center text-[10px] text-slate-500 font-bold">P1 × I1 <br/> 1 - Mínimo</div>
        <div className="h-12 bg-slate-100 rounded flex flex-col items-center justify-center text-[10px] text-slate-500 font-bold">P1 × I2 <br/> 2 - Bajo</div>
        <div className="h-12 bg-blue-100 rounded flex flex-col items-center justify-center text-[10px] text-blue-800 font-bold">P1 × I3 <br/> 3 - Medio</div>
      </div>
    </div>
  );
}
