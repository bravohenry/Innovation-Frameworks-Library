import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useI18n } from '../../contexts/I18nContext';

interface Chapter {
  id: number;
  titleZh: string;
  titleEn: string;
  phase: string;
  phaseEn: string;
}

const DoubleDiamondDiagram: React.FC = () => {
  const { lang } = useI18n();

  const chapters: Chapter[] = [
    {
      id: 1,
      titleZh: '发现与战略',
      titleEn: 'Discovery & Strategy',
      phase: '发现',
      phaseEn: 'Discover',
    },
    {
      id: 2,
      titleZh: '同理心与价值',
      titleEn: 'Empathy & Value',
      phase: '定义',
      phaseEn: 'Define',
    },
    {
      id: 3,
      titleZh: '设计与概念',
      titleEn: 'Design & Conception',
      phase: '开发',
      phaseEn: 'Develop',
    },
    {
      id: 4,
      titleZh: '测试与迭代',
      titleEn: 'Test & Iteration',
      phase: '交付',
      phaseEn: 'Deliver',
    },
    {
      id: 5,
      titleZh: '发布与叙事',
      titleEn: 'Launch & Storytelling',
      phase: '扩展',
      phaseEn: 'Scale',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="w-full py-8">
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-primary-500 -translate-y-1/2" />

        {/* Chapters Container */}
        <div className="relative grid grid-cols-5 gap-4">
          {chapters.map((chapter, index) => (
            <motion.div
              key={chapter.id}
              className="flex flex-col items-center"
              variants={itemVariants}
            >
              {/* Phase Label (Top) */}
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-900 mb-4 text-center">
                {lang === 'en' ? chapter.phaseEn : chapter.phase}
              </div>

              {/* Dot Marker */}
              <Link
                to={`/chapters/${chapter.id}`}
                className="group relative z-10"
              >
                <div className="w-3 h-3 rounded-full bg-primary-500 transition-all group-hover:scale-150 group-hover:bg-primary-700" />
              </Link>

              {/* Chapter Title (Bottom) */}
              <Link
                to={`/chapters/${chapter.id}`}
                className="mt-4 text-center group"
              >
                <div className="text-sm font-medium text-neutral-700 transition-colors group-hover:text-primary-700">
                  {lang === 'en' ? chapter.titleEn : chapter.titleZh}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DoubleDiamondDiagram;
