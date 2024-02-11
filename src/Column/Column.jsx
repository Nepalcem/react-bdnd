import React, { useEffect, useState } from "react";
import { ColumnContainer, ColumnTitle, TaskList } from "./Column.styled";
import Task from "../Task/Task";
import { Droppable } from "react-beautiful-dnd";

export default function Column({ column, tasks }) {

    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
      const animation = requestAnimationFrame(() => setEnabled(true));

      return () => {
        cancelAnimationFrame(animation);
        setEnabled(false);
      };
    }, []);

    if (!enabled) {
      return null;
    }

  return (
    <ColumnContainer>
      <ColumnTitle>{column}</ColumnTitle>
      <Droppable droppableId={column}>
              {(provided) => {
                 return (
                      <TaskList ref={provided.innerRef} {...provided.droppableProps}>
                          {tasks.map((task, index) => {
                              return <Task key={task._id} task={task} index={index} />;
                          })}
                          {provided.placeholder}
                      </TaskList>
                  )
              }}
      </Droppable>
    </ColumnContainer>
  );
}
