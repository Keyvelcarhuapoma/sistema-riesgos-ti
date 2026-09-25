'use client';

import React, { useState } from 'react';
import { Shield, Eye, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Conexión real a Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert('Error de acceso: Credenciales inválidas o usuario no registrado.');
    } else {
      window.location.href = '/dashboard';
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-slate-50 to-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-200">
            <Shield className="text-white" size={32} />
          </div>
        </div>
        <h2 className="mt-2 text-center text-2xl font-extrabold text-slate-900 tracking-tight">Acceso al Sistema</h2>
        <p className="mt-1 text-center text-sm text-slate-500 font-medium">Plataforma de Auditoría & Gestión de Riesgos TI</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label className="block text-sm font-semibold text-slate-700">Correo institucional</label>
              <div className="mt-1 relative">
                <input type="email" required className="appearance-none block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-slate-50" placeholder="usuario@corporativo.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-slate-700">Contraseña segura</label>
                <a href="#" className="text-xs font-semibold text-blue-600 hover:text-blue-500">¿Olvidó su clave?</a>
              </div>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input type="password" required className="appearance-none block w-full px-3 py-3 border border-slate-300 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-slate-50" placeholder="tu contraseña" value={password} onChange={e => setPassword(e.target.value)} />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                  <Eye className="text-slate-400 hover:text-slate-600" size={18} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 mb-6">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded" />
                <label className="ml-2 block text-sm text-slate-600">Recordar estación de trabajo</label>
              </div>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-blue-100 text-blue-800 border border-blue-200"><div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-1"></div> TLS 1.3</span>
            </div>

            <div>
              <button type="submit" disabled={loading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md shadow-blue-200 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                {loading ? 'Verificando encriptación...' : 'Ingresar a la Consola \u2192'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 flex justify-center gap-6 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          <span className="flex items-center"><Shield size={12} className="mr-1"/> ISO/IEC 27001</span>
          <span className="flex items-center"><Lock size={12} className="mr-1"/> SOC2 Type II</span>
        </div>
      </div>
    </div>
  );
}
