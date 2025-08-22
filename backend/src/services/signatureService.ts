import { ethers } from 'ethers'

export interface VerificationResult {
  isValid: boolean
  signer: string
  originalMessage: string
}

export const verifySignature = async (
  message: string,
  signature: string
): Promise<VerificationResult> => {
  try {
    // Recover the signer address from the signature
    const recoveredAddress = ethers.verifyMessage(message, signature)
    
    // Check if the recovered address is valid
    if (!ethers.isAddress(recoveredAddress)) {
      return {
        isValid: false,
        signer: '0x0000000000000000000000000000000000000000',
        originalMessage: message
      }
    }

    return {
      isValid: true,
      signer: recoveredAddress,
      originalMessage: message
    }
  } catch (error) {
    console.error('Error in signature verification:', error)
    
    // Return invalid result if verification fails
    return {
      isValid: false,
      signer: '0x0000000000000000000000000000000000000000',
      originalMessage: message
    }
  }
}

// Helper function to validate Ethereum address format
export const isValidEthereumAddress = (address: string): boolean => {
  return ethers.isAddress(address)
}

// Helper function to validate signature format
export const isValidSignature = (signature: string): boolean => {
  try {
    // Check if signature is a valid hex string
    if (!/^0x[a-fA-F0-9]{130}$/.test(signature)) {
      return false
    }
    
    // Parse the signature to ensure it's valid
    ethers.Signature.from(signature)
    return true
  } catch {
    return false
  }
} 