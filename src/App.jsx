import React, { useState, useReducer } from 'react';
import { AddTask, TaskList } from './components';
import './App.css';

function App() {

  // const [tasks, setTasks] = useState(initialTasks);
  const [tasks, dispatch] = useReducer(tasksReducers, initialTasks);

  function handleAddTask(text) {
    //this object is called an 'action'
    dispatch({
      type: "adding",
      id: nextId++,
      text: text,
    })
  }

  function handleChangeTask(task) {
    
    dispatch({
      //this object is called an 'action'
      type: "updating",
      task: task
    })
    
  }

  function handleDeleteTask(taskId) {
    //this object is called an 'action'
    dispatch({
      type: "deleting",
      id: taskId
    })
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}
export default App;

let nextId = 3;
const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false },
];


function tasksReducers(tasks, action) {
  switch (action.type) {
    case 'adding' : {
      
      const newTask = {
        id: action.id,
        text: action.text,
        done: false
      }
      return [...tasks, newTask];
    }
    case 'deleting': {
      
      return tasks.filter(t => t.id !== action.id);
    }
    case 'updating': {
      
      return tasks.map(t => {

        if (t.id === action.task.id) {          
          return action.task;
        }
        return t;
      })

    }
    default: {
      throw Error('unknown action:' + action.type);
    }
  }
}