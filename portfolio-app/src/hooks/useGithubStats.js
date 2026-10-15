import { useEffect, useState } from 'react'

// Live-fetches star count + last-updated date for a GitHub repo via the
// public unauthenticated REST API (client-side, no key needed). Fails soft:
// if the API is rate-limited or offline, the component just doesn't show
// the badge instead of breaking the page.
const cache = new Map()

export default function useGithubStats(repoUrl) {
  const [data, setData] = useState(() => cache.get(repoUrl) || null)

  useEffect(() => {
    if (!repoUrl || cache.has(repoUrl)) return
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+?)\/?$/)
    if (!match) return
    const [, owner, repo] = match
    let cancelled = false

    fetch(`https://api.github.com/repos/${owner}/${repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (cancelled || !json) return
        const result = {
          stars: json.stargazers_count,
          updated: json.pushed_at,
        }
        cache.set(repoUrl, result)
        setData(result)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [repoUrl])

  return data
}
