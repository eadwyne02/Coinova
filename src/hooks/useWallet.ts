import { useState, useEffect } from 'react'
import { getBalance, deductBalance } from '../store/walletStore'

export function useWallet() {
  const [balance, setBalance] = useState(0)

  useEffect(() => {
    setBalance(getBalance())
  }, [])
  const spend = (amount: number): boolean => {
    const success = deductBalance(amount)
    if (success) setBalance(getBalance())
    return success
  }
  return { balance, spend }
}