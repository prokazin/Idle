import Decimal from 'break_eternity.js'
import { Contract } from './game.types'

export interface ContractTemplate {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  baseRequirement: Decimal
  baseReward: Decimal
  timeLimit: number
}

export interface ContractPool {
  available: ContractTemplate[]
  selected: Contract[]
  refreshTimer: number
  maxContracts: 3
}
