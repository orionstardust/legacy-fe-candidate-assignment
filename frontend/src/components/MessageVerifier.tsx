import React, { useState } from 'react'

interface VerificationResult {
  isValid: boolean
  signer: string
  originalMessage: string
}

const MessageVerifier: React.FC = () => {
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [result, setResult] = useState<VerificationResult | null>(null)
  const [error, setError] = useState('')

  const handleVerify = async () => {
    if (!message.trim() || !signature.trim()) {
      setError('Please enter both message and signature')
      return
    }

    setIsVerifying(true)
    setError('')
    setResult(null)

    try {
      const response = await fetch('/api/verify-signature', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })

      if (!response.ok) {
        throw new Error('Failed to verify signature')
      }

      const data = await response.json()
      setResult(data)
    } catch (err) {
      console.error('Error verifying signature:', err)
      setError('Failed to verify signature. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  const handleClear = () => {
    setMessage('')
    setSignature('')
    setResult(null)
    setError('')
  }

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">Verify Signature</h2>
      
      {error && (
        <div className="alert alert-error mb-4">
          {error}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="verify-message" className="form-label">
          Message
        </label>
        <textarea
          id="verify-message"
          className="form-input textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter the original message..."
          disabled={isVerifying}
        />
      </div>

      <div className="form-group">
        <label htmlFor="verify-signature" className="form-label">
          Signature
        </label>
        <input
          id="verify-signature"
          type="text"
          className="form-input"
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="Enter the signature..."
          disabled={isVerifying}
        />
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleVerify}
          disabled={isVerifying || !message.trim() || !signature.trim()}
          className="btn btn-primary flex-1"
        >
          {isVerifying ? (
            <>
              <div className="loading"></div>
              Verifying...
            </>
          ) : (
            'Verify Signature'
          )}
        </button>
        
        <button
          onClick={handleClear}
          disabled={isVerifying}
          className="btn btn-secondary"
        >
          Clear
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 border rounded-lg">
          <h3 className="font-semibold mb-3">Verification Result</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Status:</span>
              <span className={`badge ${result.isValid ? 'badge-success' : 'badge-error'}`}>
                {result.isValid ? 'Valid' : 'Invalid'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">Signer:</span>
              <span className="font-mono text-sm">
                {result.signer.slice(0, 6)}...{result.signer.slice(-4)}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="font-medium">Message:</span>
              <span className="text-sm max-w-xs truncate" title={result.originalMessage}>
                {result.originalMessage}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-500">
        <p>Verify that a message was signed by a specific wallet address</p>
      </div>
    </div>
  )
}

export default MessageVerifier 