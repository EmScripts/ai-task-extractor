import { useEffect, useState } from 'react'

export default function TypingText({ text, speed = 40, className = '' }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    let idx = 0
    setValue('')

    const interval = setInterval(() => {
      setValue((prev) => prev + text[idx])
      idx += 1
      if (idx >= text.length) {
        clearInterval(interval)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return <p className={className}>{value}</p>
}
