import React, { useEffect } from 'react'
import MainLayout from './components/Layout/MainLayout'
import CodeButton from './components/Game/CodeButton'
import StatsPanel from './components/Game/StatsPanel'
import UpgradeList from './components/Game/UpgradeList'
import ContractPanel from './components/Contracts/ContractPanel'
import TelegramLogin from './components/Telegram/TelegramLogin'
import UserProfile from './components/Telegram/UserProfile'
import useGameLoop from './hooks/useGameLoop'
import useTelegram from './hooks/useTelegram'
import useLocalStorage from './hooks/useLocalStorage'
import { buyUpgrade, acceptContract } from './utils/gameLogic'

function App() {
  const { user, initTelegram } = useTelegram()
  const { gameState, updateGame } = useGameLoop()
  const { loadGame, saveGame } = useLocalStorage()

  useEffect(() => {
    initTelegram()
    const saved = loadGame()
    if (saved) {
      updateGame(saved)
    }
  }, [])

  useEffect(() => {
    if (gameState) {
      saveGame(gameState)
    }
  }, [gameState])

  const handleCodeClick = () => {
    updateGame(prev => ({
      ...prev,
      code: prev.code.plus(prev.clickPower),
      totalCode: prev.totalCode.plus(prev.clickPower),
      stats: {
        ...prev.stats,
        totalClicks: prev.stats.totalClicks + 1
      }
    }))
  }

  const handleBuyUpgrade = (id: string) => {
    updateGame(prev => buyUpgrade(prev, id))
  }

  const handleAcceptContract = (id: string) => {
    updateGame(prev => acceptContract(prev, id))
  }

  if (!user) {
    return <TelegramLogin />
  }

  return (
    <MainLayout>
      <UserProfile user={user} />
      <StatsPanel stats={gameState.stats} />
      <CodeButton onClick={handleCodeClick} />
      <UpgradeList upgrades={gameState.upgrades} onBuy={handleBuyUpgrade} />
      <ContractPanel contracts={gameState.contracts} onAccept={handleAcceptContract} />
    </MainLayout>
  )
}

export default App
