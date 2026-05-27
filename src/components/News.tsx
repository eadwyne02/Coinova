import BtcImage from '../assets/btc.png'
import BtcImage1 from '../assets/btc-1.png'
import BtcImage2 from '../assets/btc-2.png'
import Xrp from '../assets/xrp.png'

const articles = [
  {
    title: 'Bitcoin Analyst Explains Why Price is Rallying Again',
    time: '5 hours',
    source: 'Yahoo Finance',
    tag: 'BTC',
    dotColor: '#f19835',
    image: BtcImage,
  },
  {
    title: 'Number of Wholecoiners Drop as Whales Dump Bitcoin',
    time: '1 day ago',
    source: 'CNBC',
    tag: 'BTC',
    dotColor: '#f19835',
    image: BtcImage1,
  },
  {
    title: 'Ripple is Selling a Part of its Stake in MoneyGram for the First Time',
    time: 'July 10',
    source: 'Yahoo Finance',
    tag: 'BTC',
    dotColor: '#f19835',
    image: BtcImage2,
  },
  {
    title: "XRP's Price Up 14% as Entire Crypto Market Bounces Back from Crash",
    time: '1 day ago',
    source: 'PriceChange',
    tag: 'XRP',
    dotColor: 'rgba(255,255,255,0.3)',
    image: Xrp,
  },
]

export default function NewsSection() {
  return (
    <div className="px-4 py-6">
      <div>
        {articles.map((article, i) => (
          <div key={i} className="flex items-center gap-3 py-3.5 border-b border-white/[0.06] last:border-none">
            <div className="flex-1 flex flex-col gap-2">
              <p className="text-[13px] md:text-[14px] font-medium text-white/85 leading-snug">
                {article.title}
              </p>
              <div className="flex items-center gap-2.5">
                <span className="text-[12px] font-semibold text-[#4a9fd4] flex gap-1.5">
                <span className="text-[12px] text-white/35">{article.time}</span>
                  {article.source}
                </span>
                <div className="flex items-center gap-1.5">
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: article.dotColor }}
                  />
                  <span className="text-[11px] md:text-[12px] text-white/45">{article.tag}</span>
                </div>
              </div>
            </div>
            <img
              src={article.image}
              alt={article.title}
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0"
            />
          </div>
        ))}
      </div>

    </div>
  )
}