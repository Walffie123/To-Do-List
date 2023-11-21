import React from 'react'
import { Task } from '../../@types/task.type'
import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
  tasks: Task[]
  changeTask: (id: string, done: boolean) => void
  startEditTask: (id: string) => void
  deleteTask: (id: string) => void
}
function TaskList(props: TaskListProps) {
  const { doneTaskList, tasks, changeTask, startEditTask, deleteTask } = props

  const onChangeCheckBox = (taskId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    changeTask(taskId, event.target.checked)
  }

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn Thành' : 'Chưa Hoàn Thành'}</h2>
      <div className={styles.tasks}>
        {tasks.map((task) => (
          <div className={styles.taskItem} key={task.id}>
            <input
              type='checkbox'
              className={styles.checkBox}
              checked={task.done}
              onChange={onChangeCheckBox(task.id)}
            />
            <span className={`${styles.taskName} ${task.done ? styles.taskNameDone : ''}`}>{task.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn} onClick={() => startEditTask(task.id)}>
                ✏️
              </button>
              <button className={styles.taskBtn} onClick={() => deleteTask(task.id)}>
                🚮
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList
