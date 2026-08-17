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

  if (!user) {
    return <TelegramLogin />
  }

  return (
    <MainLayout>
      <UserProfile user={user} />
      <StatsPanel stats={gameState.stats} />
      <CodeButton onClick={() => updateGame({ code: gameState.code + 1 })} />
      <UpgradeList upgrades={gameState.upgrades} onBuy={(id) => updateGame({ buyUpgrade: id })} />
      <ContractPanel contracts={gameState.contracts} onAccept={(id) => updateGame({ acceptContract: id })} />
    </MainLayout>
  )
}
