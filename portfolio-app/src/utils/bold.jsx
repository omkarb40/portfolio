// Turns "**bold**" markers in content strings into real <b> elements
// so copy in data/portfolio.js can carry simple emphasis without HTML.
export default function Bold({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <b key={i}>{part.slice(2, -2)}</b>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  )
}
