import React, { useState } from "react";
import { columns, advancedTasks } from "./initialdata";
import Column from "./Column/Column";
import { AppWrapper } from "./App.styled";
import { DragDropContext } from "react-beautiful-dnd";

export default function App() {
  const [tasks, setTasks] = useState(advancedTasks || []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    //return if no changes
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = source.droppableId;
    const endColumn = destination.droppableId;
    const draggedTask = tasks.find((task) => task._id === draggableId);

    // If the task was moved within the same column
    if (startColumn === endColumn) {
      const newTasks = [...tasks];
      draggedTask.columnIndex = destination.index; //1

      // Update the columnIndex of other tasks
      newTasks.forEach((task) => {
        if (
          task.columnIndex <= destination.index &&
          source.index < task.columnIndex &&
          task._id !== draggableId &&
          task.status === startColumn
        ) {
          task.columnIndex -= 1;
        }
        if (
          task.columnIndex >= destination.index &&
          source.index > task.columnIndex &&
          task._id !== draggableId &&
          task.status === startColumn
        ) {
          task.columnIndex += 1;
        }
      });

      setTasks(newTasks);
    } else if (startColumn !== endColumn) {
      // Move between columns
      const newTasks = [...tasks];

      draggedTask.status = destination.droppableId;
      draggedTask.columnIndex = destination.index;

      newTasks.forEach((task) => {
        if (
          task.status === source.droppableId &&
          task.columnIndex > source.index
        ) {
          task.columnIndex -= 1;
        }
        if (
          task.status === destination.droppableId &&
          task.columnIndex >= destination.index &&
          task._id !== draggableId
        ) {
          task.columnIndex += 1;
        }
      });

      setTasks(newTasks);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <AppWrapper>
        {columns.map((column) => {
          const columnTasks = tasks
            .filter((task) => task.status === column)
            .sort((a, b) => a.columnIndex - b.columnIndex);

          return <Column key={column} column={column} tasks={columnTasks} />;
        })}
      </AppWrapper>
    </DragDropContext>
  );
}
