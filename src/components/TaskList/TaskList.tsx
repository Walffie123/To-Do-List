import { Task } from '../../@types/task.type'
import TodoList from '../TodoList'
import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
  task: Task[]
  handleTask: (id: string, done: boolean) => void
}

function TaskList(props: TaskListProps) {
  const { doneTaskList, task } = props

  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Hoàn Thành' : 'Chưa Hoàn Thành'}</h2>
      <div className={styles.tasks}>
        {task.map((task) => (
          <div className={styles.tasks} key={task.id}>
            <div className={styles.taskItem}>
              {/* <input type='checkbox' className={styles.checkBox} checked={task.done} onChange = {() => ()} /> */}
              <span className={`${styles.taskName} ${task.done ? styles.taskNameDone : ''}`}> {task.name} </span>
              <div className={styles.taskActions}>
                <button className={styles.taskBtn}>✏️</button>
                <button className={styles.taskBtn}>🚮</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskList
