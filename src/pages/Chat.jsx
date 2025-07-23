import React from 'react'
import ChatWindow from '../components/ChatWindow'
import { MessageCircle, Users, Zap } from 'lucide-react'

const Chat = () => {
  return (
    <div className="min-h-[calc(100vh-200px)] flex flex-col">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-crypto-accent/20 rounded-lg">
            <MessageCircle className="w-6 h-6 text-crypto-accent" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-crypto-text">
              Community Chat
            </h1>
            <p className="text-crypto-text-secondary">
              Connect with fellow crypto enthusiasts and traders
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2 px-3 py-2 bg-crypto-secondary rounded-lg border border-crypto-accent/20">
            <Users className="w-4 h-4 text-crypto-accent" />
            <span className="text-sm text-crypto-text">
              <span className="font-semibold">12</span> online
            </span>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-2 bg-crypto-secondary rounded-lg border border-crypto-accent/20">
            <Zap className="w-4 h-4 text-crypto-accent" />
            <span className="text-sm text-crypto-text">
              Real-time updates
            </span>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 min-h-[600px]">
        <ChatWindow />
      </div>

      {/* Chat Guidelines */}
      <div className="mt-6 p-4 bg-crypto-secondary rounded-lg border border-crypto-accent/20">
        <h3 className="font-semibold text-crypto-text mb-2">Chat Guidelines</h3>
        <div className="text-sm text-crypto-text-secondary space-y-1">
          <p>• Be respectful and constructive in your discussions</p>
          <p>• Share insights and analysis, but remember this is not financial advice</p>
          <p>• Keep conversations relevant to cryptocurrency and trading</p>
          <p>• No spam, excessive promotion, or inappropriate content</p>
        </div>
      </div>
    </div>
  )
}

export default Chat

