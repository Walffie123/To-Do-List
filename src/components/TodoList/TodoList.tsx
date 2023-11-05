import React, { useState } from 'react'
import { Task } from '../../@types/task.type'
import TaskInPut from '../TaskInput/'
import TaskList from '../TaskList'
import styles from './todoList.module.scss'
function TodoList() {
  const [task, setTask] = useState<Task[]>([])

  const finishTask = task.filter((task) => task.done)
  const notdoneTask = task.filter((task) => !task.done)
  const addTask = (name: string) => {
    const task: Task = {
      name,
      done: false,
      id: new Date().toISOString()
    }
    setTask((prevState) => [...prevState, task])
  }
  console.log(task)

  const handleTask = (id: string, done: boolean) => {
    setTask((prevState) => {
      return prevState.map((task) => {
        if (task.id === id) {
          return { ...task, done }
        }
        return task
      })
    })
  }
  return (
    <div className={styles.TodoList}>
      <div className={styles.todoListContainer}>
        <TaskInPut addTask={addTask} />
        <TaskList task={notdoneTask} handleTask={handleTask} />
        <TaskList doneTaskList task={finishTask} handleTask={handleTask} />
      </div>
    </div>
  )
}

export default TodoList
