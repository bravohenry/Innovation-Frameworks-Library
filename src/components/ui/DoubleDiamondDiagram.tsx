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
  x: number;
  y: number;
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
      x: 100,
      y: 150,
    },
    {
      id: 2,
      titleZh: '同理心与价值',
      titleEn: 'Empathy & Value',
      phase: '定义',
      phaseEn: 'Define',
      x: 350,
      y: 150,
    },
    {
      id: 3,
      titleZh: '设计与概念',
      titleEn: 'Design & Conception',
      phase: '开发',
      phaseEn: 'Develop',
      x: 475,
      y: 150,
    },
    {
      id: 4,
      titleZh: '测试与迭代',
      titleEn: 'Test & Iteration',
      phase: '交付',
      phaseEn: 'Deliver',
      x: 600,
      y: 150,
    },
    {
      id: 5,
      titleZh: '发布与叙事',
      titleEn: 'Launch & Storytelling',
      phase: '扩展',
      phaseEn: 'Scale',
      x: 700,
      y: 150,
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
        pathLength: { duration: 2.5, ease: 'easeInOut' },
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
        delay: 2.7 + i * 0.15,
        duration: 0.4,
        type: 'spring',
        stiffness: 200,
      },
    }),
  };

  return (
    <div className="w-full py-8">
      <svg
        viewBox="0 0 800 300"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="diamondGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="25%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.05" />
            <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* First Diamond: Discover → Define */}
        <motion.path
          d="M 100 150 L 225 50 L 350 150 L 225 250 Z"
          fill="url(#diamondGradient)"
          stroke="#3b82f6"
          strokeWidth="2"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Second Diamond: Develop → Deliver */}
        <motion.path
          d="M 350 150 L 475 50 L 600 150 L 475 250 Z"
          fill="url(#diamondGradient)"
          stroke="#3b82f6"
          strokeWidth="2"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Extension line to Scale */}
        <motion.line
          x1="600"
          y1="150"
          x2="700"
          y2="150"
          stroke="#3b82f6"
          strokeWidth="2"
          variants={pathVariants}
          initial="hidden"
          animate="visible"
        />

        {/* Phase Labels */}
        <motion.text
          x="225"
          y="35"
          textAnchor="middle"
          className="fill-neutral-900 text-xs font-bold uppercase tracking-wider select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8, duration: 0.5 }}
        >
          {lang === 'en' ? 'Discover' : '发现'}
        </motion.text>

        <motion.text
          x="475"
          y="35"
          textAnchor="middle"
          className="fill-neutral-900 text-xs font-bold uppercase tracking-wider select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.5 }}
        >
          {lang === 'en' ? 'Develop' : '开发'}
        </motion.text>

        {/* Chapter Nodes */}
        {chapters.map((chapter, index) => (
          <g key={chapter.id}>
            <Link to={`/chapters/${chapter.id}`}>
              <g className="group cursor-pointer">
                {/* Node Circle */}
                <motion.circle
                  cx={chapter.x}
                  cy={chapter.y}
                  r="10"
                  fill="#ffffff"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  custom={index}
                  variants={nodeVariants}
                  initial="hidden"
                  animate="visible"
                  className="transition-all group-hover:fill-primary-500"
                />

                {/* Chapter Title */}
                <motion.text
                  x={chapter.x}
                  y={chapter.y + 35}
                  textAnchor="middle"
                  className="fill-neutral-700 text-xs font-medium select-none transition-colors group-hover:fill-primary-700"
                  custom={index}
                  variants={nodeVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {lang === 'en' ? chapter.titleEn : chapter.titleZh}
                </motion.text>
              </g>
            </Link>
          </g>
        ))}
      </svg>
    </div>
  );
};

export default DoubleDiamondDiagram;
