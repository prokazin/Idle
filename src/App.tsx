import { useEffect, useState } from 'react'
import MainLayout from './components/Layout/MainLayout'
import CodeButton from './components/Game/CodeButton'
import StatsPanel from './components/Game/StatsPanel'
import UpgradeList from './components/Game/UpgradeList'
import ContractPanel from './components/Contracts/ContractPanel'
import TelegramLogin from './components/Telegram/TelegramLogin'
import UserProfile from './components/Telegram/UserProfile'
import { useGameLoop } from './hooks/useGameLoop'
import { useTelegram } from './hooks/useTelegram'
import { useLocalStorage } from './hooks/useLocalStorage'
import { buyUpgrade, acceptContract } from './utils/gameLogic'

function App() {
  const { user, isReady, initTelegram } = useTelegram()
  const { gameState, updateGame } = useGameLoop()
  const { loadGame, saveGame } = useLocalStorage()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Инициализация Telegram
    initTelegram()
    
    // Загрузка сохранения
    const saved = loadGame()
    if (saved) {
      updateGame(saved)
    }
    
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (gameState && !isLoading) {
      saveGame(gameState)
    }
  }, [gameState])

  const handleCodeClick = () => {
    updateGame((prev: any) => ({
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
    updateGame((prev: any) => buyUpgrade(prev, id))
  }

  const handleAcceptContract = (id: string) => {
    updateGame((prev: any) => acceptContract(prev, id))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
        <div className="text-[#7c3aed] text-xl animate-pulse">Загрузка...</div>
      </div>
    )
  }

  // Если нет пользователя - показываем страницу входа
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
