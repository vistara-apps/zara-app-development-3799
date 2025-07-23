import React, { useState, useRef, useEffect } from 'react'
import { useChat } from '../context/ChatContext'
import { Send, Smile, Paperclip } from 'lucide-react'

const MessageInput = () => {
  const { sendMessage, startTyping, stopTyping, isConnected } = useChat()
  const [message, setMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const inputRef = useRef(null)
  const typingTimeoutRef = useRef(null)

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setMessage(value)

    // Handle typing indicators
    if (value.trim() && !isTyping) {
      setIsTyping(true)
      startTyping()
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout to stop typing
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false)
      stopTyping()
    }, 1000)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!message.trim() || !isConnected) return

    sendMessage(message)
    setMessage('')
    
    // Clear typing state
    setIsTyping(false)
    stopTyping()
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Refocus input
    inputRef.current?.focus()
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="border-t border-crypto-accent/20 bg-crypto-primary p-4">
      <form onSubmit={handleSubmit} className="flex items-end gap-3">
        {/* Attachment Button */}
        <button
          type="button"
          className="flex-shrink-0 p-2 text-crypto-text-secondary hover:text-crypto-text hover:bg-crypto-accent/20 rounded-lg transition-colors"
          disabled={!isConnected}
        >
          <Paperclip className="w-5 h-5" />
        </button>

        {/* Message Input */}
        <div className="flex-1 relative">
          <textarea
            ref={inputRef}
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={isConnected ? "Type a message..." : "Connecting..."}
            disabled={!isConnected}
            className="w-full px-4 py-3 bg-crypto-secondary border border-crypto-accent/20 rounded-2xl text-crypto-text placeholder-crypto-text-secondary resize-none focus:outline-none focus:ring-2 focus:ring-crypto-accent focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            rows={1}
            style={{
              minHeight: '44px',
              maxHeight: '120px',
              resize: 'none'
            }}
            onInput={(e) => {
              // Auto-resize textarea
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
            }}
          />
          
          {/* Character count (optional) */}
          {message.length > 200 && (
            <div className="absolute -top-6 right-2 text-xs text-crypto-text-secondary">
              {message.length}/500
            </div>
          )}
        </div>

        {/* Emoji Button */}
        <button
          type="button"
          className="flex-shrink-0 p-2 text-crypto-text-secondary hover:text-crypto-text hover:bg-crypto-accent/20 rounded-lg transition-colors"
          disabled={!isConnected}
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Send Button */}
        <button
          type="submit"
          disabled={!message.trim() || !isConnected}
          className="flex-shrink-0 p-2 bg-crypto-accent text-crypto-primary rounded-lg hover:bg-crypto-accent/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-crypto-accent"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* Connection Status */}
      {!isConnected && (
        <div className="mt-2 text-xs text-crypto-text-secondary text-center">
          Connecting to chat server...
        </div>
      )}
    </div>
  )
}

export default MessageInput

