import { useState, useEffect } from 'react';
import { SkillBadge } from './SkillBadge';
import { cloudStorage } from '@telegram-apps/sdk';

const SkillsSection = () => {
    const [skills, setSkills] = useState<{emoji: string; title: string}[]>([])
    const [newSkill, setNewSkill] = useState({emoji: '', title: ''})
    const [loading, setLoading] = useState(true)

  useEffect(() => {
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

    loadSkills();
  }, []);

  const saveSkills = async (updatedSkills: {emoji: string; title: string}[]) => {
    if(!cloudStorage.isSupported()) return
    try {
        await cloudStorage.setItem('skills', JSON.stringify(updatedSkills))
    } catch (err) {
        console.error('Ошибка при сохранении skills:', err)
    }
  }

  const addSkill = async () => {
    if (newSkill.emoji.trim() && newSkill.title.trim()) {
        const updated = [...skills, newSkill]
        setSkills(updated)
        setNewSkill({emoji: '', title: ''})
        await saveSkills(updated)
    }
  }

  const deleteSkill = async (index: number) => {
    const updated = skills.filter((_, i) => i !== index)
    setSkills(updated)
    await saveSkills
  }

  if (loading) {
    return (
        <section>
            <h2>Навыки</h2>
            <p>Загрузка</p>
        </section>
    )
  }


  return (
    <section>
        <h2>Навыки</h2>

        {/* Сетка с бейджами */}
        {skills.length > 0 ? (
            <div>
                {skills.map((skill, index) => (
                    <div key={index}>
                        <SkillBadge emoji={skill.emoji} title={skill.title}/>
                        <button
                            onClick={() => deleteSkill(index)}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
            ) : (
            <p>
                Добавьте свои первые навыки 👇
            </p>
            )}

        <div>
            <input 
            type="text" 
            placeholder='Эмодзи'
            value={newSkill.emoji}
            onChange={(e) => 
                setNewSkill({...newSkill, emoji: e.target.value})}
            />
            <input 
            type="text" 
            placeholder='Название'
            value={newSkill.title}
            onChange={(e) => 
                setNewSkill({...newSkill, title: e.target.value})}
            />
            <button
            onClick={addSkill}
            >
                +
            </button>
        </div>
    </section>
  )
}

export default SkillsSection