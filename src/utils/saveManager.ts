import { GameState } from '../types/game.types'
import { Decimal } from 'break_eternity.js'

const SAVE_KEY = 'codeTycoonSave'

export const saveGame = (state: GameState): void => {
  try {
    const serialized = JSON.stringify({
      ...state,
      code: state.code.toString(),
      totalCode: state.totalCode.toString(),
      clickPower: state.clickPower.toString(),
      codePerSecond: state.codePerSecond.toString(),
      prestigePoints: state.prestigePoints.toString(),
      prestigeMultiplier: state.prestigeMultiplier.toString(),
      stats: {
        ...state.stats,
        maxCodePerSecond: state.stats.maxCodePerSecond.toString()
      }
    })
    localStorage.setItem(SAVE_KEY, serialized)
  } catch (error) {
    console.error('Save failed:', error)
  }
}

export const loadGame = (): GameState | null => {
  try {
    const data = localStorage.getItem(SAVE_KEY)
    if (!data) return null

    const parsed = JSON.parse(data)
    return {
      ...parsed,
      code: new Decimal(parsed.code),
      totalCode: new Decimal(parsed.totalCode),
      clickPower: new Decimal(parsed.clickPower),
      codePerSecond: new Decimal(parsed.codePerSecond),
      prestigePoints: new Decimal(parsed.prestigePoints),
      prestigeMultiplier: new Decimal(parsed.prestigeMultiplier),
      stats: {
        ...parsed.stats,
        maxCodePerSecond: new Decimal(parsed.stats.maxCodePerSecond)
      }
    }
  } catch (error) {
    console.error('Load failed:', error)
    return null
  }
}
