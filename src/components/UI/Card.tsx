import React, { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'highlight' | 'dark'
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default'
}) => {
  const variants = {
    default: 'bg-cyber-dark/50 border-cyber-purple/30',
    highlight: 'bg-cyber-purple/20 border-cyber-purple',
    dark: 'bg-cyber-dark/80 border-cyber-gray/30'
  }

  return (
    <div className={`
      p-4 rounded-lg border
      ${variants[variant]}
      ${className}
    `}>
      {children}
    </div>
  )
}

export default Card
