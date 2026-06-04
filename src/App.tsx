import React from 'react'
import { useTodos } from '@/hooks/useTodos'
import { AddTodoForm } from '@/components/AddTodoForm'
import { TodoItem } from '@/components/TodoItem'
import { FilterBar } from '@/components/FilterBar'

export default function App() {
  const {
    todos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 flex items-start justify-center px-4 pt-16 pb-16">
      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-violet-700 tracking-tight">My Todos</h1>
          <p className="text-gray-500 mt-1 text-sm">Stay organized, stay productive.</p>
        </div>

        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-6">
          <AddTodoForm onAdd={addTodo} />

          {todos.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">✅</div>
              <p className="text-gray-400 text-sm">
                {filter === 'completed'
                  ? 'No completed tasks yet.'
                  : filter === 'active'
                  ? 'No active tasks — you are all caught up!'
                  : 'No tasks yet. Add one above!'}
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </div>
          )}

          <FilterBar
            filter={filter}
            setFilter={setFilter}
            activeCount={activeCount}
            completedCount={completedCount}
            onClearCompleted={clearCompleted}
          />
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">Data saved to localStorage</p>
      </div>
    </div>
  )
}
