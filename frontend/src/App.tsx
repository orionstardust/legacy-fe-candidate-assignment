import React from 'react'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'
import Header from './components/Header'
import MessageSigner from './components/MessageSigner'
import MessageVerifier from './components/MessageVerifier'
import MessageHistory from './components/MessageHistory'
import LoginPrompt from './components/LoginPrompt'

function App() {
  const { isAuthenticated, user } = useDynamicContext()

  if (!isAuthenticated) {
    return (
      <div className="container">
        <Header />
        <div className="flex justify-center items-center min-h-[80vh]">
          <LoginPrompt />
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <Header />
      <main className="space-y-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <MessageSigner />
          <MessageVerifier />
        </div>
        <MessageHistory />
      </main>
    </div>
  )
}

export default App 