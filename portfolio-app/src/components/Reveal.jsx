import useReveal from '../hooks/useReveal'

// Generic fade-up-on-scroll wrapper so section components don't each
// have to wire up their own IntersectionObserver.
export default function Reveal({ as: Tag = 'div', className = '', style, children }) {
  const [ref, visible] = useReveal()
  return (
    <Tag ref={ref} className={`${className} ${visible ? 'in' : ''}`} style={style} data-reveal>
      {children}
    </Tag>
  )
}
