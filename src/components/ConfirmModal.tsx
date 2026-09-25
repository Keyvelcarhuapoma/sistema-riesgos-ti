import React from 'react';
import { Shield, Lock } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: any;
}

export default function ConfirmModal({ isOpen, onClose, onConfirm, formData }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200">
        <div className="p-6 border-b border-slate-100 flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <Shield size={24} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Confirmar Registro de Riesgo</h3>
            <p className="text-xs text-slate-500 font-mono mt-1">ID: RSK-2025-089 • Norma ISO/IEC 27005</p>
          </div>
        </div>
        <div className="p-6 bg-slate-50 space-y-4">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Título del Riesgo</p>
            <p className="text-sm font-medium text-slate-800">{formData.title || 'Inyección SQL en pasarela de autenticación'}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Categoría y Criticidad</p>
              <p className="text-sm font-medium text-slate-800">{formData.category} | Nivel Moderado</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Responsable</p>
              <p className="text-sm font-medium text-slate-800">Propietario AD • Mitigación &lt; 90 días</p>
            </div>
          </div>
          <label className="flex items-start gap-3 mt-6 p-4 bg-white rounded-lg border border-blue-100 cursor-pointer">
            <input type="checkbox" className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
            <span className="text-xs text-slate-600 font-medium">Certifico la veracidad técnica de los vectores descritos y asumo el compromiso de mitigación, el cual será registrado en la bóveda criptográfica.</span>
          </label>
        </div>
        <div className="p-4 bg-white border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50">Cancelar</button>
          <button onClick={onConfirm} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Lock size={16} /> Confirmar y Firmar
          </button>
        </div>
      </div>
    </div>
  );
}
