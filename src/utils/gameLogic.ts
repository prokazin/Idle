import Decimal from 'break_eternity.js'
import { GameState } from '../types/game.types'
import { generateContracts } from './contractGenerator'

export const createInitialState = (): GameState => {
  const contracts = generateContracts()
  return {
    code: new Decimal(0),
    totalCode: new Decimal(0),
    clickPower: new Decimal(1),
    codePerSecond: new Decimal(0),
    prestigePoints: new Decimal(0),
    prestigeMultiplier: new Decimal(1),
    upgrades: [],
    contracts: contracts,
    achievements: [],
    stats: {
      totalClicks: 0,
      totalTime: 0,
      maxCodePerSecond: new Decimal(0),
      contractsCompleted: 0,
      prestigeCount: 0
    },
    lastSave: Date.now()
  }
}

export const calculateCodePerSecond = (state: GameState): Decimal => {
  let total = new Decimal(0)
  state.upgrades.forEach(upgrade => {
    if (upgrade.type === 'passive' && upgrade.owned) {
      total = total.plus(upgrade.effect.times(upgrade.level))
    }
  })
  return total.times(state.prestigeMultiplier)
}

export const buyUpgrade = (state: GameState, upgradeId: string): GameState => {
  const upgradeIndex = state.upgrades.findIndex(u => u.id === upgradeId)
  if (upgradeIndex === -1) return state
  
  const upgrade = state.upgrades[upgradeIndex]
  if (upgrade.owned || upgrade.level >= upgrade.maxLevel) return state

  if (state.code.gte(upgrade.currentCost)) {
    state.code = state.code.minus(upgrade.currentCost)
    upgrade.level += 1
    upgrade.owned = true
    upgrade.currentCost = upgrade.currentCost.times(upgrade.multiplier)

    if (upgrade.type === 'click') {
      state.clickPower = state.clickPower.plus(upgrade.effect)
    } else if (upgrade.type === 'passive') {
      state.codePerSecond = calculateCodePerSecond(state)
    }
  }
  return state
}

export const acceptContract = (state: GameState, contractId: string): GameState => {
  const contractIndex = state.contracts.findIndex(c => c.id === contractId)
  if (contractIndex === -1) return state
  
  const contract = state.contracts[contractIndex]
  if (contract.completed || contract.expired) return state

  contract.progress = contract.progress.plus(state.codePerSecond)
  if (contract.progress.gte(contract.requirement)) {
    contract.completed = true
    state.code = state.code.plus(contract.reward)
    state.stats.contractsCompleted += 1
    state.contracts = generateContracts()
  }
  return state
}

export const prestige = (state: GameState): GameState => {
  const points = state.code.div(1e6).sqrt()
  if (points.lte(0)) return state

  state.prestigePoints = state.prestigePoints.plus(points)
  state.prestigeMultiplier = state.prestigeMultiplier.plus(0.1)
  state.code = new Decimal(0)
  state.codePerSecond = new Decimal(0)
  state.clickPower = new Decimal(1)
  state.upgrades = []
  state.stats.prestigeCount += 1
  
  return state
}
