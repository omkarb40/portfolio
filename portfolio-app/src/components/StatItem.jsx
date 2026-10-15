import useCountUp from '../hooks/useCountUp'

export default function StatItem({ value, suffix, label }) {
  const [ref, display] = useCountUp(value, { suffix })
  return (
    <div className="stat">
      <div className="num" ref={ref}>{display}</div>
      <div className="label">{label}</div>
    </div>
  )
}
