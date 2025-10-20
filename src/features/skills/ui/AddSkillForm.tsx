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
    <div className='flex justify-center items-center gap-2'>
      <div className='px-3'>
      <input
      className='w-5 h-5 rounded-xl border border-gray-300 text-2xl resize-none focus:border-blue-500
        focus:outline-none transition-colors'
        type="text" 
        placeholder='Эмодзи'
        value={newSkill.emoji}
        onChange={(e) => onEmojiChange(e.target.value)}
      />
      <input 
      className='w-full h-5 rounded-xl border border-gray-300 text-2xl resize-none focus:border-blue-500
        focus:outline-none transition-colors'
        type="text" 
        placeholder='Название'
        value={newSkill.title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <button 
      className='w-5 h-5 rounded-xl bg-red-500'
      onClick={onAdd}>+</button>
      </div>
    </div>
  );
};