
import React from 'react';
import Card from './ui/Card';
import SectionHeader from './ui/SectionHeader';
import type { Member } from '../types';

interface MembersListProps {
  members: Member[];
}

const MembersList: React.FC<MembersListProps> = ({ members }) => {
  return (
    <Card className="h-full">
      <SectionHeader title="Miembros" />
      {members && members.length > 0 ? (
        <div className="flex flex-col gap-3">
          {members.map((member) => (
            <a
              key={member.user}
              href={member.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              <img
                src={member.avatar || `https://i.pravatar.cc/40?u=${member.user}`}
                alt={member.name}
                className="w-10 h-10 rounded-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = `https://i.pravatar.cc/40?u=${member.user}` }}
              />
              <div>
                <b className="text-sm font-bold text-slate-800">{member.name || member.user}</b>
                <div className="text-xs text-slate-500">@{member.user}</div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-500">No hay miembros para mostrar.</p>
      )}
    </Card>
  );
};

export default MembersList;
