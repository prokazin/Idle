import React from 'react'
import { Upgrade } from '../../types/game.types'
import { formatNumber } from '../../utils/decimalHelper'

interface UpgradeListProps {
  upgrades: Upgrade[]
  onBuy: (id: string) => void
}

const UpgradeList: React.FC<UpgradeListProps> = ({ upgrades, onBuy }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-bold text-cyber-green">🚀 УЛУЧШЕНИЯ</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {upgrades.map(upgrade => (
          <UpgradeCard key={upgrade.id} upgrade={upgrade} onBuy={onBuy} />
        ))}
      </div>
    </div>
  )
}

const UpgradeCard: React.FC<{ upgrade: Upgrade; onBuy: (id: string) => void }> = ({ upgrade, onBuy }) => {
  const isMaxed = upgrade.level >= upgrade.maxLevel

  return (
    <div className="p-4 bg-cyber-dark/50 rounded-lg border border-cyber-blue/30 hover:border-cyber-blue transition-colors">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h4 className="font-bold text-cyber-text">{upgrade.name}</h4>
          <p className="text-xs text-cyber-gray">{upgrade.description}</p>
        </div>
        <span className="text-xs px-2 py-1 rounded bg-cyber-blue/20 text-cyber-blue">
          Lv.{upgrade.level}
        </span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <span className="text-sm text-cyber-gray">
          💰 {formatNumber(upgrade.currentCost)}
        </span>
        <button
          onClick={() => onBuy(upgrade.id)}
          disabled={isMaxed}
          className={`
            px-4 py-1 rounded text-sm font-bold transition-all
            ${isMaxed 
              ? 'bg-cyber-gray/20 text-cyber-gray cursor-not-allowed' 
              : 'bg-cyber-purple hover:bg-cyber-purple/80 text-white'
            }
          `}
        >
          {isMaxed ? 'MAX' : 'КУПИТЬ'}
        </button>
      </div>
    </div>
  )
}

export default UpgradeList
