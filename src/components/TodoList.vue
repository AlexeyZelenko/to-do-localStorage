<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTodoStore } from '../stores/todo'

const todoStore = useTodoStore()
const newTodo = ref('')

function handleSubmit() {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}

onMounted(() => {
  todoStore.loadTodos()
})
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">ToDo List</h1>
    
    <form @submit.prevent="handleSubmit" class="mb-4">
      <div class="flex gap-2">
        <input
          v-model="newTodo"
          type="text"
          placeholder="Что нужно сделать?"
          class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Добавить
        </button>
      </div>
    </form>

    <div class="flex gap-2 mb-4">
      <button
        @click="todoStore.filter = 'all'"
        :class="['px-3 py-1 rounded-lg', todoStore.filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200']"
      >
        Все
      </button>
      <button
        @click="todoStore.filter = 'active'"
        :class="['px-3 py-1 rounded-lg', todoStore.filter === 'active' ? 'bg-blue-500 text-white' : 'bg-gray-200']"
      >
        Активные
      </button>
      <button
        @click="todoStore.filter = 'completed'"
        :class="['px-3 py-1 rounded-lg', todoStore.filter === 'completed' ? 'bg-blue-500 text-white' : 'bg-gray-200']"
      >
        Завершенные
      </button>
    </div>

    <ul class="space-y-2">
      <li
        v-for="todo in todoStore.filteredTodos"
        :key="todo.id"
        class="flex items-center gap-2 p-2 border rounded-lg"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="todoStore.toggleTodo(todo.id)"
          class="w-5 h-5"
        />
        <span
          :class="['flex-1', todo.completed ? 'line-through text-gray-500' : '']"
        >
          {{ todo.text }}
        </span>
        <button
          @click="todoStore.deleteTodo(todo.id)"
          class="px-2 py-1 text-red-500 hover:bg-red-100 rounded"
        >
          Удалить
        </button>
      </li>
    </ul>
  </div>
</template>