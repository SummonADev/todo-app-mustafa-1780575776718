import React, { useState } from 'react'
import type { Todo } from '@/types'

interface Props {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const priorityBadge: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
}

export function TodoItem({ todo, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  function handleEdit() {
    setEditing(true)
    setEditText(todo.text)
  }

  function handleSave() {
    onEdit(todo.id, editText)
    setEditing(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSave()
    if (e.key === 'Escape') setEditing(false)
  }

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-sm transition-all ${
        todo.completed
          ? 'bg-gray-50 border-gray-100 opacity-60'
          : 'bg-white border-gray-200'
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`w-6 h-6 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-colors ${
          todo.completed
            ? 'bg-violet-500 border-violet-500 text-white'
            : 'border-gray-300 hover:border-violet-400'
        }`}
        aria-label="Toggle complete"
      >
        {todo.completed && (
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2 6l3 3 5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      <div className="flex-1 min-w-0">
        {editing ? (
          <input
            autoFocus
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-0.5 rounded border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-gray-800"
          />
        ) : (
          <span
            className={`block truncate text-sm ${
              todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <span
        className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${
          priorityBadge[todo.priority]
        }`}
      >
        {todo.priority}
      </span>

      {!editing && (
        <button
          onClick={handleEdit}
          className="p-1 text-gray-400 hover:text-violet-500 transition-colors flex-shrink-0"
          aria-label="Edit todo"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>
      )}

      <button
        onClick={() => onDelete(todo.id)}
        className="p-1 text-gray-400 hover:text-rose-500 transition-colors flex-shrink-0"
        aria-label="Delete todo"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </button>
    </div>
  )
}
