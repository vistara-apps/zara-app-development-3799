import React from 'react'
import { Check, CheckCheck, Clock, AlertCircle } from 'lucide-react'

const MessageStatus = ({ status, className = '' }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return <Clock className={`w-3 h-3 text-crypto-text-secondary animate-pulse ${className}`} />
      case 'sent':
        return <Check className={`w-3 h-3 text-crypto-text-secondary ${className}`} />
      case 'delivered':
        return <CheckCheck className={`w-3 h-3 text-crypto-text-secondary ${className}`} />
      case 'read':
        return <CheckCheck className={`w-3 h-3 text-crypto-accent ${className}`} />
      case 'failed':
        return <AlertCircle className={`w-3 h-3 text-red-400 ${className}`} />
      default:
        return null
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'sending':
        return 'Sending...'
      case 'sent':
        return 'Sent'
      case 'delivered':
        return 'Delivered'
      case 'read':
        return 'Read'
      case 'failed':
        return 'Failed to send'
      default:
        return ''
    }
  }

  return (
    <div className="flex items-center gap-1" title={getStatusText()}>
      {getStatusIcon()}
    </div>
  )
}

export default MessageStatus

