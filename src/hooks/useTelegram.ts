import { useState, useEffect } from 'react'
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
  const [isReady, setIsReady] = useState(false)

  const initTelegram = () => {
    if (typeof window !== 'undefined') {
      // Проверяем наличие Telegram WebApp
      if (window.Telegram?.WebApp) {
        const app = window.Telegram.WebApp
        setWebApp(app)
        
        // Разворачиваем на весь экран
        app.expand()
        app.ready()
        
        // Получаем пользователя
        if (app.initDataUnsafe?.user) {
          setUser(app.initDataUnsafe.user)
        }
        
        setIsReady(true)
        console.log('Telegram WebApp initialized:', app.initDataUnsafe?.user)
      } else {
        console.log('Telegram WebApp not found, running in browser mode')
        // Для тестирования в браузере - создаем тестового пользователя
        const testUser: TelegramUser = {
          id: 123456789,
          first_name: 'Тестовый',
          last_name: 'Пользователь',
          username: 'test_user',
          auth_date: Date.now(),
          hash: 'test_hash'
        }
        setUser(testUser)
        setIsReady(true)
      }
    }
  }

  useEffect(() => {
    initTelegram()
  }, [])

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
    isReady,
    initTelegram,
    sendData,
    closeApp
  }
}
