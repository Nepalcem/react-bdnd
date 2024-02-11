import React from "react";
import { TaskTitle, TaskWrapper } from "./Task.styled";
import { Draggable } from "react-beautiful-dnd";

export default function Task({ task, index }) {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => {
        return (
          <TaskWrapper
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <TaskTitle>{task.title}</TaskTitle>
            <p>{task.description}</p>
          </TaskWrapper>
        )
      }}
    </Draggable>
  );
}