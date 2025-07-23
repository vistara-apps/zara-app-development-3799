import React from 'react'
import { useChat } from '../context/ChatContext'
import ChatHeader from './ChatHeader'
import MessageList from './MessageList'
import MessageInput from './MessageInput'
import UserList from './UserList'
import { Users, Wifi, WifiOff } from 'lucide-react'

const ChatWindow = () => {
  const { isConnected, activeRoom, rooms } = useChat()
  const currentRoom = rooms.find(room => room.id === activeRoom)

  return (
    <div className="flex h-full bg-crypto-secondary rounded-lg overflow-hidden shadow-xl">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <ChatHeader />
        
        {/* Connection Status */}
        <div className="px-4 py-2 bg-crypto-primary border-b border-crypto-accent/20">
          <div className="flex items-center gap-2 text-sm">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-red-400" />
                <span className="text-red-400">Connecting...</span>
              </>
            )}
            <span className="text-crypto-text-secondary">•</span>
            <span className="text-crypto-text-secondary">
              {currentRoom?.name || 'Loading...'}
            </span>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col min-h-0">
          <MessageList />
          <MessageInput />
        </div>
      </div>

      {/* User List Sidebar */}
      <div className="w-64 bg-crypto-primary border-l border-crypto-accent/20 hidden lg:block">
        <div className="p-4 border-b border-crypto-accent/20">
          <div className="flex items-center gap-2 text-crypto-text">
            <Users className="w-5 h-5" />
            <h3 className="font-semibold">Participants</h3>
          </div>
        </div>
        <UserList />
      </div>
    </div>
  )
}

export default ChatWindow

