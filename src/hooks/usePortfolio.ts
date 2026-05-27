import { useState, useEffect } from "react";
import { getPortfolio, buyCoin } from "../store/portfolioStore";
import type { PortfolioItem } from "../store/portfolioStore";

export function usePortfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([])
  useEffect(() => {
    setPortfolio(getPortfolio())
  }, [])
  const buy = (coin: PortfolioItem) => {
    buyCoin(coin)
    setPortfolio(getPortfolio())
  }
  return { portfolio, buy }
}