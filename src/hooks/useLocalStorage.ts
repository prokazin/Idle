import { GameState } from '../types/game.types'
import { saveGame, loadGame } from '../utils/saveManager'

export const useLocalStorage = () => {
  const save = (state: GameState) => {
    saveGame(state)
  }

  const load = (): GameState | null => {
    return loadGame()
  }

  return { saveGame: save, loadGame: load }
}
