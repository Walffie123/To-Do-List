import { useState } from 'react'
import { Task } from '../../@types/task.type'
import styles from './taskInput.module.scss'

interface TaskInputProps {
  addTask: (name: string) => void
  currentTask: Task | null
  editTask: (name: string) => void
  finishEditTask: () => void
}

export default function TaskinPut(props: TaskInputProps) {
  const { addTask, currentTask, editTask, finishEditTask } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (currentTask) {
      finishEditTask()
      if (name) setName('')
    } else {
      addTask(name)
      setName('')
    }
  }

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (currentTask?.name) {
      editTask(value)
    } else {
      setName(value)
    }
  }

  return (
    <div className='mb-2 '>
      <h1 className={styles.title}> To Do List Typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='input here'
          value={currentTask ? currentTask.name : name}
          onChange={onChangeInput}
        />
        <button type='submit'>{currentTask ? '➕' : '✅'}</button>
      </form>
    </div>
  )
}
