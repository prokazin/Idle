import { useState } from 'react'
import { TelegramUser, TelegramWebApp } from '../types/telegram.types'

declare global {
  interface Window {
    Telegram: {
      WebApp: TelegramWebApp
    }
  }
}

export const useTelegram = () => {
  const [user, setUser] = useState<TelegramUser | null>(null)
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null)

  const initTelegram = () => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const app = window.Telegram.WebApp
      setWebApp(app)
      
      if (app.initDataUnsafe?.user) {
        setUser(app.initDataUnsafe.user)
      }
      
      app.expand()
    }
  }

  const sendData = (data: any) => {
    if (webApp) {
      webApp.sendData(JSON.stringify(data))
    }
  }

  const closeApp = () => {
    if (webApp) {
      webApp.close()
    }
  }

  return {
    user,
    webApp,
    initTelegram,
    sendData,
    closeApp
  }
}
