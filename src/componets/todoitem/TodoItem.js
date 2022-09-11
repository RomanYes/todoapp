import React from 'react';
import {Button, Checkbox, Modal} from "antd";
import cl from './TodoItem.module.css'
import {DeleteFilled, DeleteTwoTone, EditFilled, EditTwoTone} from "@ant-design/icons";

const TodoItem = ({task, checked, remove, edit, taskToEdit}) => {
  const openEditModal = (task) => {
    edit(true)
    taskToEdit(task)
  }
  return (
    <div className={cl.container}>
      <div className={cl.item_wrapper}>
        <div className={cl.todo_info}>
          <Checkbox checked={task.isCompleted} onChange={() => checked(task)}/>
          <div className={cl.todo_text} style={task.isCompleted ? {textDecoration: 'line-through'} : {}}>
            <span><b>Title:</b><i className={cl.text_input}>{task.title}</i></span>
            <span><b>Description:</b><i className={cl.text_input}>{task.description}</i></span>
          </div>
        </div>
        <div className={cl.buttons}>
          <DeleteTwoTone style={{fontSize: 20, marginRight: 8}} onClick={() => remove(task)}/>
          <EditTwoTone style={{fontSize: 20}} onClick={() => openEditModal(task)}/>
        </div>
      </div>
      <div>{task.time}</div>
    </div>
  );
};

export default TodoItem;