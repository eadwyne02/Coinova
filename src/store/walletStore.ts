import { buyCoin } from "./portfolioStore"

const KEY = 'crypto_wallet'
const INITIALIZED_KEY = 'crypto_wallet_initialized'

export function getBalance(): number {
  const data = localStorage.getItem(KEY)
  
  if (!data) {
    localStorage.setItem(KEY, '1000')
    buyCoin({
      coinId: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      amount: 1000,
      buyPrice: 1, 
    })

    return 1000
  }
  
  return parseFloat(data)
}

export function deductBalance(amount: number): boolean {
  const current = getBalance()
  if (current < amount) return false
  localStorage.setItem(KEY, (current - amount).toString())
  
  buyCoin({
    coinId: 'tether',
    symbol: 'usdt',
    name: 'Tether',
    image: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
    amount: -amount,
    buyPrice: 1,
  })

  return true
}