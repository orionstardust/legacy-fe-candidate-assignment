import React from 'react'

interface DynamicWalletProviderProps {
  children: React.ReactNode
}

const DynamicWalletProvider: React.FC<DynamicWalletProviderProps> = ({ children }) => {
  // TODO: Replace this with actual Dynamic.xyz integration
  // For now, this is a placeholder that allows the app to run
  return <>{children}</>
}

export default DynamicWalletProvider 