import { useEffect, useState } from 'react'
import TaskInPut from '../TaskInput'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
import { Task } from '../../@types/task.type'

// Cú Pháp Khai Báo Function, sau dấu : là return về Task[]
interface HandleNewTasks {
  (tasks: Task[]): Task[]
}

const syncReactToLocal = (HandleNewTasks: HandleNewTasks) => {
  const taskString = localStorage.getItem('tasks')
  const taskObj: Task[] = JSON.parse(taskString || '[]')
  const newTaskObj = HandleNewTasks(taskObj)
  localStorage.setItem('tasks', JSON.stringify(newTaskObj))
}
function TodoList() {
  const [tasks, setTask] = useState<Task[]>([])
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const doneTask = tasks.filter((task) => task.done)
  const notDoneTask = tasks.filter((task) => !task.done)

  useEffect(() => {
    const taskString = localStorage.getItem('tasks')
    const taskObj: Task[] = JSON.parse(taskString || '[]')
    setTask(taskObj)
  }, [])

  const addTask = (name: string) => {
    const task: Task = {
      name,
      done: false,
      id: new Date().toISOString()
    }

    setTask((prevState) => [...prevState, task])
    const handler = (taskObj: Task[]) => {
      return [...taskObj, task]
    }
    syncReactToLocal(handler)
  }

  const changeTask = (id: string, done: boolean) => {
    setTask((prevState) => {
      return prevState.map((task) => {
        if (task.id === id) {
          return { ...task, done }
        }
        return task
      })
    })
  }

  const startEditTask = (id: string) => {
    const findTask = tasks.find((task) => task.id === id)
    if (findTask) {
      setCurrentTask(findTask)
    }
  }

  const editTask = (name: string) => {
    setCurrentTask((prev) => {
      if (prev) return { ...prev, name }
      return null
    })
  }

  const finishEditTask = () => {
    const handler = (taskObj: Task[]) => {
      return taskObj.map((task) => {
        if (task.id === currentTask?.id) {
          return currentTask
        }
        return task
      })
    }
    setTask(handler)
    setCurrentTask(null)
    syncReactToLocal(handler)
  }

  const deleteTask = (id: string) => {
    const handler = (taskObj: Task[]) => {
      return taskObj.filter((task) => task.id !== id)
    }
    setTask(handler)
    syncReactToLocal(handler)
  }
  console.log(tasks)
  return (
    <div className={styles.TodoList}>
      <div className={styles.todoListContainer}>
        <TaskInPut addTask={addTask} currentTask={currentTask} editTask={editTask} finishEditTask={finishEditTask} />
        <TaskList tasks={notDoneTask} changeTask={changeTask} startEditTask={startEditTask} deleteTask={deleteTask} />
        <TaskList
          doneTaskList={true}
          tasks={doneTask}
          changeTask={changeTask}
          startEditTask={startEditTask}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  )
}

export default TodoList
