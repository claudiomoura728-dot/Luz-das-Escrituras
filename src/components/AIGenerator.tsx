/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Loader2, Send, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { generateStudy } from '../services/gemini';
import { StudyItem } from '../data/studies';

interface AIGeneratorProps {
  onStudyGenerated: (study: StudyItem) => void;
}

export default function AIGenerator({ onStudyGenerated }: AIGeneratorProps) {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setError(null);

    if (!navigator.onLine) {
      setError('A geração via IA requer conexão com a internet.');
      setIsLoading(false);
      return;
    }

    try {
      const study = await generateStudy(topic);
      onStudyGenerated(study);
      setTopic('');
    } catch (err) {
      setError('A conexão com a sabedoria falhou. Tente um tema mais detalhado.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-brand-900 text-cream-50 rounded-[40px] p-8 md:p-16 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.6)] overflow-hidden relative border border-gold-500/10">
      <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
        <BookOpen size={240} className="text-gold-400" />
      </div>
      
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div 
          animate={isLoading ? { scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] } : {}}
          transition={{ repeat: Infinity, duration: 2 }}
          className="inline-flex items-center gap-3 mb-8 px-6 py-2 bg-white/5 border border-white/10 rounded-full"
        >
          <Sparkles size={20} className="text-gold-400" />
          <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">Arquiteto de Estudos IA</h3>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-serif italic mb-8 leading-tight">
          Qual mistério da <span className="text-gold-400">Torah</span> vamos desvendar hoje?
        </h2>
        
        <form onSubmit={handleGenerate} className="relative group max-w-lg mx-auto">
          <input 
            type="text" 
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Ex: As Festas de Outono e o Retorno de Yeshua..."
            className="w-full bg-white/5 border border-white/10 rounded-[32px] py-6 pl-8 pr-20 outline-none focus:ring-4 ring-gold-500/20 transition-all font-serif text-xl placeholder:text-white/20 text-cream-50"
            disabled={isLoading}
          />
          <button 
            type="submit"
            disabled={isLoading || !topic.trim()}
            className="absolute right-3 top-3 bottom-3 aspect-square gold-gradient text-brand-900 rounded-[24px] flex items-center justify-center hover:scale-105 disabled:hover:scale-100 active:scale-95 transition-all disabled:opacity-30 disabled:grayscale shadow-lg shadow-gold-500/20"
          >
            {isLoading ? (
              <Loader2 size={32} className="animate-spin" />
            ) : (
              <Send size={28} />
            )}
          </button>
        </form>

        <AnimatePresence>
          {isLoading && (
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 text-gold-400/80 font-serif italic text-lg"
            >
              Consultando os pergaminhos... conectando raízes...
            </motion.p>
          )}
        </AnimatePresence>

        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-red-400 text-sm font-bold uppercase tracking-wider"
          >
            {error}
          </motion.p>
        )}
        
        <div className="mt-12 flex flex-wrap justify-center gap-6 opacity-40 text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="text-gold-500">Inspiração:</span>
          <button onClick={() => setTopic('O mistério das Cidades de Refúgio')} className="hover:text-gold-400 transition-colors">Cidades de Refúgio</button>
          <button onClick={() => setTopic('Yeshua no Tabernáculo')} className="hover:text-gold-400 transition-colors">Tabernáculo</button>
          <button onClick={() => setTopic('A Menorá e a Luz do Mundo')} className="hover:text-gold-400 transition-colors">Menorá</button>
        </div>
      </div>
    </div>
  );
}
