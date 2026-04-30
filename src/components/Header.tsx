/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { BookOpen, Search, Menu, X, Home, Filter, ListFilter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onGlossary: () => void;
  onHome: () => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: 'desc' | 'asc') => void;
  activeCategory: string;
  activeSort: 'desc' | 'asc';
  categories: string[];
}

export default function Header({ 
  onSearch, 
  searchQuery,
  onGlossary, 
  onHome, 
  onCategoryChange, 
  onSortChange,
  activeCategory,
  activeSort,
  categories
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const handleHomeClick = () => {
    onHome();
    setIsMenuOpen(false);
  };

  const handleGlossaryClick = () => {
    onGlossary();
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-brand-900 text-cream-50 py-4 px-6 shadow-2xl">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleHomeClick}
        >
          <div className="bg-gold-500 text-brand-900 p-2 rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            <BookOpen size={24} />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Luz das <span className="text-gold-400">Escrituras</span></h1>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="relative flex items-center">
            <div className="flex items-center bg-white/10 rounded-full px-5 py-2 focus-within:ring-2 ring-gold-500/50 transition-all border border-white/5">
              <Search size={18} className="text-gold-400" />
              <input 
                type="text" 
                placeholder="Pesquisar temas..." 
                className="bg-transparent border-none outline-none px-3 text-sm text-cream-50 w-56 placeholder:text-white/30"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearch('')}
                  className="mr-2 text-white/30 hover:text-white/60 transition-colors"
                >
                  <X size={14} />
                </button>
              )}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`ml-2 p-1.5 rounded-lg transition-colors ${showFilters ? 'bg-gold-500 text-brand-900' : 'text-gold-400 hover:bg-white/10'}`}
              >
                <Filter size={18} />
              </button>
            </div>

            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-72 bg-brand-900 border border-white/10 rounded-[24px] p-6 shadow-2xl z-[60]"
                >
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4 flex items-center gap-2">
                        <ListFilter size={12} />
                        Categoria
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((cat) => (
                          <button
                            key={cat}
                            onClick={() => onCategoryChange(cat)}
                            className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                              activeCategory === cat 
                                ? 'bg-gold-500 text-brand-900 border-gold-500' 
                                : 'bg-white/5 text-white/60 border-transparent hover:border-white/10'
                            }`}
                          >
                            {cat}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Ordem Cronológica</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onSortChange('desc')}
                          className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                            activeSort === 'desc' 
                              ? 'bg-gold-500 text-brand-900 border-gold-500' 
                              : 'bg-white/5 text-white/60 border-transparent hover:border-white/10'
                          }`}
                        >
                          Mais Recentes
                        </button>
                        <button
                          onClick={() => onSortChange('asc')}
                          className={`flex-1 px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                            activeSort === 'asc' 
                              ? 'bg-gold-500 text-brand-900 border-gold-500' 
                              : 'bg-white/5 text-white/60 border-transparent hover:border-white/10'
                          }`}
                        >
                          Mais Antigos
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <button 
            onClick={handleGlossaryClick}
            className="text-xs font-bold hover:text-gold-400 transition-colors uppercase tracking-[0.2em]"
          >
            Glossário
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-gold-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-brand-900 border-t border-white/5"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              <div className="flex items-center bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                <Search size={20} className="text-gold-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar estudos..." 
                  className="bg-transparent border-none outline-none px-3 text-base text-cream-50 w-full placeholder:text-white/20"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    onClick={() => onSearch('')}
                    className="text-white/30 p-1"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">Filtrar Categoria</h4>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => onCategoryChange(cat)}
                      className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all border ${
                        activeCategory === cat 
                          ? 'bg-gold-500 text-brand-900 border-gold-500' 
                          : 'bg-white/5 text-white/40 border-white/5'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4">
                <button 
                  onClick={handleHomeClick}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 text-cream-50 font-bold uppercase tracking-widest text-xs border border-white/5"
                >
                  <Home size={22} className="text-gold-400" />
                  <span>Início</span>
                </button>
                
                <button 
                  onClick={handleGlossaryClick}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 text-cream-50 font-bold uppercase tracking-widest text-xs border border-white/5"
                >
                  <BookOpen size={22} className="text-gold-400" />
                  <span>Glossário</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

