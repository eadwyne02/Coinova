import { useState, useRef, useEffect } from "react"
import { useWallet } from "./useWallet"
import { useCoinList } from "./useCoinList"
import { usePortfolio } from "./usePortfolio"
import { useCurrency } from "./useCurrency"

export function usePortfolioSummary() {
  const { currency, changeCurrency } = useCurrency()
  const { balance } = useWallet()
  const { coins, loading: coinsLoading, error: coinsError, retry } = useCoinList(undefined, currency.code)
  const { coins: usdCoins } = useCoinList(undefined, "usd")
  const { portfolio } = usePortfolio()
  const usdtLive = coins.find((c) => c.id === "tether")
  const usdtPrice = usdtLive?.current_price ?? 1
  const usdtValue = balance * usdtPrice

  const btcPrice = coins.find((c) => c.id === "bitcoin")?.current_price ?? 1
  const btcUsd = usdCoins.find((c) => c.id === "bitcoin")?.current_price ?? 1
  const btcSelected = coins.find((c) => c.id === "bitcoin")?.current_price ?? 1
  const exchangeRate = btcSelected / btcUsd
  const holdings = portfolio
    .filter((item) => item.coinId !== "tether")
    .map((item) => {
      const live = coins.find((c) => c.id === item.coinId)
      const currentPrice = live?.current_price ?? item.buyPrice
      const currentValue = item.amount * currentPrice
      const costBasis = item.amount * item.buyPrice
      const pnlItem = currentValue - costBasis
      const pnlPctItem = costBasis > 0 ? (pnlItem / costBasis) * 100 : 0
      return { ...item, currentPrice, currentValue, pnl: pnlItem, pnlPct: pnlPctItem }
    })
  const totalValue = holdings.reduce((acc, item) => acc + item.currentValue, 0) + usdtValue
  const totalInBtc = totalValue / btcPrice
  const pnl = portfolio
    .filter((item) => item.coinId !== "tether")
    .reduce((acc, item) => {
      const live = usdCoins.find((c) => c.id === item.coinId)
      const currentPrice = live?.current_price ?? item.buyPrice
      return acc + item.amount * currentPrice - item.amount * item.buyPrice
    }, 0)

  const costBasis = portfolio
    .filter((i) => i.coinId !== "tether")
    .reduce((acc, i) => acc + i.amount * i.buyPrice, 0)

  const pnlPct = costBasis > 0 ? (pnl / costBasis) * 100 : 0
  const pnlConverted = pnl * exchangeRate
  const [switching, setSwitching] = useState(false)
  const prevCurrency = useRef(currency.code)
  useEffect(() => {
    if (prevCurrency.current !== currency.code) {
      setSwitching(true)
      prevCurrency.current = currency.code
      const timer = setTimeout(() => setSwitching(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [currency.code])

  return {
    holdings,
    balance,
    usdtValue,
    totalValue,
    totalInBtc,
    pnl,
    pnlPct,
    pnlConverted,
    costBasis,

    currency,
    changeCurrency,
    switching,
    exchangeRate,

    coins,
    coinsLoading,
    coinsError,
    retry,
  }
}