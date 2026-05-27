import { useNavigate, useLocation } from "react-router-dom"
import { navItems } from "./navigationItems"

export default function BottomNav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isActive = (path: string) => pathname === path
  return (
    <div className="bg-[#1a1f27] border-t border-white/[0.06] lg:border-t-0 lg:border-r lg:h-full px-2 py-1">
      <div className="flex lg:flex-col lg:mt-35 lg:w-60 justify-around items-center">
        {navItems.map(({ path, label, active, inactive }) => {
          const active_ = isActive(path)
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl relative transition-colors"
            >
              {active_ && <span className="absolute inset-0 rounded-xl bg-[#00a9f9]/[0.08]" />}
              {active_ ? active : inactive}
              <span className={`text-[10px] md:text-[13px] font-medium transition-colors ${active_ ? 'text-[#00a9f9]' : 'text-white/30'}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}