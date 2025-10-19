// Реэкспортируем ТОЛЬКО то, что можно использовать снаружи
export { default as SkillsSection } from './ui/SkillsSection';
export { useSkills } from './hooks/useSkills';
// НЕ экспортируем внутренние компоненты типа SkillBadge, SkillList