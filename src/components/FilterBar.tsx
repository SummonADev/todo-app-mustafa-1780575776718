import React from 'react'
import type { Filter } from '@/types'

interface Props {
  filter: Filter
  setFilter: (f: Filter) => void
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
}

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

export function FilterBar({ filter, setFilter, activeCount, completedCount, onClearCompleted }: Props) {
  return (
    <div className="flex items-center justify-between flex-wrap gap-2 mt-4">
      <span className="text-sm text-gray-500">
        {activeCount} task{activeCount !== 1 ? 's' : ''} left
      </span>

      <div className="flex gap-1">
        {filters.map(f => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-violet-600 text-white shadow'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {completedCount > 0 && (
        <button
          onClick={onClearCompleted}
          className="text-sm text-gray-400 hover:text-rose-500 transition-colors"
        >
          Clear completed
        </button>
      )}
    </div>
  )
}
