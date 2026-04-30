/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Header from './components/Header';
import TopicCard from './components/TopicCard';
import StudyDetail from './components/StudyDetail';
import Glossary from './components/Glossary';
import AIGenerator from './components/AIGenerator';
import { studies as initialStudies, StudyItem } from './data/studies';
import pako from 'pako';

export default function App() {
  const [localStudies, setLocalStudies] = useState<StudyItem[]>(() => {
    const saved = localStorage.getItem('estudos_messianicos_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const merged = [...initialStudies];
        parsed.forEach((s: StudyItem) => {
          if (!merged.find(m => m.id === s.id)) {
            merged.push(s);
          }
        });
        return merged;
      } catch (e) {
        return initialStudies;
      }
    }
    return initialStudies;
  });

  useEffect(() => {
    // Only save studies that are NOT in the initial set to avoid redundancy
    const onlyGenerated = localStudies.filter(s => !initialStudies.some(m => m.id === s.id));
    localStorage.setItem('estudos_messianicos_v1', JSON.stringify(onlyGenerated));
  }, [localStudies]);

  // Handle Shared Studies from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedData = params.get('s');
    
    if (sharedData) {
      try {
        // Restaurar padding do Base64 URL-safe
        let base64 = sharedData.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        
        // Converter Base64 para bytes
        const binaryString = atob(base64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Descomprimir e decodificar UTF-8
        const decompressed = pako.inflate(bytes);
        const decoded = JSON.parse(new TextDecoder().decode(decompressed)) as StudyItem;
        
        // Verificar se já temos, senão adicionar
        setLocalStudies(prev => {
          if (prev.find(s => s.id === decoded.id)) return prev;
          return [decoded, ...prev];
        });
        setSelectedStudyId(decoded.id);
        
        // Limpar a URL sem recarregar a página
        const url = new URL(window.location.href);
        url.searchParams.delete('s');
        window.history.replaceState({}, document.title, url.pathname);
      } catch (e) {
        console.error("Erro ao decodificar estudo compartilhado:", e);
      }
    }
  }, []);

  const [selectedStudyId, setSelectedStudyId] = useState<string | null>(null);
  const [showGlossary, setShowGlossary] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [activeSort, setActiveSort] = useState<'desc' | 'asc'>('desc');

  const categories = ['Todos', 'Messias', 'Festas', 'Torah', 'Conceitos', 'Brit Hadasha'];

  const filteredStudies = useMemo(() => {
    let base = [...localStudies];
    
    if (activeCategory !== 'Todos') {
      base = base.filter(s => s.category === activeCategory);
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      base = base.filter(s => 
        s.title.toLowerCase().includes(lowerQuery) || 
        s.description.toLowerCase().includes(lowerQuery) ||
        s.content.toLowerCase().includes(lowerQuery)
      );
    }

    // Sort by date
    base.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return activeSort === 'desc' ? dateB - dateA : dateA - dateB;
    });

    return base;
  }, [searchQuery, localStudies, activeCategory, activeSort]);

  const currentStudy = useMemo(() => 
    localStudies.find(s => s.id === selectedStudyId), 
  [selectedStudyId, localStudies]);

  const handleStudyGenerated = (newStudy: StudyItem) => {
    // Add to local studies if it doesn't exist
    if (!localStudies.some(s => s.id === newStudy.id)) {
      setLocalStudies(prev => [newStudy, ...prev]);
    }
    setSelectedStudyId(newStudy.id);
  };

  return (
    <div className="min-h-screen bg-cream-50 flex flex-col">
      <Header 
        onSearch={setSearchQuery} 
        searchQuery={searchQuery}
        onGlossary={() => setShowGlossary(true)}
        onHome={() => {
          setSelectedStudyId(null);
          setSearchQuery('');
        }}
        categories={categories}
        activeCategory={activeCategory}
        activeSort={activeSort}
        onCategoryChange={setActiveCategory}
        onSortChange={setActiveSort}
      />

      <AnimatePresence>
        {isOffline && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-500 text-white text-[10px] font-bold uppercase tracking-[0.2em] py-1.5 text-center"
          >
            Modo Offline Ativado • Acesso apenas a estudos baixados
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-x-hidden">
        <AnimatePresence mode="wait">
          {!selectedStudyId ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto py-12 px-6"
            >
              <div className="mb-20 text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-block mb-6 px-6 py-2 bg-gold-500/10 border border-gold-500/20 rounded-full text-gold-500 text-xs font-bold uppercase tracking-[0.4em]"
                >
                  Sabedoria Ancestral • Luz para hoje
                </motion.div>
                <motion.h2 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter"
                >
                  Mergulhe nas <span className="text-gold-500">Escrituras</span>
                </motion.h2>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl text-brand-900/60 font-serif italic mb-16 leading-relaxed"
                >
                  Descubra a profundidade da Bíblia através do olhar judaico-messiânico, com clareza e autoridade.
                </motion.p>

                <AIGenerator onStudyGenerated={handleStudyGenerated} />
              </div>

              <div className="flex items-center gap-8 mb-12">
                <div className="h-[1px] flex-1 bg-brand-900/10" />
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-900/30">Arquivo de Estudos</span>
                <div className="h-[1px] flex-1 bg-brand-900/10" />
              </div>

              <div className="flex flex-wrap justify-center gap-3 mb-16">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                      activeCategory === cat 
                        ? 'bg-brand-900 text-gold-400 shadow-lg' 
                        : 'bg-brand-900/5 text-brand-900 hover:bg-brand-900/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {filteredStudies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredStudies.map((study, index) => (
                    <motion.div
                      key={study.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <TopicCard 
                        study={study} 
                        onClick={setSelectedStudyId} 
                      />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20 opacity-40">
                  <p className="text-xl">Nenhum estudo encontrado para "{searchQuery}"</p>
                </div>
              )}
            </motion.div>
          ) : (
            currentStudy ? (
              <motion.div key={currentStudy.id}>
                <StudyDetail 
                  study={currentStudy} 
                  allStudies={localStudies}
                  onBack={() => setSelectedStudyId(null)} 
                  onStudyClick={setSelectedStudyId}
                />
              </motion.div>
            ) : null
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 px-6 border-t border-brand-900/5 bg-brand-900 text-cream-50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm font-bold text-gold-400 uppercase tracking-[0.4em] mb-6">
            Luz das Escrituras
          </p>
          <p className="text-white/40 text-sm max-w-md mx-auto italic font-serif leading-loose">
            "Lâmpada para os meus pés é a tua palavra e luz para os meus caminhos." <br/>
            Salmo 119:105
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {showGlossary && (
          <Glossary onClose={() => setShowGlossary(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
