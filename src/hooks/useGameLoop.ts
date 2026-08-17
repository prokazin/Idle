import { useState, useEffect } from 'react'
import { GameState } from '../types/game.types'
import { createInitialState, calculateCodePerSecond } from '../utils/gameLogic'

export const useGameLoop = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialState())
  const [isRunning, setIsRunning] = useState(true)

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setGameState(prev => {
        const newState = { ...prev }
        const perSecond = calculateCodePerSecond(newState)
        newState.code = newState.code.plus(perSecond)
        newState.totalCode = newState.totalCode.plus(perSecond)
        newState.stats.totalTime += 1
        
        if (perSecond.gt(newState.stats.maxCodePerSecond)) {
          newState.stats.maxCodePerSecond = perSecond
        }
        
        return newState
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning])

  const updateGame = (update: Partial<GameState> | ((state: GameState) => GameState)) => {
    setGameState(prev => {
      if (typeof update === 'function') {
        return update(prev)
      }
      return { ...prev, ...update }
    })
  }

  return { gameState, updateGame, setIsRunning }
}
