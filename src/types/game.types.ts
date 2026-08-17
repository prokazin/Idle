import { Decimal } from 'break_eternity.js'

export interface GameState {
  code: Decimal
  totalCode: Decimal
  clickPower: Decimal
  codePerSecond: Decimal
  prestigePoints: Decimal
  prestigeMultiplier: Decimal
  upgrades: Upgrade[]
  contracts: Contract[]
  achievements: Achievement[]
  stats: GameStats
  lastSave: number
}

export interface Upgrade {
  id: string
  name: string
  description: string
  type: 'click' | 'passive' | 'prestige'
  baseCost: Decimal
  currentCost: Decimal
  level: number
  maxLevel: number
  effect: Decimal
  multiplier: Decimal
  owned: boolean
}

export interface Contract {
  id: string
  title: string
  description: string
  difficulty: 'easy' | 'medium' | 'hard' | 'expert'
  requirement: Decimal
  reward: Decimal
  timeLimit: number
  progress: Decimal
  completed: boolean
  expired: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  condition: (state: GameState) => boolean
  unlocked: boolean
  reward: Decimal
}

export interface GameStats {
  totalClicks: number
  totalTime: number
  maxCodePerSecond: Decimal
  contractsCompleted: number
  prestigeCount: number
}
