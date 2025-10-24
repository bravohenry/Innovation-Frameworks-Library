import React, { useState } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useI18n } from '../../contexts/I18nContext';

const PortersFiveForcesDiagram: React.FC = () => {
  const { t, lang } = useI18n();

  const initialData = [
    { subject: 'Competitive Rivalry', subjectEn: 'Rivalry', value: 8, fullMark: 10 },
    { subject: 'Threat of New Entrants', subjectEn: 'New Entrants', value: 6, fullMark: 10 },
    { subject: 'Threat of Substitutes', subjectEn: 'Substitutes', value: 7, fullMark: 10 },
    { subject: 'Supplier Bargaining Power', subjectEn: 'Suppliers', value: 4, fullMark: 10 },
    { subject: 'Buyer Bargaining Power', subjectEn: 'Buyers', value: 5, fullMark: 10 },
  ];

  const [data, setData] = useState(initialData);

  const handleSliderChange = (subject: string, newValue: number) => {
    setData(data.map(item => item.subject === subject ? { ...item, value: newValue } : item));
  };

  const dataKey = lang === 'en' ? 'subjectEn' : 'subject';

  return (
    <>
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey={dataKey} />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar name={t('porters_legend', '强度')} dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Legend />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 space-y-4">
        {data.map(item => (
          <div key={item.subject} className="flex items-center">
            <label className="w-1/3 text-gray-700">{lang === 'en' ? item.subjectEn : item.subject}</label>
            <input
              type="range"
              min="0"
              max="10"
              value={item.value}
              onChange={(e) => handleSliderChange(item.subject, parseInt(e.target.value, 10))}
              className="w-2/3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <span className="ml-4 font-semibold text-gray-800">{item.value}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default PortersFiveForcesDiagram;
