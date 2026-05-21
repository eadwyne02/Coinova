import { useState, useMemo } from "react"
import { useNavigate } from "react-router-dom"
import { useCoinList } from "../hooks/useCoinList"
import { usePortfolio } from "../hooks/usePortfolio"
import { useWallet } from "../hooks/useWallet"

const NETWORKS = [
  {
    id: "erc20",
    name: "Ethereum (ERC-20)",
    description: "Send via the Ethereum network",
    fee: "~$2.50",
    time: "~2 mins",
    badge: "Popular",
    badgeColor: "text-[#627eea] bg-[#627eea]/10",
  },
  {
    id: "bep20",
    name: "BNB Smart Chain (BEP-20)",
    description: "Send via Binance Smart Chain",
    fee: "~$0.10",
    time: "~30 secs",
    badge: "Cheapest",
    badgeColor: "text-[#f59e0b] bg-[#f59e0b]/10",
  },
  {
    id: "trc20",
    name: "Tron (TRC-20)",
    description: "Send via the Tron network",
    fee: "~$1.00",
    time: "~1 min",
    badge: "Fast",
    badgeColor: "text-[#22c55e] bg-[#22c55e]/10",
  },
  {
    id: "bitcoin",
    name: "Bitcoin Network",
    description: "Send via the Bitcoin network",
    fee: "~$5.00",
    time: "~10 mins",
    badge: "Secure",
    badgeColor: "text-[#f7931a] bg-[#f7931a]/10",
  },
]

interface Asset {
  coinId: string
  symbol: string
  name: string
  image: string
  amount: number
  value: number
  currentPrice: number
}

export default function SendCrypto() {
  const navigate = useNavigate()
  const { coins } = useCoinList()
  const { portfolio } = usePortfolio()
  const { balance } = useWallet()

  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [selectedNetwork, setSelectedNetwork] = useState(NETWORKS[0])
  const [assetDropdown, setAssetDropdown] = useState(false)
  const [networkDropdown, setNetworkDropdown] = useState(false)
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [success, setSuccess] = useState(false)

  const ownedAssets: Asset[] = useMemo(() => {
    const usdtLive = coins.find(c => c.id === 'tether')
    const usdtPrice = usdtLive?.current_price ?? 1

    const usdtAsset: Asset = {
      coinId: 'tether',
      symbol: 'usdt',
      name: 'Tether',
      image: 'https://assets.coingecko.com/coins/images/325/small/Tether.png',
      amount: balance,
      value: balance * usdtPrice,
      currentPrice: usdtPrice,
    }

    const coinItems = portfolio
      .filter(item => item.coinId !== 'tether')
      .map(item => {
        const live = coins.find(c => c.id === item.coinId)
        const currentPrice = live?.current_price ?? item.buyPrice
        return {
          coinId: item.coinId,
          symbol: item.symbol,
          name: item.name,
          image: item.image,
          amount: item.amount,
          value: item.amount * currentPrice,
          currentPrice,
        }
      })

    return [usdtAsset, ...coinItems].sort((a, b) => b.value - a.value)
  }, [portfolio, coins, balance])

  const sendAmount = parseFloat(amount || "0")
  const usdValue = sendAmount * (selectedAsset?.currentPrice ?? 0)
  const insufficient = sendAmount > (selectedAsset?.amount ?? 0)
  const isValidAddress = address.length >= 26
  const canSend = selectedAsset && sendAmount > 0 && !insufficient && isValidAddress

  const fmt = (n: number) =>
    n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  const handleSend = () => {
    if (!canSend) return
    setSuccess(true)
    setTimeout(() => {
      setSuccess(false)
      navigate(-1)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#141720] pb-28">

      {/* header */}
      <div className="bg-[#121621] px-4 pt-4 pb-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-[6px] rounded-full bg-white/[0.06] hover:bg-white/[0.12] transition-all"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>
          </button>
          <div>
            <p className="text-white font-jakarta font-bold text-lg leading-tight">Send Crypto</p>
            <p className="text-white/40 text-[11px] mt-0.5">Transfer to any wallet address</p>
          </div>
        </div>
      </div>
      <div className="px-4 mt-5 flex flex-col gap-4">
        <div>
          <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-2">Asset</p>
          <div className="relative">
            <button
              onClick={() => { setAssetDropdown(!assetDropdown); setNetworkDropdown(false) }}
              className="w-full bg-[#1a1f2e] border border-white/[0.07] rounded-2xl px-4 py-3.5 flex items-center justify-between hover:border-[#6b5cf7]/30 transition-all"
            >
              {selectedAsset ? (
                <>
                  <div className="flex items-center gap-3">
                    <img src={selectedAsset.image} alt={selectedAsset.name} className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
                    <div className="text-left">
                      <p className="text-white font-semibold text-sm">{selectedAsset.name}</p>
                      <p className="text-white/38 text-[10px] mt-0.5">
                        Balance: {selectedAsset.amount.toFixed(6)} {selectedAsset.symbol.toUpperCase()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-white/50 text-xs">≈ ${fmt(selectedAsset.value)}</p>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-white/40 text-sm">Select asset to send</p>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </>
              )}
            </button>

            {assetDropdown && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-[#181e2a] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl max-h-52 overflow-y-auto">
                {ownedAssets.map((asset, i) => (
                  <button key={asset.coinId} onClick={() => { setSelectedAsset(asset); setAssetDropdown(false); setAmount("") }} className={`w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.04] transition-all
                      ${i !== ownedAssets.length - 1 ? "border-b border-white/[0.05]" : ""}
                      ${selectedAsset?.coinId === asset.coinId ? "bg-white/[0.03]" : ""}`}>
                    <div className="flex items-center gap-3">
                      <img src={asset.image} alt={asset.name} className="w-8 h-8 rounded-full flex-shrink-0" />
                      <div className="text-left">
                        <p className="text-white text-sm font-semibold">{asset.symbol.toUpperCase()}</p>
                        <p className="text-white/38 text-[10px]">{asset.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60 text-xs font-medium">{asset.amount.toFixed(6)}</p>
                      <p className="text-white/30 text-[10px]">${fmt(asset.value)}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div>
          <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-2">Recipient Address</p>
          <div className={`bg-[#1a1f2e] border rounded-2xl px-4 py-3.5 flex items-center gap-3 transition-all
            ${address && !isValidAddress ? 'border-red-500/40' : address && isValidAddress ? 'border-green-500/30' : 'border-white/[0.07]'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <rect x="2" y="7" width="20" height="14" rx="2"/>
              <path d="M16 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
              <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
            </svg>
            <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Paste wallet address here" className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-white/25"/>
            {address && isValidAddress && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </div>
          {address && !isValidAddress && (
            <p className="text-red-400 text-[11px] mt-1.5 px-1">Invalid wallet address</p>
          )}
        </div>
        <div>
          <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-2">Network</p>
          <div className="relative">
            <button onClick={() => { setNetworkDropdown(!networkDropdown); setAssetDropdown(false) }} className="w-full bg-[#1a1f2e] border border-white/[0.07] rounded-2xl px-4 py-3.5 flex items-center justify-between hover:border-[#6b5cf7]/30 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#6b5cf7]/10 border border-[#6b5cf7]/15 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b5cf7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M2 12h20"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-semibold text-sm">{selectedNetwork.name}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${selectedNetwork.badgeColor}`}>
                      {selectedNetwork.badge}
                    </span>
                  </div>
                  <p className="text-white/38 text-[10px] mt-0.5">Fee: {selectedNetwork.fee} · {selectedNetwork.time}</p>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
            {networkDropdown && (
              <div className="absolute top-full left-0 right-0 z-50 mt-1.5 bg-[#181e2a] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
                {NETWORKS.map((net, i) => (
                  <button key={net.id} onClick={() => { setSelectedNetwork(net); setNetworkDropdown(false) }} className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-white/[0.04] transition-all
                      ${i !== NETWORKS.length - 1 ? "border-b border-white/[0.05]" : ""}
                      ${selectedNetwork.id === net.id ? "bg-white/[0.03]" : ""}`}>
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-white text-sm font-semibold">{net.name}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${net.badgeColor}`}>
                          {net.badge}
                        </span>
                      </div>
                      <p className="text-white/38 text-[10px]">{net.description}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-white/30"><span className="text-white/50 font-medium">Fee:</span> {net.fee}</span>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="text-[10px] text-white/30"><span className="text-white/50 font-medium">Time:</span> {net.time}</span>
                      </div>
                    </div>
                    {selectedNetwork.id === net.id && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {selectedAsset && (
          <div>
            <p className="text-white/40 text-[11px] font-semibold tracking-widest uppercase mb-2">Amount</p>
            <div className="bg-[#1a1f2e] border border-white/[0.07] rounded-2xl px-4 py-4">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="flex-1 bg-transparent text-white text-3xl font-jakarta font-bold outline-none placeholder:text-white/20 tracking-tight"
                />
                <span className="text-white/40 text-sm font-semibold flex-shrink-0">
                  {selectedAsset.symbol.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-white/30 text-[11px]">≈ ${fmt(usdValue)} USD</p>
                <button
                  onClick={() => setAmount(selectedAsset.amount.toFixed(6))}
                  className="text-[11px] text-[#6b5cf7] font-medium"
                >
                  Max: {selectedAsset.amount.toFixed(6)}
                </button>
              </div>
            </div>
            {insufficient && (
              <p className="text-red-400 text-xs mt-1.5 px-1">Insufficient balance</p>
            )}
          </div>
        )}

        {/* summary */}
        {selectedAsset && sendAmount > 0 && isValidAddress && (
          <div className="bg-[#1a1f2e] border border-white/[0.06] rounded-2xl px-4 py-4 flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-white/38">You send</span>
              <span className="text-[12px] font-semibold text-white">{amount} {selectedAsset.symbol.toUpperCase()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-white/38">Network fee</span>
              <span className="text-[12px] font-semibold text-white/40">{selectedNetwork.fee}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-white/38">Estimated time</span>
              <span className="text-[12px] font-semibold text-white/60">{selectedNetwork.time}</span>
            </div>
            <div className="h-px bg-white/[0.05]" />
            <div className="flex justify-between items-center">
              <span className="text-[12px] text-white/50 font-medium">USD value</span>
              <span className="text-[15px] font-jakarta font-bold text-white">${fmt(usdValue)}</span>
            </div>
            <div className="bg-white/[0.03] rounded-xl px-3 py-2.5">
              <p className="text-[10px] text-white/30 mb-1 uppercase tracking-widest">To address</p>
              <p className="text-white/60 text-[11px] font-mono break-all">{address}</p>
            </div>
          </div>
        )}
        <div className="flex items-start gap-3 bg-[#f59e0b]/[0.06] border border-[#f59e0b]/[0.15] rounded-xl px-3.5 py-3">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          <p className="text-white/35 text-[11px] leading-relaxed">
            Double-check the recipient address and network before sending. Crypto transactions are irreversible and cannot be undone once confirmed.
          </p>
        </div>
        <div className="flex items-start gap-3 bg-white/[0.02] border border-white/[0.05] rounded-xl px-4 py-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 flex-shrink-0">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          <p className="text-white/25 text-[11px] leading-relaxed">
            All transactions are encrypted and secured. Ensure you are sending to a trusted address on the correct network.
          </p>
        </div>

        {/* send button */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          className="w-full py-4 rounded-2xl bg-[#6b5cf7] hover:bg-[#5a4de6] active:scale-[0.99] transition-all text-white font-jakarta font-bold text-[15px] flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {success ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Sent Successfully!
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
              {canSend
                ? `Send ${amount} ${selectedAsset!.symbol.toUpperCase()}`
                : "Fill in all details"}
            </>
          )}
        </button>

      </div>
    </div>
  )
}