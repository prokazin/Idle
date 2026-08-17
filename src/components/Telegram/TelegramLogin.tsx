import React from 'react'

const TelegramLogin: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cyber-dark">
      <div className="text-center space-y-6 p-8 border-2 border-cyber-purple rounded-lg">
        <h2 className="text-2xl font-bold text-cyber-purple">🔐 ВХОД В ИГРУ</h2>
        <p className="text-cyber-gray">Используйте Telegram для входа</p>
        <button
          onClick={() => {
            if (window.Telegram?.WebApp) {
              window.Telegram.WebApp.expand()
            }
          }}
          className="px-8 py-3 bg-cyber-blue hover:bg-cyber-blue/80 text-white rounded-lg font-bold transition-all"
        >
          Войти через Telegram
        </button>
      </div>
    </div>
  )
}

export default TelegramLogin
