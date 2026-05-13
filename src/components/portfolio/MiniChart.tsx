import { Sparklines, SparklinesLine } from 'react-sparklines'

interface Props {
  data: number[]
  color: string
  width?: number
  height?: number
}

export default function MiniChart({ data, color, width = 72, height = 36 }: Props) {
  return (
    <Sparklines data={data} width={width} height={height}>
      <SparklinesLine
        color={color}
        style={{ fill: 'none', strokeWidth: 1.5 }}
      />
    </Sparklines>
  )
}