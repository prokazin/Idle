import Decimal from 'break_eternity.js'

export const formatNumber = (value: Decimal): string => {
  if (value.lt(1000)) return value.toFixed(0)
  if (value.lt(1e6)) return value.div(1e3).toFixed(1) + 'K'
  if (value.lt(1e9)) return value.div(1e6).toFixed(1) + 'M'
  if (value.lt(1e12)) return value.div(1e9).toFixed(1) + 'B'
  if (value.lt(1e15)) return value.div(1e12).toFixed(1) + 'T'
  return value.toExponential(2)
}

export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy': return '#4ade80'
    case 'medium': return '#facc15'
    case 'hard': return '#f97316'
    case 'expert': return '#ef4444'
    default: return '#94a3b8'
  }
}

export const getDifficultyStars = (difficulty: string): string => {
  switch (difficulty) {
    case 'easy': return '⭐'
    case 'medium': return '⭐⭐'
    case 'hard': return '⭐⭐⭐'
    case 'expert': return '⭐⭐⭐⭐'
    default: return ''
  }
}
