/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { StudyItem } from '../data/studies';
import { ArrowLeft, BookOpen, Quote, ChevronRight, Image as ImageIcon, Sparkles, Loader2, Share2, Copy, Check, MessageCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import pako from 'pako';

interface StudyDetailProps {
  study: StudyItem;
  allStudies: StudyItem[];
  onBack: () => void;
  onStudyClick: (id: string) => void;
}

export default function StudyDetail({ study, allStudies, onBack, onStudyClick }: StudyDetailProps) {
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({});
  const [visibleImages, setVisibleImages] = useState<Record<number, boolean>>({});
  const [copied, setCopied] = useState(false);

  const handleNativeShare = async () => {
    try {
      const data = new TextEncoder().encode(JSON.stringify(study));
      const compressed = pako.deflate(data);
      const base64 = btoa(String.fromCharCode(...compressed))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      
      const shareUrl = new URL(window.location.href);
      shareUrl.search = '';
      shareUrl.searchParams.set('s', base64);

      if (navigator.share) {
        await navigator.share({
          title: study.title,
          text: `Confira este estudo bíblico Judaico-Messiânico: ${study.title}`,
          url: shareUrl.toString(),
        });
      } else {
        handleShare();
      }
    } catch (e) {
      if (e instanceof Error && e.name !== 'AbortError') {
        console.error("Erro ao compartilhar:", e);
        handleShare(); // Fallback to copy if regular share fails
      }
    }
  };

  const handleShare = () => {
    try {
      // Codificar em UTF-8 antes de comprimir (suporta hebraico/acentos)
      const data = new TextEncoder().encode(JSON.stringify(study));
      const compressed = pako.deflate(data);
      
      // Converter para Base64 seguro para URL
      const base64 = btoa(String.fromCharCode(...compressed))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      
      // Construir URL limpa
      const shareUrl = new URL(window.location.href);
      shareUrl.search = ''; 
      shareUrl.searchParams.set('s', base64);
      
      navigator.clipboard.writeText(shareUrl.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Erro ao gerar link de compartilhamento:", e);
    }
  };

  const handleWhatsAppShare = () => {
    try {
      const data = new TextEncoder().encode(JSON.stringify(study));
      const compressed = pako.deflate(data);
      
      const base64 = btoa(String.fromCharCode(...compressed))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
      
      const shareUrl = new URL(window.location.href);
      shareUrl.search = '';
      shareUrl.searchParams.set('s', base64);
      
      const text = `Confira este estudo bíblico Judaico-Messiânico: *${study.title}*\n\nLeia aqui: ${shareUrl.toString()}`;
      window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
    } catch (e) {
      console.error("Erro ao compartilhar no WhatsApp:", e);
    }
  };

  useMemo(() => {
    setLoadingImages({});
    setVisibleImages({});
  }, [study.id]);

  const contentSections = useMemo(() => {
    return study.content.split('\n\n').filter(s => s.trim().length > 0);
  }, [study.content]);

  const handleGenerateImage = (index: number) => {
    setLoadingImages(prev => ({ ...prev, [index]: true }));
    // Simulate generation time
    setTimeout(() => {
      setLoadingImages(prev => ({ ...prev, [index]: false }));
      setVisibleImages(prev => ({ ...prev, [index]: true }));
    }, 1500);
  };

  const relatedStudies = useMemo(() => {
    return allStudies
      .filter(s => s.id !== study.id && s.category === study.category)
      .slice(0, 2);
  }, [study, allStudies]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-3xl mx-auto py-8 px-6"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gold-500 hover:gap-3 transition-all font-medium"
        >
          <ArrowLeft size={20} />
          <span>Voltar aos temas</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {typeof navigator !== 'undefined' && (navigator as any).share && (
            <button
              onClick={handleNativeShare}
              className="flex items-center gap-2 px-4 py-2 bg-brand-900 text-gold-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
            >
              <Share2 size={14} />
              <span>Compartilhar</span>
            </button>
          )}
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
          >
            <MessageCircle size={14} />
            <span>WhatsApp</span>
          </button>
          <button
            id="copy-link-btn"
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 bg-brand-900 text-gold-400 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-lg border border-gold-500/20"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? 'Link Copiado' : 'Copiar Link'}</span>
          </button>
        </div>
      </div>

      <header className="mb-12">
        <span className="text-sm font-bold uppercase tracking-widest text-gold-500">
          {study.category}
        </span>
        <h2 className="text-5xl font-bold mt-2 mb-4 leading-none">
          {study.title}
        </h2>
        <div className="flex items-center gap-2 text-brand-900/60 font-serif italic text-xl">
          <Quote size={20} className="transform rotate-180" />
          <p>{study.simpleTitle}</p>
        </div>
        <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-brand-900/30">
          Estudo publicado em: {new Date(study.createdAt).toLocaleDateString('pt-BR')}
        </p>
      </header>

      <div className="bg-white rounded-[40px] p-8 md:p-12 border border-brand-900/5 shadow-2xl">
        {study.outline && study.outline.length > 0 && (
          <div className="mb-12 p-8 bg-brand-900 text-cream-50 rounded-3xl relative overflow-hidden">
            <Quote className="absolute -top-4 -right-4 w-32 h-32 opacity-10 rotate-12" />
            <h4 className="text-gold-400 font-bold uppercase tracking-widest text-xs mb-6">Esboço do Estudo</h4>
            <ul className="space-y-4">
              {study.outline.map((item, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="bg-gold-500 text-brand-900 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-lg font-serif italic">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-8">
          {contentSections.map((section, idx) => (
            <div key={idx} className="group relative">
              <p className="text-brand-900/80 leading-relaxed text-lg font-serif whitespace-pre-line">
                {section}
              </p>
              
              <div className="mt-6">
                {!visibleImages[idx] ? (
                  <button
                    onClick={() => handleGenerateImage(idx)}
                    disabled={loadingImages[idx]}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-900/40 hover:text-gold-500 transition-colors disabled:opacity-50"
                  >
                    {loadingImages[idx] ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Manifestando imagem...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        <span>Gerar atmosfera visual</span>
                      </>
                    )}
                  </button>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative rounded-3xl overflow-hidden aspect-video bg-brand-900/5 group/img"
                  >
                    <img 
                      src={`https://picsum.photos/seed/${study.id}-${idx}/1200/675`}
                      alt="Visualização do estudo"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-900/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <button 
                        onClick={() => setVisibleImages(prev => ({ ...prev, [idx]: false }))}
                        className="bg-white/90 text-brand-900 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl"
                      >
                        Ocultar imagem
                      </button>
                    </div>
                    <div className="absolute top-4 left-4 p-2 bg-brand-900/80 backdrop-blur-md rounded-lg">
                      <ImageIcon size={14} className="text-gold-400" />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-brand-900/10">
          <h4 className="flex items-center gap-3 text-gold-500 font-bold uppercase tracking-[0.2em] text-xs mb-6">
            <BookOpen size={18} />
            <span>Fontes das Escrituras</span>
          </h4>
          <div className="flex flex-wrap gap-3">
            {study.references.map((ref) => (
              <span 
                key={ref}
                className="bg-brand-900 text-cream-50 px-5 py-2 rounded-xl text-sm font-medium shadow-lg hover:bg-gold-500 hover:text-brand-900 transition-colors cursor-default"
              >
                {ref}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {relatedStudies.length > 0 && (
        <div className="mt-16">
          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-900/30 mb-8 border-b border-brand-900/5 pb-4">
            Estudos Relacionados
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedStudies.map((s) => (
              <button
                key={s.id}
                onClick={() => onStudyClick(s.id)}
                className="group bg-white p-6 rounded-3xl border border-brand-900/5 hover:border-gold-500/30 transition-all text-left flex items-center justify-between"
              >
                <div>
                  <span className="text-[8px] font-bold uppercase tracking-widest text-gold-500 block mb-1">
                    {s.category}
                  </span>
                  <p className="font-bold text-sm leading-tight group-hover:text-gold-500 transition-colors">
                    {s.title}
                  </p>
                </div>
                <div className="bg-brand-900/5 p-2 rounded-full group-hover:bg-gold-500 group-hover:text-brand-900 transition-all">
                  <ChevronRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-16 text-center p-8 bg-brand-900 text-cream-50 rounded-[40px] border border-gold-500/20 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-400 blur-3xl opacity-10 -mr-16 -mt-16" />
        <h3 className="text-2xl font-serif mb-4 italic text-gold-400">Reflexão Profunda</h3>
        <p className="opacity-70 leading-relaxed font-serif text-lg">
          "Pois não me envergonho do evangelho, porque é o poder de Deus para a salvação de todo aquele que crê, primeiro do judeu e também do grego." <br/>
          <span className="text-xs uppercase tracking-widest mt-4 block">(Romanos 1:16)</span>
        </p>
      </div>
    </motion.div>
  );
}
