
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-[0_10px_30px_rgba(15,23,42,0.06)] border border-[#ECEFF5] p-5 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
