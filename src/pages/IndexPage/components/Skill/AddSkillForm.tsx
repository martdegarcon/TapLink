import React from 'react';

interface AddSkillFormProps {
  newSkill: { emoji: string; title: string };
  onEmojiChange: (emoji: string) => void;
  onTitleChange: (title: string) => void;
  onAdd: () => void;
}

export const AddSkillForm: React.FC<AddSkillFormProps> = ({
  newSkill,
  onEmojiChange,
  onTitleChange,
  onAdd,
}) => {
  return (
    <div>
      <input 
        type="text" 
        placeholder='Эмодзи'
        value={newSkill.emoji}
        onChange={(e) => onEmojiChange(e.target.value)}
      />
      <input 
        type="text" 
        placeholder='Название'
        value={newSkill.title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <button onClick={onAdd}>+</button>
    </div>
  );
};