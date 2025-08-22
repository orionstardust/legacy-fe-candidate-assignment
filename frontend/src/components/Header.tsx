import React from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import { DynamicConnectButton } from '@dynamic-labs/sdk-react-core'

const Header: React.FC = () => {
  const { isAuthenticated, primaryWallet } = useDynamicContext()

  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Web3 Message Signer & Verifier
            </h1>
            {isAuthenticated && primaryWallet && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Connected:</span>
                <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                  {primaryWallet.address.slice(0, 6)}...{primaryWallet.address.slice(-4)}
                </span>
              </div>
            )}
          </div>
          <DynamicConnectButton />
        </div>
      </div>
    </header>
  )
}

export default Header 