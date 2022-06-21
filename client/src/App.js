import React, { useEffect, useState } from 'react';
import axios from "axios";

import Header from './components/Header';
import TodoItem from './components/TodoItem';




const App = () => {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  useEffect(() => {
    axios('http://localhost:8000/api/tasks')
      .then(({ data }) => setTasks(data))

  }, [])

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/tasks', { title: task })
      console.log(res)
      setTasks(prev => [...prev, res.data])
      setTask('')

    } catch (err) {
      console.log(err)
    }
  }
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:8000/api/tasks/${id}`)
      .then(() => setTasks(tasks.filter(item => item._id !== id)))
  }
  const updateTodo = (modified, id) => {
    axios.put(`http://localhost:8000/api/tasks/${id}`, { title: modified })
      .then(({ data }) => setTasks(tasks.map(el => el.id === id ? data : el))
      )
  }
  return (
    <div className=''>
      <Header />
      <form className="flex items-center mt-5 mb-5 max-w-md mx-auto bg-white rounded-lg" onSubmit={e => addTask(e)}>
        <input type="search" className="form-control me-3"
          placeholder="Add todo"
          x-model="search"
          value={task}
          required
          onChange={event => setTask(event.target.value)}
        />
        <div>
          <button
            className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
      <ul className='list-group'>
        {
          tasks.map(item =>
            <TodoItem key={item.id} deleteTodo={deleteTodo} item={item} updateTodo={updateTodo} />
          )
        }
      </ul>
    </div>
  );

}
export default App;