import React from 'react'

interface SkillBadgeProps {
    emoji: string
    title: string
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({emoji, title}) => {
  return (
    <div 
    style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      gap: '8px',
      padding: '20px 20px',
      border: '1px solid #FFFFFF',
      borderRadius: '16px',
      backgroundColor: '#8C8F8C',
      maxWidth: '80px'
      }}>
        <span
          style={{
            fontSize: '32px'
          }}
        >{emoji}</span>
        <span
          style={{
            fontSize: '18px'
          }}
        >{title}</span>
    </div>
  )
}

export default SkillBadge