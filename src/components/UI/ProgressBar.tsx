import React from 'react'

interface ProgressBarProps {
  value: number
  max: number
  label?: string
  showPercentage?: boolean
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  showPercentage = true
}) => {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="space-y-1">
      {label && (
        <div className="flex justify-between text-xs">
          <span>{label}</span>
          {showPercentage && <span>{percentage.toFixed(0)}%</span>}
        </div>
      )}
      <div className="w-full h-2 bg-cyber-dark rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyber-purple to-cyber-blue transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
