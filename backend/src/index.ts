import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import { verifySignature } from './services/signatureService'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json({ limit: '10mb' }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Signature verification endpoint
app.post('/verify-signature', async (req, res) => {
  try {
    const { message, signature } = req.body

    // Validate input
    if (!message || !signature) {
      return res.status(400).json({
        error: 'Missing required fields: message and signature are required'
      })
    }

    if (typeof message !== 'string' || typeof signature !== 'string') {
      return res.status(400).json({
        error: 'Invalid input types: message and signature must be strings'
      })
    }

    // Verify the signature
    const result = await verifySignature(message, signature)

    res.json(result)
  } catch (error) {
    console.error('Error verifying signature:', error)
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to verify signature'
    })
  }
})

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(500).json({
    error: 'Internal server error',
    message: 'Something went wrong'
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: 'The requested endpoint does not exist'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📡 Health check: http://localhost:${PORT}/health`)
  console.log(`🔐 Signature verification: http://localhost:${PORT}/verify-signature`)
})

export default app 