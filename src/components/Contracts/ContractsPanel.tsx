import React, { useState, useEffect } from 'react'
import { Contract } from '../../types/game.types'
import ContractCard from './ContractCard'
import { formatNumber } from '../../utils/decimalHelper'

interface ContractPanelProps {
  contracts: Contract[]
  onAccept: (id: string) => void
}

const ContractPanel: React.FC<ContractPanelProps> = ({ contracts, onAccept }) => {
  const [timeLeft, setTimeLeft] = useState<number>(30)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          // Обновляем контракты
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-cyber-yellow">📋 КОНТРАКТЫ</h3>
        <span className="text-sm text-cyber-gray">
          Обновление через: {timeLeft}с
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {contracts.map(contract => (
          <ContractCard
            key={contract.id}
            contract={contract}
            onAccept={onAccept}
          />
        ))}
      </div>
    </div>
  )
}

export default ContractPanel
