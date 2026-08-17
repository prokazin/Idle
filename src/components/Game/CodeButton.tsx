import React, { useState } from 'react'
import { Decimal } from 'break_eternity.js'

interface CodeButtonProps {
  onClick: () => void
  disabled?: boolean
}

const CodeButton: React.FC<CodeButtonProps> = ({ onClick, disabled = false }) => {
  const [isPulsing, setIsPulsing] = useState(false)

  const handleClick = () => {
    if (!disabled) {
      setIsPulsing(true)
      onClick()
      setTimeout(() => setIsPulsing(false), 200)
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`
        w-full py-6 px-8 text-2xl font-bold rounded-lg
        bg-gradient-to-r from-cyber-purple to-cyber-blue
        hover:shadow-lg hover:shadow-cyber-purple/50
        transition-all duration-200
        ${isPulsing ? 'scale-95' : 'scale-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <span className="flex items-center justify-center gap-3">
        <span className="text-3xl">⌨️</span>
        WRITE CODE
        <span className="text-3xl">⚡</span>
      </span>
    </button>
  )
}

export default CodeButton
