import { useState, useEffect } from 'react';
import { cloudStorage } from '@telegram-apps/sdk';

export const useSkills = () => {
  const [skills, setSkills] = useState<{ emoji: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const data = await cloudStorage.getItem('skills');
      if (data) {
        setSkills(JSON.parse(data));
      }
    } catch (err) {
      console.error('Ошибка при загрузке skills:', err);
    } finally {
      setLoading(false);
    }
  };

  const saveSkills = async (updatedSkills: { emoji: string; title: string }[]) => {
    if (!cloudStorage.isSupported()) return;
    
    try {
      await cloudStorage.setItem('skills', JSON.stringify(updatedSkills));
    } catch (err) {
      console.error('Ошибка при сохранении skills:', err);
    }
  };

  const addSkill = async (newSkill: { emoji: string; title: string }) => {
    if (newSkill.emoji.trim() && newSkill.title.trim()) {
      const updated = [...skills, newSkill];
      setSkills(updated);
      await saveSkills(updated);
    }
  };

  const deleteSkill = async (index: number) => {
    const updated = skills.filter((_, i) => i !== index);
    setSkills(updated);
    await saveSkills(updated);
  };

  return {
    skills,
    loading,
    addSkill,
    deleteSkill,
  };
};