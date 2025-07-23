import React from 'react'

const TypingIndicator = ({ users }) => {
  if (!users || users.length === 0) return null

  const getTypingText = () => {
    if (users.length === 1) {
      return `${users[0].name} is typing...`
    } else if (users.length === 2) {
      return `${users[0].name} and ${users[1].name} are typing...`
    } else {
      return `${users[0].name} and ${users.length - 1} others are typing...`
    }
  }

  return (
    <div className="flex gap-3 items-center">
      {/* Avatar */}
      <div className="flex-shrink-0">
        <div className="w-8 h-8 rounded-full bg-crypto-accent/20 flex items-center justify-center text-sm">
          {users[0]?.avatar || '👤'}
        </div>
      </div>

      {/* Typing Bubble */}
      <div className="bg-crypto-primary text-crypto-text px-4 py-2 rounded-2xl rounded-bl-md border border-crypto-accent/20">
        <div className="flex items-center gap-1">
          <span className="text-sm text-crypto-text-secondary">
            {getTypingText()}
          </span>
          
          {/* Animated Dots */}
          <div className="flex gap-1 ml-2">
            <div className="w-1 h-1 bg-crypto-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-1 h-1 bg-crypto-text-secondary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-1 h-1 bg-crypto-text-secondary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TypingIndicator

