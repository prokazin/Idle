import React from 'react'
import { TelegramUser } from '../../types/telegram.types'

interface UserProfileProps {
  user: TelegramUser
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-cyber-dark/50 rounded-lg border border-cyber-purple/30">
      {user.photo_url ? (
        <img
          src={user.photo_url}
          alt={user.first_name}
          className="w-12 h-12 rounded-full border-2 border-cyber-purple"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-cyber-purple/30 flex items-center justify-center text-2xl">
          👤
        </div>
      )}
      <div>
        <div className="font-bold">{user.first_name} {user.last_name || ''}</div>
        <div className="text-sm text-cyber-gray">@{user.username || 'user'}</div>
        <div className="text-xs text-cyber-gray">ID: {user.id}</div>
      </div>
    </div>
  )
}

export default UserProfile
