import request from 'supertest'
import app from '../index'
import { ethers } from 'ethers'

describe('API Endpoints', () => {
  let testWallet: ethers.Wallet
  let testMessage: string
  let testSignature: string

  beforeAll(async () => {
    // Create a test wallet
    testWallet = ethers.Wallet.createRandom()
    testMessage = 'Test message for API verification'
    testSignature = await testWallet.signMessage(testMessage)
  })

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200)

      expect(response.body).toHaveProperty('status', 'OK')
      expect(response.body).toHaveProperty('timestamp')
    })
  })

  describe('POST /verify-signature', () => {
    it('should verify a valid signature', async () => {
      const response = await request(app)
        .post('/verify-signature')
        .send({
          message: testMessage,
          signature: testSignature
        })
        .expect(200)

      expect(response.body.isValid).toBe(true)
      expect(response.body.signer.toLowerCase()).toBe(testWallet.address.toLowerCase())
      expect(response.body.originalMessage).toBe(testMessage)
    })

    it('should reject request with missing message', async () => {
      const response = await request(app)
        .post('/verify-signature')
        .send({
          signature: testSignature
        })
        .expect(400)

      expect(response.body.error).toBe('Missing required fields: message and signature are required')
    })

    it('should reject request with missing signature', async () => {
      const response = await request(app)
        .post('/verify-signature')
        .send({
          message: testMessage
        })
        .expect(400)

      expect(response.body.error).toBe('Missing required fields: message and signature are required')
    })

    it('should reject request with invalid message type', async () => {
      const response = await request(app)
        .post('/verify-signature')
        .send({
          message: 123,
          signature: testSignature
        })
        .expect(400)

      expect(response.body.error).toBe('Invalid input types: message and signature must be strings')
    })

    it('should reject request with invalid signature type', async () => {
      const response = await request(app)
        .post('/verify-signature')
        .send({
          message: testMessage,
          signature: 456
        })
        .expect(400)

      expect(response.body.error).toBe('Invalid input types: message and signature must be strings')
    })

    it('should reject invalid signature', async () => {
      const response = await request(app)
        .post('/verify-signature')
        .send({
          message: testMessage,
          signature: '0x' + '1'.repeat(130)
        })
        .expect(200)

      expect(response.body.isValid).toBe(false)
      expect(response.body.signer).toBe('0x0000000000000000000000000000000000000000')
    })

    it('should reject signature for different message', async () => {
      const response = await request(app)
        .post('/verify-signature')
        .send({
          message: 'Different message',
          signature: testSignature
        })
        .expect(200)

      expect(response.body.isValid).toBe(false)
      expect(response.body.signer).toBe('0x0000000000000000000000000000000000000000')
    })
  })

  describe('404 Handler', () => {
    it('should return 404 for non-existent endpoints', async () => {
      const response = await request(app)
        .get('/non-existent')
        .expect(404)

      expect(response.body.error).toBe('Not found')
      expect(response.body.message).toBe('The requested endpoint does not exist')
    })
  })
}) 