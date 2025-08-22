import React from 'react'
import { DynamicConnectButton } from '@dynamic-labs/sdk-react-core'

const LoginPrompt: React.FC = () => {
  return (
    <div className="card max-w-md mx-auto text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Welcome to Web3 Message Signer</h2>
        <p className="text-gray-600 mb-6">
          Connect your wallet to start signing and verifying messages on the blockchain.
        </p>
      </div>
      
      <DynamicConnectButton />
      
      <div className="mt-6 text-sm text-gray-500">
        <p>This app uses Dynamic.xyz for secure wallet authentication</p>
      </div>
    </div>
  )
}

export default LoginPrompt 