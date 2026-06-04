import React, { useState } from 'react'
import type { Priority } from '@/types'

interface Props {
  onAdd: (text: string, priority: Priority) => void
}

export function AddTodoForm({ onAdd }: Props) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    onAdd(text, priority)
    setText('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-800 placeholder-gray-400"
      />
      <select
        value={priority}
        onChange={e => setPriority(e.target.value as Priority)}
        className="px-3 py-2 rounded-xl border border-gray-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-700 text-sm"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        className="px-5 py-2 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl shadow transition-colors"
      >
        Add
      </button>
    </form>
  )
}
