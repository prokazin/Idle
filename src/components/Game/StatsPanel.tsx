import React from 'react'
import { GameStats } from '../../types/game.types'
import { formatNumber } from '../../utils/decimalHelper'

interface StatsPanelProps {
  stats: GameStats
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-cyber-dark/50 rounded-lg border border-cyber-purple/30">
      <StatItem label="Кликов" value={stats.totalClicks} />
      <StatItem label="Время" value={`${Math.floor(stats.totalTime / 3600)}ч ${Math.floor((stats.totalTime % 3600) / 60)}м`} />
      <StatItem label="Макс/сек" value={formatNumber(stats.maxCodePerSecond)} />
      <StatItem label="Контрактов" value={stats.contractsCompleted} />
    </div>
  )
}

const StatItem: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="text-center">
    <div className="text-xs text-cyber-gray uppercase">{label}</div>
    <div className="text-lg font-bold text-cyber-blue">{value}</div>
  </div>
)

export default StatsPanel
