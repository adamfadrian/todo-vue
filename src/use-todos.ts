import { TodoistApi, type AddTaskArgs } from '@doist/todoist-api-typescript'
import { onMounted, reactive } from 'vue'

export interface Todo {
  id?: string
  order?: number
  content: string
  description: string
  projectId?: string
  isCompleted?: boolean
  labels?: string[]
  priority?: number
  commentCount?: number
  createdAt?: string
  url?: string
  creatorId?: string
}

interface NewTask {
  content: string
  description: string
  isCompleted?: boolean
}

export default function useTodoApi() {
  const todos = reactive<any[]>([])

  const api = new TodoistApi('b939e074ca14601888a66ee445b1baab495f3f62')

  const fetchTodoList = async () => {
    const todoListFetch = await api.getTasks()
    console.log('CALLED', todoListFetch)
    todos.push(...todoListFetch)
    saveTodosToLocalStorage(todos)
    return todoListFetch
  }

  const createTodoTask = async (payload: Todo) => {
    const newTodo = await api.addTask({ ...payload})
    todos.push(newTodo)
    saveTodosToLocalStorage(todos)
    return newTodo
  }

  const editTodoTask = async (payload: any) => {
    const updatedTodo = await api.updateTask(payload.id, { ...payload })

    const todoIndex = todos.findIndex((todo) => todo.id === payload.id)
    if (todoIndex !== -1) {
      todos[todoIndex] = updatedTodo
      saveTodosToLocalStorage(todos)
    }

    return updatedTodo
  }

  const deleteTodoTask = async (id: string) => {
    todos.splice(
      todos.findIndex((todo) => todo.id === id),
      1
    )
    saveTodosToLocalStorage(todos)
  }

  // Save todos to local storage
  const saveTodosToLocalStorage = (todos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }

  // Load todos from local storage on mounted
  onMounted(() => {
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      todos.push(...JSON.parse(storedTodos))
    } else {
      fetchTodoList()
    }
  })

  return { fetchTodoList, todos, deleteTodoTask, createTodoTask, editTodoTask }
}
