/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { glossary } from '../data/studies';
import { X, Search } from 'lucide-react';
import { useState, useMemo } from 'react';

interface GlossaryProps {
  onClose: () => void;
}

export default function Glossary({ onClose }: GlossaryProps) {
  const [search, setSearch] = useState('');

  const filteredGlossary = useMemo(() => {
    if (!search) return glossary;
    const lower = search.toLowerCase();
    return glossary.filter(item => 
      item.term.toLowerCase().includes(lower) || 
      item.meaning.toLowerCase().includes(lower)
    );
  }, [search]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[100] bg-brand-900/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-cream-50 rounded-[40px] w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-white/20"
      >
        <div className="p-8 sm:p-10 border-b border-brand-900/5 bg-brand-900 text-cream-50">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Glossário de Termos</h2>
              <p className="text-gold-400 font-serif italic text-lg">Conectando-se à língua das Escrituras</p>
            </div>
            <button 
              onClick={onClose}
              className="p-3 hover:bg-white/10 rounded-full transition-colors text-gold-400"
            >
              <X size={28} />
            </button>
          </div>

          <div className="relative group">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold-400 group-focus-within:text-gold-300 transition-colors" />
            <input 
              type="text" 
              placeholder="Pesquisar termo ou significado..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-cream-50 placeholder:text-white/20 focus:outline-none focus:ring-2 ring-gold-500/30 transition-all font-medium"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button 
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/40 transition-colors"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 sm:p-10 bg-cream-50">
          {filteredGlossary.length > 0 ? (
            <div className="grid gap-8">
              {filteredGlossary.map((item) => (
                <div key={item.term} className="group relative">
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="text-2xl font-bold text-brand-900 flex items-baseline gap-3">
                      {item.term}
                      {item.pronunciation && (
                        <span className="text-xs text-brand-900/30 font-bold uppercase tracking-widest">[{item.pronunciation}]</span>
                      )}
                    </h3>
                    <div className="h-px flex-1 bg-gold-400/20 mx-4 hidden sm:block" />
                  </div>
                  <p className="text-brand-900/70 text-lg leading-relaxed font-serif italic">{item.meaning}</p>
                  <div className="h-[1px] w-12 bg-gold-500 mt-6 group-last:hidden" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-brand-900/40 italic font-serif">Nenhum termo encontrado para sua busca.</p>
            </div>
          )}
        </div>
        
        <div className="p-6 bg-brand-900/5 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-900/40">Conhecimento que liberta</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
