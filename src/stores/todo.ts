import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const filter = ref<'all' | 'active' | 'completed'>('all')

  const filteredTodos = computed(() => {
    switch (filter.value) {
      case 'active':
        return todos.value.filter(todo => !todo.completed)
      case 'completed':
        return todos.value.filter(todo => todo.completed)
      default:
        return todos.value
    }
  })

  function addTodo(text: string) {
    todos.value.push({
      id: Date.now(),
      text,
      completed: false
    })
    saveTodos()
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter(todo => todo.id !== id)
    saveTodos()
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
      saveTodos()
    }
  }

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }

  function loadTodos() {
    const savedTodos = localStorage.getItem('todos')
    if (savedTodos) {
      todos.value = JSON.parse(savedTodos)
    }
  }

  return {
    todos,
    filter,
    filteredTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    loadTodos
  }
})