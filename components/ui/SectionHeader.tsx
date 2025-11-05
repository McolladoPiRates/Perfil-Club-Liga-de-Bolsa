
import React from 'react';

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return <h2 className="text-xl font-extrabold text-slate-800 mb-4">{title}</h2>;
};

export default SectionHeader;
