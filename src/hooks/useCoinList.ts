import { useState, useEffect, useRef } from 'react'
import { getCoinList } from '../services/coinGecko'

export function useCoinList(limit?: number , vsCurrency = 'usd') {
  const [coins, setCoins] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const fetchCoins = async () => {
    setError(null)

    timeoutRef.current = setTimeout(() => {
      setLoading(false)
      setError('Request timed out. Check your connection and try again.')
    }, 25000)

    try {
      const data = await getCoinList(vsCurrency)
      clearTimeout(timeoutRef.current)
      setCoins(data)
      setLoading(false)
    } catch (err) {
      clearTimeout(timeoutRef.current)
      setLoading(false)
      setError('Failed to fetch prices. Pull down to retry.')
      console.error('fetch error', err)
    }
  }

 useEffect(() => {
    fetchCoins()
    const interval = setInterval(fetchCoins, 30000)
    return () => {
      clearInterval(interval)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [vsCurrency])

  return { coins: limit ? coins.slice(0, limit) : coins, loading, error, retry: fetchCoins }
}