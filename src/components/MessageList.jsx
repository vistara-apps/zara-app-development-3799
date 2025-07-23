import React, { useEffect, useRef } from 'react'
import { useChat } from '../context/ChatContext'
import { useAuth } from '../context/AuthContext'
import { Check, CheckCheck, Clock } from 'lucide-react'
import TypingIndicator from './TypingIndicator'

const MessageList = () => {
  const { messages, typingUsers } = useChat()
  const { user } = useAuth()
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typingUsers])

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return 'Today'
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

  const MessageStatus = ({ status }) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-crypto-text-secondary" />
      case 'sent':
        return <Check className="w-3 h-3 text-crypto-text-secondary" />
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-crypto-text-secondary" />
      case 'read':
        return <CheckCheck className="w-3 h-3 text-crypto-accent" />
      default:
        return null
    }
  }

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = formatDate(message.timestamp)
    if (!groups[date]) {
      groups[date] = []
    }
    groups[date].push(message)
    return groups
  }, {})

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date}>
          {/* Date Separator */}
          <div className="flex items-center justify-center my-6">
            <div className="bg-crypto-primary px-3 py-1 rounded-full text-xs text-crypto-text-secondary border border-crypto-accent/20">
              {date}
            </div>
          </div>

          {/* Messages for this date */}
          {dateMessages.map((message, index) => {
            const isOwnMessage = message.userId === user?.id
            const showAvatar = index === 0 || dateMessages[index - 1]?.userId !== message.userId
            const showName = showAvatar && !isOwnMessage

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
              >
                {/* Avatar (for other users) */}
                {!isOwnMessage && (
                  <div className="flex-shrink-0">
                    {showAvatar ? (
                      <div className="w-8 h-8 rounded-full bg-crypto-accent/20 flex items-center justify-center text-sm">
                        {message.user?.avatar || '👤'}
                      </div>
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>
                )}

                {/* Message Content */}
                <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : ''}`}>
                  {/* User Name */}
                  {showName && (
                    <div className="text-sm font-semibold text-crypto-text mb-1">
                      {message.user?.name}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      isOwnMessage
                        ? 'bg-crypto-accent text-crypto-primary rounded-br-md'
                        : 'bg-crypto-primary text-crypto-text rounded-bl-md border border-crypto-accent/20'
                    }`}
                  >
                    <div className="break-words">{message.content}</div>
                  </div>

                  {/* Message Info */}
                  <div className={`flex items-center gap-1 mt-1 text-xs text-crypto-text-secondary ${
                    isOwnMessage ? 'justify-end' : 'justify-start'
                  }`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {isOwnMessage && message.status && (
                      <MessageStatus status={message.status} />
                    )}
                  </div>
                </div>

                {/* Avatar (for own messages) */}
                {isOwnMessage && (
                  <div className="flex-shrink-0 order-3">
                    {showAvatar ? (
                      <div className="w-8 h-8 rounded-full bg-crypto-accent/20 flex items-center justify-center text-sm">
                        👤
                      </div>
                    ) : (
                      <div className="w-8 h-8" />
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <TypingIndicator users={typingUsers} />
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default MessageList

