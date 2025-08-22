import { verifySignature, isValidEthereumAddress, isValidSignature } from '../services/signatureService'
import { ethers } from 'ethers'

describe('Signature Service', () => {
  let testWallet: ethers.Wallet
  let testMessage: string
  let testSignature: string

  beforeAll(async () => {
    // Create a test wallet
    testWallet = ethers.Wallet.createRandom()
    testMessage = 'Hello, Web3!'
    testSignature = await testWallet.signMessage(testMessage)
  })

  describe('verifySignature', () => {
    it('should verify a valid signature correctly', async () => {
      const result = await verifySignature(testMessage, testSignature)
      
      expect(result.isValid).toBe(true)
      expect(result.signer.toLowerCase()).toBe(testWallet.address.toLowerCase())
      expect(result.originalMessage).toBe(testMessage)
    })

    it('should reject an invalid signature', async () => {
      const invalidSignature = '0x' + '1'.repeat(130)
      const result = await verifySignature(testMessage, invalidSignature)
      
      expect(result.isValid).toBe(false)
      expect(result.signer).toBe('0x0000000000000000000000000000000000000000')
    })

    it('should reject a signature for a different message', async () => {
      const differentMessage = 'Different message'
      const result = await verifySignature(differentMessage, testSignature)
      
      expect(result.isValid).toBe(false)
      expect(result.signer).toBe('0x0000000000000000000000000000000000000000')
    })

    it('should handle empty message', async () => {
      const emptyMessage = ''
      const result = await verifySignature(emptyMessage, testSignature)
      
      expect(result.isValid).toBe(false)
    })

    it('should handle malformed signature', async () => {
      const malformedSignature = 'invalid-signature'
      const result = await verifySignature(testMessage, malformedSignature)
      
      expect(result.isValid).toBe(false)
    })
  })

  describe('isValidEthereumAddress', () => {
    it('should validate correct Ethereum addresses', () => {
      const validAddress = '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
      expect(isValidEthereumAddress(validAddress)).toBe(true)
    })

    it('should reject invalid Ethereum addresses', () => {
      const invalidAddresses = [
        '0xinvalid',
        '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b',
        '742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
        ''
      ]
      
      invalidAddresses.forEach(address => {
        expect(isValidEthereumAddress(address)).toBe(false)
      })
    })
  })

  describe('isValidSignature', () => {
    it('should validate correct signatures', () => {
      expect(isValidSignature(testSignature)).toBe(true)
    })

    it('should reject invalid signatures', () => {
      const invalidSignatures = [
        '0x' + '1'.repeat(129), // Too short
        '0x' + '1'.repeat(131), // Too long
        '0xinvalid',
        'invalid-signature',
        ''
      ]
      
      invalidSignatures.forEach(signature => {
        expect(isValidSignature(signature)).toBe(false)
      })
    })
  })
}) 