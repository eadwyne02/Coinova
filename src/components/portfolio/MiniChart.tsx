import { useEffect, useRef, useState } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'

interface Props {
  data: number[]
  color: string
  width?: number
  height?: number
}

export default function MiniChart({ data, color }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 55, height: 12 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width, height })
    })

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const strokeWidth = size.width < 50 ? 1 : size.width < 80 ? 1.5 : 2

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Sparklines data={data} width={size.width} height={size.height}>
        <SparklinesLine
          color={color}
          style={{ fill: 'none', strokeWidth }}
        />
      </Sparklines>
    </div>
  )
}