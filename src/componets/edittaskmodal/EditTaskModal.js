import React from 'react';
import {Input} from "antd";

const EditTaskModal = ({task, setTask}) => {

  return (
    <div>
      <div>
        <span>Title</span>
        <Input value={task.title} onChange={(e) => setTask({
          ...task,
          title: e.target.value,
        })}/>
      </div>

      <div>
        <span>Description</span>
        <Input value={task.description} onChange={(e) => setTask({
          ...task,
          description: e.target.value,
        })}/>
      </div>
    </div>
  );
};

export default EditTaskModal;