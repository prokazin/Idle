import React, { useState, useEffect } from 'react'
import { Contract } from '../../types/game.types'
import ContractCard from './ContractCard'

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
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!contracts || contracts.length === 0) {
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-[#facc15]">📋 КОНТРАКТЫ</h3>
          <span className="text-sm text-[#94a3b8]">Обновление через: {timeLeft}с</span>
        </div>
        <div className="p-4 text-center text-[#94a3b8] border border-[#94a3b8]/30 rounded-lg">
          Загрузка контрактов...
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-[#facc15]">📋 КОНТРАКТЫ</h3>
        <span className="text-sm text-[#94a3b8]">
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
