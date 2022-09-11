import React, {useEffect, useState} from 'react';
import cl from './TodoList.module.css'
import TodoItem from "../todoitem/TodoItem";
import {Button, Modal} from "antd";
import AddTask from "../addtaskmodal/AddTask";
import {v4 as uuidv4} from 'uuid';
import EditTaskModal from "../edittaskmodal/EditTaskModal";

const TodoList = () => {

  const [showModal, setShowModal] = useState(false)
  const [newTask, setNewTask] = useState({})
  const [isEditTask, setIsEditTask] = useState(false)
  const [taskToEdit, setTaskToEdit] = useState({})

  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || [])


  const updateTask = () => {
    if (!isEditTask) {
      setTasks([...tasks, {...newTask, id: uuidv4(), isCompleted: false, time: new Date().toLocaleString()}])
      setNewTask({})
      setShowModal(false)
    } else {
      editTask(taskToEdit)
      setIsEditTask(false)
    }
  }

  const removeTask = (task) => {
    setTasks(tasks.filter((t) => t.id !== task.id))
  }

  const editTask = (task) => {
    setTasks(tasks.map((t) => {
      if (t.id !== task.id) {
        return t
      } else return task
    }))
  }

  const checked = (task) => {
    task.isCompleted = !task.isCompleted
    setTasks(tasks.map((t) => {
      if (t.id !== task.id) {
        return t
      } else return task
    }))
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className={cl.main_container}>
      <h1 className={cl.todo_list_header}>What i must todo....</h1>
      <Button
        className={cl.button}
        type={"primary"}
        onClick={() => setShowModal(true)}
      >
        Add Task
      </Button>
      <Modal
        onOk={updateTask}
        open={showModal || isEditTask}
        onCancel={() => {
          setShowModal(false)
          setIsEditTask(false)
        }}
      >
        {!isEditTask &&
          <AddTask
            task={newTask}
            setTask={setNewTask}
          />}
        {isEditTask &&
          <EditTaskModal
            task={taskToEdit}
            setTask={setTaskToEdit}
          />}
      </Modal>
        {tasks.length ? <div className={cl.todo_container}>
            {tasks ? tasks.map((task) => <TodoItem
                edit={setIsEditTask}
                taskToEdit={setTaskToEdit}
                checked={checked}
                remove={removeTask}
                task={task}
                key={task.id}
            />) : ''}
        </div> : <h2>The list of tasks is empty...</h2>}
    </div>
  );
};

export default TodoList;