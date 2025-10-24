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
  x: string;
  y: string;
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
      x: '12.5%',
      y: '50%',
    },
    {
      id: 2,
      titleZh: '同理心与价值',
      titleEn: 'Empathy & Value',
      phase: '定义',
      phaseEn: 'Define',
      x: '31.25%',
      y: '50%',
    },
    {
      id: 3,
      titleZh: '设计与概念',
      titleEn: 'Design & Conception',
      phase: '开发',
      phaseEn: 'Develop',
      x: '50%',
      y: '50%',
    },
    {
      id: 4,
      titleZh: '测试与迭代',
      titleEn: 'Test & Iteration',
      phase: '交付',
      phaseEn: 'Deliver',
      x: '68.75%',
      y: '50%',
    },
    {
      id: 5,
      titleZh: '发布与叙事',
      titleEn: 'Launch & Storytelling',
      phase: '扩展',
      phaseEn: 'Scale',
      x: '81.25%',
      y: '50%',
    },
  ];

  const pathVariants = {
    hidden: {
      pathLength: 0,
      opacity: 0,
    },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2, ease: 'easeInOut' },
        opacity: { duration: 0.5 },
      },
    },
  };

  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.4 + i * 0.2,
        duration: 0.4,
        type: 'spring',
        stiffness: 200,
      },
    }),
  };

  return (
    <div className="w-full">
      <svg
        viewBox="0 0 800 300"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Double Diamond Path */}
        <motion.path
          d="M 50 150 L 200 50 L 350 150 L 200 250 L 50 150 Z M 350 150 L 500 50 L 650 150 L 500 250 L 350 150 Z"
          fill="url(#diamondGradient)"
          stroke="#3b82f6"
          strokeWidth="3"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Chapter Nodes */}
        {chapters.map((chapter, index) => {
          const xPos = (parseFloat(chapter.x) / 100) * 800;
          const yPos = (parseFloat(chapter.y) / 100) * 300;

          return (
            <g key={chapter.id}>
              {/* Node Circle */}
              <motion.circle
                cx={xPos}
                cy={yPos}
                r="28"
                fill="#ffffff"
                stroke="#3b82f6"
                strokeWidth="3"
                custom={index}
                variants={nodeVariants}
                initial="hidden"
                animate="visible"
                className="cursor-pointer transition-all hover:fill-primary-50"
              />

              {/* Chapter Number */}
              <motion.text
                x={xPos}
                y={yPos + 6}
                textAnchor="middle"
                className="fill-primary-500 text-2xl font-bold select-none"
                custom={index}
                variants={nodeVariants}
                initial="hidden"
                animate="visible"
              >
                {chapter.id}
              </motion.text>

              {/* Phase Label */}
              <motion.text
                x={xPos}
                y={yPos - 45}
                textAnchor="middle"
                className="fill-neutral-900 text-xs font-semibold uppercase tracking-wider select-none"
                custom={index}
                variants={nodeVariants}
                initial="hidden"
                animate="visible"
              >
                {lang === 'en' ? chapter.phaseEn : chapter.phase}
              </motion.text>

              {/* Chapter Title */}
              <motion.text
                x={xPos}
                y={yPos + 50}
                textAnchor="middle"
                className="fill-neutral-700 text-sm font-medium select-none"
                custom={index}
                variants={nodeVariants}
                initial="hidden"
                animate="visible"
              >
                {lang === 'en' ? chapter.titleEn : chapter.titleZh}
              </motion.text>

              {/* Invisible clickable area for better UX */}
              <Link to={`/chapters/${chapter.id}`}>
                <circle
                  cx={xPos}
                  cy={yPos}
                  r="40"
                  fill="transparent"
                  className="cursor-pointer"
                />
              </Link>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default DoubleDiamondDiagram;
