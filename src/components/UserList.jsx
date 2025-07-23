import React from 'react'
import { useChat } from '../context/ChatContext'
import { useAuth } from '../context/AuthContext'
import { Circle } from 'lucide-react'

const UserList = () => {
  const { participants } = useChat()
  const { user } = useAuth()

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'text-green-400'
      case 'away':
        return 'text-yellow-400'
      case 'offline':
        return 'text-gray-400'
      default:
        return 'text-gray-400'
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'online':
        return 'Online'
      case 'away':
        return 'Away'
      case 'offline':
        return 'Offline'
      default:
        return 'Unknown'
    }
  }

  // Sort users: current user first, then online users, then others
  const sortedParticipants = [...participants].sort((a, b) => {
    if (a.id === user?.id) return -1
    if (b.id === user?.id) return 1
    if (a.status === 'online' && b.status !== 'online') return -1
    if (b.status === 'online' && a.status !== 'online') return 1
    return a.name.localeCompare(b.name)
  })

  // Add current user to the list if not already present
  const allParticipants = user && !participants.find(p => p.id === user.id) 
    ? [{ 
        id: user.id, 
        name: user.name + ' (You)', 
        avatar: '👤', 
        status: 'online' 
      }, ...sortedParticipants]
    : sortedParticipants.map(p => 
        p.id === user?.id 
          ? { ...p, name: p.name + ' (You)' }
          : p
      )

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="p-4 space-y-2">
        {allParticipants.map((participant) => (
          <div
            key={participant.id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-crypto-accent/10 transition-colors"
          >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-crypto-accent/20 flex items-center justify-center text-sm">
                {participant.avatar}
              </div>
              {/* Status Indicator */}
              <div className="absolute -bottom-1 -right-1">
                <Circle 
                  className={`w-3 h-3 ${getStatusColor(participant.status)} fill-current`}
                />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-crypto-text truncate">
                {participant.name}
              </div>
              <div className={`text-xs ${getStatusColor(participant.status)}`}>
                {getStatusText(participant.status)}
              </div>
            </div>

            {/* Premium Badge (if applicable) */}
            {participant.id === user?.id && user?.isPremium && (
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-crypto-primary text-xs font-bold px-2 py-1 rounded-full">
                  PRO
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Online Count Summary */}
        <div className="mt-6 pt-4 border-t border-crypto-accent/20">
          <div className="text-xs text-crypto-text-secondary text-center">
            {allParticipants.filter(p => p.status === 'online').length} of {allParticipants.length} online
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserList

