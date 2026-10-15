import { useEffect, useRef, useState } from 'react'

// Rotates through a list of role titles with a fade transition.
//
// The vanilla-JS version of this had a real bug: setInterval fired a new
// role change while the previous setTimeout-based fade-out was still
// pending, and when the browser throttled a background tab both callbacks
// caught up at once, leaving stale characters on screen ("Data Engineerilder").
// Fixed here by: (1) always clearing any pending timeout before scheduling
// a new one, (2) pausing the rotation entirely when the tab is hidden via
// the Page Visibility API, and (3) driving the fade with React state instead
// of manually toggling style.opacity, so there's exactly one source of truth.
export default function useRoleRotator(roles, intervalMs = 2600, fadeMs = 250) {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    function clearTimers() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }

    function step() {
      setVisible(false)
      timeoutRef.current = setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length)
        setVisible(true)
      }, fadeMs)
    }

    function start() {
      clearTimers()
      intervalRef.current = setInterval(step, intervalMs)
    }

    function handleVisibility() {
      if (document.hidden) {
        clearTimers()
      } else {
        start()
      }
    }

    start()
    document.addEventListener('visibilitychange', handleVisibility)
    return () => {
      clearTimers()
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [roles, intervalMs, fadeMs])

  return [roles[index], visible]
}
