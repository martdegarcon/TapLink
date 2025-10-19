import React from 'react';
import { SkillBadge } from './SkillBadge';

interface SkillsListProps {
  skills: { emoji: string; title: string }[];
  onDelete: (index: number) => void;
}

export const SkillsList: React.FC<SkillsListProps> = ({ skills, onDelete }) => {
  if (skills.length === 0) {
    return <p>Добавьте свои первые навыки 👇</p>;
  }

  return (
    <div>
      {skills.map((skill, index) => (
        <div key={index}>
          <SkillBadge emoji={skill.emoji} title={skill.title} />
          <button onClick={() => onDelete(index)}>x</button>
        </div>
      ))}
    </div>
  );
};