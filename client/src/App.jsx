import { useMemo, useState } from 'react'
import axios from 'axios'
import TypingText from './components/TypingText.jsx'
import TaskList from './components/TaskList.jsx'

const WEBHOOK_URL =
  'https://emscripts.app.n8n.cloud/webhook/ac754646-0ff5-4f9e-9474-167238eb01a4'

export default function App() {
  const [text, setText] = useState('')
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const hasTasks = useMemo(() => tasks.length > 0, [tasks])

  const handleExtract = async () => {
    if (!text.trim()) {
      setError('Please paste or type your notes above.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.post(
        WEBHOOK_URL,
        { notes: text },
        { headers: { 'Content-Type': 'application/json' } },
      )

      setTasks(response.data.tasks ?? [])
    } catch (err) {
      console.error(err)
      setError('Unable to reach the task extractor. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 py-10 text-white">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center justify-center">
        <div className="w-full rounded-2xl border border-white/15 bg-white/10 p-8 shadow-xl backdrop-blur-lg">
          <header className="mb-8 text-center">
            <h1 className="text-5xl font-semibold tracking-tight">AI Task Extractor</h1>
            <p className="mt-4 text-lg text-white/70">
              <TypingText
                text="Paste your meeting notes and let AI extract actionable tasks."
                speed={35}
              />
            </p>
          </header>

          <div className="space-y-4">
            <textarea
              className="h-40 w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-lg text-white placeholder:text-white/40 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter meeting notes, emails, or action items..."
              disabled={loading}
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-500 px-6 py-3 text-lg font-bold text-white shadow-lg shadow-purple-500/25 transition hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400/60 disabled:cursor-not-allowed disabled:opacity-60"
                onClick={handleExtract}
                disabled={loading}
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                    Extracting...
                  </span>
                ) : (
                  'Extract Tasks'
                )}
              </button>

              {hasTasks && (
                <span className="text-sm text-white/60">
                  {tasks.length} task{tasks.length === 1 ? '' : 's'} found
                </span>
              )}
            </div>

            {error && (
              <div className="rounded-xl bg-red-500/20 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}

            {hasTasks && <TaskList tasks={tasks} />}
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-white/40">
          Built for n8n webhook demos. Customize the workflow to adjust task extraction.
        </footer>
      </div>
    </div>
  )
}
