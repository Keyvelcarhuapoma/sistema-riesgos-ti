import React from 'react';

export default function RiskMatrix({ probability = 'Media (2)', impact = 'Medio (2)' }: { probability?: string, impact?: string }) {
  const p = parseInt(probability.match(/\d/)?.[0] || '2');
  const i = parseInt(impact.match(/\d/)?.[0] || '2');
  const score = p * i;

  const isSelected = (rowP: number, colI: number) => rowP === p && colI === i;

  let riskLabel = 'Medio';
  let riskColor = 'blue';
  let riskMessage = 'Requiere revisión operacional mensual y asignación de propietario.';
  
  if (score >= 6) {
    riskLabel = score === 9 ? 'Crítico' : 'Alto';
    riskColor = 'red';
    riskMessage = 'Requiere mitigación inmediata. Escalar al CISO y comité de riesgos.';
  } else if (score <= 2) {
    riskLabel = 'Bajo';
    riskColor = 'slate';
    riskMessage = 'Riesgo aceptable dentro del umbral. Monitoreo trimestral.';
  }

  const getCellClass = (rowP: number, colI: number) => {
    const cellScore = rowP * colI;
    const selected = isSelected(rowP, colI);
    let baseClass = "h-12 rounded flex flex-col items-center justify-center text-[10px] font-bold transition-all ";
    
    if (selected) {
      if (cellScore >= 6) return baseClass + "bg-red-500 ring-2 ring-red-600 ring-offset-2 text-white shadow-lg transform scale-105";
      if (cellScore <= 2) return baseClass + "bg-slate-500 ring-2 ring-slate-600 ring-offset-2 text-white shadow-lg transform scale-105";
      return baseClass + "bg-blue-500 ring-2 ring-blue-600 ring-offset-2 text-white shadow-lg transform scale-105";
    }

    if (cellScore >= 6) return baseClass + "bg-red-200 text-red-800";
    if (cellScore === 9) return baseClass + "bg-red-400 text-white";
    if (cellScore <= 2) return baseClass + "bg-slate-100 text-slate-500";
    return baseClass + "bg-blue-100 text-blue-800";
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm h-full transition-all">
      <h3 className="font-bold text-sm text-slate-800 mb-4 flex items-center justify-between">
        Cálculo de Severidad 3x3
        <span className={`bg-${riskColor}-50 text-${riskColor}-700 px-2 py-1 rounded text-xs font-mono`}>Score: {score}/9</span>
      </h3>
      <div className={`bg-${riskColor}-50 p-3 rounded-lg border border-${riskColor}-100 mb-6 transition-all`}>
        <p className={`text-xs font-semibold text-${riskColor}-800`}>Riesgo {riskLabel} ({score})</p>
        <p className={`text-[10px] text-${riskColor}-600 mt-1`}>{riskMessage}</p>
      </div>
      
      {/* 3x3 Heatmap */}
      <div className="grid grid-cols-3 gap-1 mb-6">
        <div className={getCellClass(3, 1)}>P3 × I1 <br/> 3 - Medio</div>
        <div className={getCellClass(3, 2)}>P3 × I2 <br/> 6 - Alto</div>
        <div className={getCellClass(3, 3)}>P3 × I3 <br/> 9 - Crítico</div>
        
        <div className={getCellClass(2, 1)}>P2 × I1 <br/> 2 - Bajo</div>
        <div className={getCellClass(2, 2)}>P2 × I2 <br/> 4 - Medio</div>
        <div className={getCellClass(2, 3)}>P2 × I3 <br/> 6 - Alto</div>
        
        <div className={getCellClass(1, 1)}>P1 × I1 <br/> 1 - Mínimo</div>
        <div className={getCellClass(1, 2)}>P1 × I2 <br/> 2 - Bajo</div>
        <div className={getCellClass(1, 3)}>P1 × I3 <br/> 3 - Medio</div>
      </div>
    </div>
  );
}
