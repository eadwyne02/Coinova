import { useState, useEffect } from 'react'
import { getCoinList } from '../services/coinGecko'

export function useCoinList(limit?: number) {
  const [coins, setCoins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCoins = async () => {
    try {
      const data = await getCoinList()
      setCoins(data)
      setLoading(false)
    } catch (err) {
      console.error('fetch error', err)
    }
  }

  useEffect(() => {
    fetchCoins()

    const interval = setInterval(() => {
      fetchCoins()
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  return { coins: limit ? coins.slice(0, limit) : coins, loading }
}