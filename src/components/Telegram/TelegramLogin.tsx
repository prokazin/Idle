import React, { useEffect } from 'react'

const TelegramLogin: React.FC = () => {
  useEffect(() => {
    // Автоматически пытаемся инициализировать Telegram при загрузке
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand()
      window.Telegram.WebApp.ready()
    }
  }, [])

  const handleLogin = () => {
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      const app = window.Telegram.WebApp
      app.expand()
      app.ready()
      
      // Проверяем пользователя
      const user = app.initDataUnsafe?.user
      if (user) {
        // Перезагружаем, чтобы App.tsx подхватил пользователя
        window.location.reload()
      } else {
        // Если пользователя нет, показываем сообщение
        alert('Пожалуйста, откройте игру через Telegram бота')
      }
    } else {
      // Если не в Telegram - даем ссылку на бота
      const botUsername = 'ваш_бот_username' // Замените на username вашего бота
      window.open(`https://t.me/${botUsername}`, '_blank')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f]">
      <div className="text-center space-y-6 p-8 border-2 border-[#7c3aed] rounded-lg max-w-md w-full">
        <div className="text-6xl mb-4">🔐</div>
        <h2 className="text-2xl font-bold text-[#7c3aed]">ВХОД В ИГРУ</h2>
        <p className="text-[#94a3b8] text-sm">
          Для входа используйте Telegram
        </p>
        <button
          onClick={handleLogin}
          className="w-full px-8 py-3 bg-[#3b82f6] hover:bg-[#3b82f6]/80 text-white rounded-lg font-bold transition-all text-lg flex items-center justify-center gap-2"
        >
          <span>🚀</span>
          Войти через Telegram
        </button>
        <p className="text-[#94a3b8] text-xs">
          Если кнопка не работает, откройте игру через бота в Telegram
        </p>
      </div>
    </div>
  )
}

export default TelegramLogin
