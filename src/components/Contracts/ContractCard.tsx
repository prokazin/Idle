import React from 'react'
import { Contract } from '../../types/game.types'
import { formatNumber, getDifficultyColor, getDifficultyStars } from '../../utils/decimalHelper'

interface ContractCardProps {
  contract: Contract
  onAccept: (id: string) => void
}

const ContractCard: React.FC<ContractCardProps> = ({ contract, onAccept }) => {
  const isCompleted = contract.completed
  const isExpired = contract.expired

  return (
    <div className={`
      p-4 rounded-lg border-2 transition-all
      ${isCompleted ? 'border-green-500 bg-green-500/10' : ''}
      ${isExpired ? 'border-red-500 bg-red-500/10 opacity-50' : ''}
      ${!isCompleted && !isExpired ? 'border-cyber-yellow/30 hover:border-cyber-yellow' : ''}
    `}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-sm">{contract.title}</h4>
        <span className="text-xs" style={{ color: getDifficultyColor(contract.difficulty) }}>
          {getDifficultyStars(contract.difficulty)}
        </span>
      </div>
      
      <p className="text-xs text-cyber-gray mb-3">{contract.description}</p>
      
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Требуется:</span>
          <span className="text-cyber-blue">{formatNumber(contract.requirement)}</span>
        </div>
        <div className="flex justify-between">
          <span>Награда:</span>
          <span className="text-cyber-green">+{formatNumber(contract.reward)}</span>
        </div>
        <div className="flex justify-between">
          <span>Прогресс:</span>
          <span>{contract.progress.div(contract.requirement).times(100).toFixed(0)}%</span>
        </div>
      </div>
      
      {!isCompleted && !isExpired && (
        <button
          onClick={() => onAccept(contract.id)}
          className="w-full mt-3 py-1 bg-cyber-yellow text-black rounded text-sm font-bold hover:bg-cyber-yellow/80 transition-colors"
        >
          ПРИНЯТЬ
        </button>
      )}
      
      {isCompleted && (
        <div className="mt-3 text-center text-green-500 text-sm font-bold">✓ ВЫПОЛНЕН</div>
      )}
      
      {isExpired && (
        <div className="mt-3 text-center text-red-500 text-sm">✗ ПРОСРОЧЕН</div>
      )}
    </div>
  )
}

export default ContractCard
