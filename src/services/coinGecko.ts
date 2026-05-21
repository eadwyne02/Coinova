import axios from 'axios'

const BASE = 'https://api.coingecko.com/api/v3'

export async function getCoinList(vsCurrency = 'usd') {
  const res = await axios.get(
    `${BASE}/coins/markets?vs_currency=${vsCurrency}&ids=tether,bitcoin,ethereum,ripple,solana,binancecoin,cardano,dogecoin,polkadot&per_page=20&page=1&sparkline=true&price_change_percentage=24h&order=market_cap_desc`
  )
  return res.data
}