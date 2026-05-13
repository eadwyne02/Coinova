export interface PortfolioItem{
    coinId: string;
    symbol: string;
    name: string;
    image: string;
    amount: number;
    buyPrice: number;
}

const KEY = 'crypto_portfolio'
export function getPortfolio():PortfolioItem[]{
    const data = localStorage.getItem(KEY)
    return data ? JSON.parse(data):[]
}
export function buyCoin(coin: PortfolioItem) {
  const portfolio = getPortfolio()
  const existing = portfolio.find(p => p.coinId === coin.coinId)

  if (existing) {
    existing.amount += coin.amount
    existing.buyPrice = coin.buyPrice

    // remove if amount hits 0
    if (existing.amount <= 0) {
      const index = portfolio.findIndex(p => p.coinId === coin.coinId)
      portfolio.splice(index, 1)
    }
  } else {
    portfolio.push(coin)
  }

  localStorage.setItem(KEY, JSON.stringify(portfolio))
}

export function sellCoin(coinId: string, amount: number) {
  const portfolio = getPortfolio()
  const index = portfolio.findIndex(p => p.coinId === coinId)

  if (index === -1) return

  portfolio[index].amount -= amount

  if (portfolio[index].amount <= 0) {
    portfolio.splice(index, 1)
  }
  localStorage.setItem(KEY, JSON.stringify(portfolio))
}