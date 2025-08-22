import React, { useState, useEffect } from 'react'

interface SignedMessage {
  id: string
  message: string
  signature: string
  timestamp: number
  address: string
}

const MessageHistory: React.FC = () => {
  const [signedMessages, setSignedMessages] = useState<SignedMessage[]>([])
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    loadSignedMessages()
  }, [])

  const loadSignedMessages = () => {
    const stored = localStorage.getItem('signedMessages')
    if (stored) {
      setSignedMessages(JSON.parse(stored))
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text
    return text.slice(0, maxLength) + '...'
  }

  const clearHistory = () => {
    if (window.confirm('Are you sure you want to clear all signed messages?')) {
      localStorage.removeItem('signedMessages')
      setSignedMessages([])
    }
  }

  if (signedMessages.length === 0) {
    return (
      <div className="card text-center">
        <h2 className="text-xl font-semibold mb-4">Message History</h2>
        <p className="text-gray-500">No signed messages yet. Sign a message to see it here!</p>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Message History</h2>
        <button
          onClick={clearHistory}
          className="btn btn-secondary text-sm"
        >
          Clear History
        </button>
      </div>

      <div className="space-y-4">
        {signedMessages.map((msg) => (
          <div key={msg.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm text-gray-500">
                    {formatTimestamp(msg.timestamp)}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-sm font-mono text-gray-600">
                    {msg.address.slice(0, 6)}...{msg.address.slice(-4)}
                  </span>
                </div>
                
                <p className="text-gray-800 mb-2">
                  {truncateText(msg.message, 100)}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => copyToClipboard(msg.message, `msg-${msg.id}`)}
                className="btn btn-secondary text-xs py-2 px-3"
              >
                {copiedId === `msg-${msg.id}` ? 'Copied!' : 'Copy Message'}
              </button>
              
              <button
                onClick={() => copyToClipboard(msg.signature, `sig-${msg.id}`)}
                className="btn btn-secondary text-xs py-2 px-3"
              >
                {copiedId === `sig-${msg.id}` ? 'Copied!' : 'Copy Signature'}
              </button>
            </div>

            {msg.message.length > 100 && (
              <details className="mt-3">
                <summary className="text-sm text-gray-600 cursor-pointer hover:text-gray-800">
                  Show full message
                </summary>
                <p className="mt-2 text-sm text-gray-700 font-mono bg-gray-50 p-3 rounded">
                  {msg.message}
                </p>
              </details>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MessageHistory 