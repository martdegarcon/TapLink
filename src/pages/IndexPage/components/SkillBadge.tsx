import React from 'react'

interface SkillBadgeProps {
    emoji: string
    title: string
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({emoji, title}) => {
  return (
    <div>
        <span>{emoji}</span>
        <span>{title}</span>
    </div>
  )
}

export default SkillBadge