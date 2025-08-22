import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from '../Header'

// Mock the Dynamic.xyz context
vi.mock('@dynamic-labs/react-sdk', () => ({
  useDynamicContext: () => ({
    isAuthenticated: false,
    user: null,
    primaryWallet: null
  }),
  DynamicConnectButton: () => <button data-testid="connect-button">Connect Wallet</button>
}))

describe('Header', () => {
  it('renders the app title', () => {
    render(<Header />)
    expect(screen.getByText('Web3 Message Signer & Verifier')).toBeInTheDocument()
  })

  it('renders the connect button', () => {
    render(<Header />)
    expect(screen.getByTestId('connect-button')).toBeInTheDocument()
  })

  it('does not show wallet address when not authenticated', () => {
    render(<Header />)
    expect(screen.queryByText(/Connected:/)).not.toBeInTheDocument()
  })
}) 