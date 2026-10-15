import useCountUp from '../hooks/useCountUp'

export default function StatItem({ value, suffix, label }) {
  const [ref, display] = useCountUp(value, { suffix, duration: 1400 })
  return (
    <div className="fact">
      <dd className="num" ref={ref}>{display}</dd>
      <dt>{label}</dt>
    </div>
  )
}
