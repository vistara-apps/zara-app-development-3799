import React, { useState } from 'react'
import { useChat } from '../context/ChatContext'
import { Hash, ChevronDown, Settings, Users } from 'lucide-react'

const ChatHeader = () => {
  const { activeRoom, rooms, joinRoom, participants, unreadCounts } = useChat()
  const [showRoomSelector, setShowRoomSelector] = useState(false)
  
  const currentRoom = rooms.find(room => room.id === activeRoom)
  const onlineParticipants = participants.filter(p => p.status === 'online').length

  return (
    <div className="bg-crypto-primary border-b border-crypto-accent/20 p-4">
      <div className="flex items-center justify-between">
        {/* Room Info */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setShowRoomSelector(!showRoomSelector)}
              className="flex items-center gap-2 px-3 py-2 bg-crypto-secondary rounded-lg hover:bg-crypto-accent/20 transition-colors"
            >
              <Hash className="w-5 h-5 text-crypto-accent" />
              <span className="font-semibold text-crypto-text">
                {currentRoom?.name || 'Loading...'}
              </span>
              <ChevronDown className="w-4 h-4 text-crypto-text-secondary" />
            </button>

            {/* Room Selector Dropdown */}
            {showRoomSelector && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-crypto-secondary rounded-lg shadow-xl border border-crypto-accent/20 z-50">
                <div className="p-2">
                  <div className="text-xs font-semibold text-crypto-text-secondary uppercase tracking-wide mb-2 px-2">
                    Chat Rooms
                  </div>
                  {rooms.map(room => (
                    <button
                      key={room.id}
                      onClick={() => {
                        joinRoom(room.id)
                        setShowRoomSelector(false)
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left hover:bg-crypto-accent/20 transition-colors ${
                        room.id === activeRoom ? 'bg-crypto-accent/30' : ''
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Hash className="w-4 h-4 text-crypto-accent" />
                          <span className="font-medium text-crypto-text">
                            {room.name}
                          </span>
                        </div>
                        <div className="text-xs text-crypto-text-secondary mt-1">
                          {room.description}
                        </div>
                      </div>
                      {unreadCounts[room.id] > 0 && (
                        <div className="bg-crypto-accent text-crypto-primary text-xs font-bold px-2 py-1 rounded-full min-w-[20px] text-center">
                          {unreadCounts[room.id]}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="text-sm text-crypto-text-secondary">
            {currentRoom?.description}
          </div>
        </div>

        {/* Room Actions */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-sm text-crypto-text-secondary">
            <Users className="w-4 h-4" />
            <span>{onlineParticipants} online</span>
          </div>
          
          <button className="p-2 hover:bg-crypto-accent/20 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-crypto-text-secondary" />
          </button>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {showRoomSelector && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowRoomSelector(false)}
        />
      )}
    </div>
  )
}

export default ChatHeader

