import { useState } from 'react';
import { SkillsList } from './SkillList';
import { AddSkillForm } from './AddSkillForm';
import { useSkills } from '../../hooks/useSkills';

const SkillsSection = () => {
  const { skills, loading, addSkill, deleteSkill } = useSkills();
  const [newSkill, setNewSkill] = useState({ emoji: '', title: '' });

  const handleAddSkill = async () => {
    await addSkill(newSkill);
    setNewSkill({ emoji: '', title: '' });
  };

  if (loading) {
    return (
      <section>
        <h2>Навыки</h2>
        <p>Загрузка</p>
      </section>
    );
  }

  return (
    <section>
      <h2>Навыки</h2>
      
      <SkillsList skills={skills} onDelete={deleteSkill} />
      
      <AddSkillForm
        newSkill={newSkill}
        onEmojiChange={(emoji) => setNewSkill(prev => ({ ...prev, emoji }))}
        onTitleChange={(title) => setNewSkill(prev => ({ ...prev, title }))}
        onAdd={handleAddSkill}
      />
    </section>
  );
};

export default SkillsSection;