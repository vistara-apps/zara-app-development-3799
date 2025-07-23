import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const ChatContext = createContext()

export const useChat = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider')
  }
  return context
}

// Demo users for chat simulation
const DEMO_USERS = [
  { id: 2, name: 'Alice Chen', avatar: '👩‍💼', status: 'online' },
  { id: 3, name: 'Bob Martinez', avatar: '👨‍💻', status: 'online' },
  { id: 4, name: 'Carol Johnson', avatar: '👩‍🔬', status: 'away' },
  { id: 5, name: 'David Kim', avatar: '👨‍🎨', status: 'online' },
  { id: 6, name: 'Emma Wilson', avatar: '👩‍🚀', status: 'offline' }
]

// Demo chat rooms
const DEMO_ROOMS = [
  { id: 'general', name: 'General Discussion', description: 'General crypto discussions' },
  { id: 'trading', name: 'Trading Signals', description: 'Share trading insights' },
  { id: 'alerts', name: 'Price Alerts', description: 'Automated price notifications' },
  { id: 'premium', name: 'Premium Members', description: 'Exclusive premium chat' }
]

export const ChatProvider = ({ children }) => {
  const { user } = useAuth()
  const [messages, setMessages] = useState([])
  const [activeRoom, setActiveRoom] = useState('general')
  const [participants, setParticipants] = useState(DEMO_USERS)
  const [rooms, setRooms] = useState(DEMO_ROOMS)
  const [isConnected, setIsConnected] = useState(false)
  const [typingUsers, setTypingUsers] = useState([])
  const [unreadCounts, setUnreadCounts] = useState({})

  // Initialize with some demo messages
  useEffect(() => {
    const initialMessages = [
      {
        id: 1,
        userId: 2,
        user: DEMO_USERS[0],
        content: 'Hey everyone! Bitcoin is looking strong today 🚀',
        timestamp: new Date(Date.now() - 300000),
        roomId: 'general',
        type: 'text'
      },
      {
        id: 2,
        userId: 3,
        user: DEMO_USERS[1],
        content: 'Agreed! The technical indicators are very bullish',
        timestamp: new Date(Date.now() - 240000),
        roomId: 'general',
        type: 'text'
      },
      {
        id: 3,
        userId: 4,
        user: DEMO_USERS[2],
        content: 'Just set up some alerts for ETH at $2500',
        timestamp: new Date(Date.now() - 180000),
        roomId: 'alerts',
        type: 'text'
      },
      {
        id: 4,
        userId: 5,
        user: DEMO_USERS[3],
        content: 'Check out this analysis I found: https://example.com/crypto-analysis',
        timestamp: new Date(Date.now() - 120000),
        roomId: 'trading',
        type: 'text'
      }
    ]
    setMessages(initialMessages)
    
    // Simulate connection
    setTimeout(() => setIsConnected(true), 1000)
  }, [])

  // Get messages for active room
  const getRoomMessages = (roomId = activeRoom) => {
    return messages
      .filter(msg => msg.roomId === roomId)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
  }

  // Send a message
  const sendMessage = (content, type = 'text') => {
    if (!content.trim() || !user) return

    const newMessage = {
      id: Date.now(),
      userId: user.id,
      user: {
        id: user.id,
        name: user.name,
        avatar: '👤'
      },
      content: content.trim(),
      timestamp: new Date(),
      roomId: activeRoom,
      type,
      status: 'sent'
    }

    setMessages(prev => [...prev, newMessage])

    // Simulate message delivery
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'delivered' }
            : msg
        )
      )
    }, 500)

    // Simulate read receipt
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: 'read' }
            : msg
        )
      )
    }, 2000)
  }

  // Join a room
  const joinRoom = (roomId) => {
    setActiveRoom(roomId)
    // Clear unread count for this room
    setUnreadCounts(prev => ({ ...prev, [roomId]: 0 }))
  }

  // Start typing indicator
  const startTyping = () => {
    // In a real app, this would send a typing event to other users
    console.log(`${user?.name} started typing in ${activeRoom}`)
  }

  // Stop typing indicator
  const stopTyping = () => {
    // In a real app, this would stop the typing event
    console.log(`${user?.name} stopped typing in ${activeRoom}`)
  }

  // Simulate incoming messages and typing indicators
  useEffect(() => {
    if (!isConnected) return

    const simulateActivity = () => {
      // Randomly simulate typing indicators
      if (Math.random() < 0.3) {
        const randomUser = DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)]
        setTypingUsers(prev => [...prev.filter(u => u.id !== randomUser.id), randomUser])
        
        setTimeout(() => {
          setTypingUsers(prev => prev.filter(u => u.id !== randomUser.id))
        }, 2000 + Math.random() * 3000)
      }

      // Randomly simulate incoming messages
      if (Math.random() < 0.2) {
        const randomUser = DEMO_USERS[Math.floor(Math.random() * DEMO_USERS.length)]
        const randomRoom = DEMO_ROOMS[Math.floor(Math.random() * DEMO_ROOMS.length)]
        
        const demoMessages = [
          'The market is looking interesting today',
          'Anyone else watching the BTC charts?',
          'Just got a price alert for ETH!',
          'This volatility is crazy 📈',
          'Time to buy the dip? 🤔',
          'New analysis just dropped',
          'Portfolio looking green today 💚',
          'What do you think about this trend?'
        ]

        const randomMessage = demoMessages[Math.floor(Math.random() * demoMessages.length)]
        
        const newMessage = {
          id: Date.now() + Math.random(),
          userId: randomUser.id,
          user: randomUser,
          content: randomMessage,
          timestamp: new Date(),
          roomId: randomRoom.id,
          type: 'text',
          status: 'delivered'
        }

        setMessages(prev => [...prev, newMessage])

        // Update unread count if not in active room
        if (randomRoom.id !== activeRoom) {
          setUnreadCounts(prev => ({
            ...prev,
            [randomRoom.id]: (prev[randomRoom.id] || 0) + 1
          }))
        }
      }
    }

    const interval = setInterval(simulateActivity, 5000 + Math.random() * 10000)
    return () => clearInterval(interval)
  }, [isConnected, activeRoom])

  const value = {
    messages: getRoomMessages(),
    allMessages: messages,
    activeRoom,
    participants,
    rooms,
    isConnected,
    typingUsers: typingUsers.filter(u => u.id !== user?.id),
    unreadCounts,
    sendMessage,
    joinRoom,
    startTyping,
    stopTyping,
    getRoomMessages
  }

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  )
}

