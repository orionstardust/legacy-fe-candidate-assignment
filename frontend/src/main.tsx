import React from 'react'
import ReactDOM from 'react-dom/client'
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core'
import { EthereumWalletConnectors } from '@dynamic-labs/ethereum'
import App from './App'
import './index.css'

const dynamicEnvironmentId = import.meta.env.VITE_DYNAMIC_ENVIRONMENT_ID

if (!dynamicEnvironmentId) {
  console.error('VITE_DYNAMIC_ENVIRONMENT_ID is not set. Please check your .env file.')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DynamicContextProvider
      settings={{
        environmentId: dynamicEnvironmentId || 'REPLACE_WITH_YOUR_DYNAMIC_ENVIRONMENT_ID',
        walletConnectors: [EthereumWalletConnectors]
      }}
    >
      <App />
    </DynamicContextProvider>
  </React.StrictMode>
) 