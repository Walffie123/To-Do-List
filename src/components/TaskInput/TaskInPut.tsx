import React, { useState } from 'react'
import styles from './taskInput.module.scss'

interface TaskInPutProps {
  addTask: (name: string) => void
}
function TaskInPut(props: TaskInPutProps) {
  const { addTask } = props
  const [name, setName] = useState<string>('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTask(name)
    setName('')
  }

  const onChangInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
  }
  return (
    <div className='mb-2 '>
      <h1 className={styles.title}> To do List typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='input here' value={name} onChange={onChangInput} />
        <button type='submit'>➕</button>
      </form>
    </div>
  )
}

export default TaskInPut
