/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { StudyItem } from '../data/studies';
import { ChevronRight, BookOpen } from 'lucide-react';

interface TopicCardProps {
  study: StudyItem;
  onClick: (id: string) => void;
}

export default function TopicCard({ study, onClick }: TopicCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="group glass-card rounded-[32px] p-8 cursor-pointer flex flex-col h-full relative overflow-hidden transition-all active:scale-95"
      onClick={() => onClick(study.id)}
    >
      <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
        <BookOpen size={100} />
      </div>
      
      <div className="flex-1 relative z-10">
        <div className="flex justify-between items-start mb-4">
          <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500 px-3 py-1 bg-brand-900/5 rounded-full">
            {study.category}
          </span>
          <span className="text-[10px] text-brand-900/20 font-bold uppercase">
            {new Date(study.createdAt).toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' })}
          </span>
        </div>
        <h3 className="text-3xl font-bold mb-3 leading-[1.1] group-hover:text-gold-500 transition-colors">
          {study.title}
        </h3>
        <p className="text-brand-900/50 text-base italic font-serif mb-6 leading-relaxed">
          "{study.simpleTitle}"
        </p>
      </div>
      
      <div className="mt-8 pt-6 border-t border-brand-900/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.3em] text-brand-900/40 group-hover:text-gold-500 transition-colors">
        <span>Aprofundar Estudo</span>
        <div className="w-8 h-8 rounded-full bg-brand-900/5 flex items-center justify-center group-hover:bg-gold-500 group-hover:text-brand-900 transition-all">
          <ChevronRight size={16} />
        </div>
      </div>
    </motion.div>
  );
}
