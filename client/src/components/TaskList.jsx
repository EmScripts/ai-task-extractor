export default function TaskList({ tasks }) {
  return (
    <div className="mt-6 space-y-3">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="flex items-center justify-between gap-3 rounded-xl bg-white/10 px-4 py-3 text-lg text-white/90 transition hover:bg-white/15"
        >
          <span className="flex-1">{task}</span>
          <span className="text-sm text-white/60">#{index + 1}</span>
        </div>
      ))}
    </div>
  )
}
