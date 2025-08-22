import React, { useState } from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

interface SignedMessage {
  id: string
  message: string
  signature: string
  timestamp: number
  address: string
}

interface MessageSignerProps {
  onMessageSigned?: (signedMessage: SignedMessage) => void
}

const MessageSigner: React.FC<MessageSignerProps> = ({ onMessageSigned }) => {
  const { primaryWallet } = useDynamicContext()
  
  const [message, setMessage] = useState('')
  const [isSigning, setIsSigning] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSignMessage = async () => {
    if (!message.trim()) {
      setError('Please enter a message to sign')
      return
    }

    if (!primaryWallet) {
      setError('No wallet connected')
      return
    }

    setIsSigning(true)
    setError('')
    setSuccess('')

    try {
      // Sign the message using the wallet
      const signature = await primaryWallet.connector.signMessage(message)
      
      const signedMessage: SignedMessage = {
        id: Date.now().toString(),
        message,
        signature,
        timestamp: Date.now(),
        address: primaryWallet.address
      }

      // Save to localStorage
      const existingMessages = JSON.parse(localStorage.getItem('signedMessages') || '[]')
      const updatedMessages = [signedMessage, ...existingMessages]
      localStorage.setItem('signedMessages', JSON.stringify(updatedMessages))

      setSuccess('Message signed successfully!')
      setMessage('')
      
      // Notify parent component
      if (onMessageSigned) {
        onMessageSigned(signedMessage)
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      console.error('Error signing message:', err)
      setError('Failed to sign message. Please try again.')
    } finally {
      setIsSigning(false)
    }
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">Sign Message</h2>
      
      {error && (
        <div className="alert alert-error mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="alert alert-success mb-4">
          {success}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Enter your message
        </label>
        <textarea
          id="message"
          className="form-input textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          disabled={isSigning}
        />
      </div>

      <button
        onClick={handleSignMessage}
        disabled={isSigning || !message.trim()}
        className="btn btn-primary w-full"
      >
        {isSigning ? (
          <>
            <div className="loading"></div>
            Signing...
          </>
        ) : (
          'Sign Message'
        )}
      </button>

      <div className="mt-4 text-sm text-gray-500">
        <p>Your message will be signed with your connected wallet</p>
      </div>
    </div>
  )
}

export default MessageSigner 