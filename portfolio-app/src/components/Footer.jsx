export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <span>© {new Date().getFullYear()} Omkar Badadale</span>
        <span>Built with React and Motion. The clusters at the top are real k-means.</span>
      </div>
    </footer>
  )
}
