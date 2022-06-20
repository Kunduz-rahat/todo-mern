import React, { useEffect, useState } from 'react';
import axios from "axios";

import Header from './components/Header';
import TodoItem from './components/TodoItem';




const App = () => {
  const [tasks, setTasks] = useState([])
  const [task, setTask] = useState('')
  const [isUpdate, setIsUpdate] = useState('')
  const [updateItemTask, setUpdateItemTask] = useState('')
  

  useEffect(() => {
    const getListItems = async () => {
      try {
        const res = await axios('http://localhost:8000/api/tasks')
        setTasks(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getListItems()
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
  const deleteTodo = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:8000/api/tasks/${id}`)
      const newTasks = tasks.filter(item => item._id !== id)
      setTasks(newTasks)
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  // const updateForm = () => {

  //   <form onSubmit={(e) => { updateItem(e) }}>
  //     <input type="text"
  //       placeholder='New Todo' onChange={e => { setUpdateItemTask(e.target.value) }}
  //       value={updateItemTask}

  //     />
  //     <div>
  //       <button type='submit'
  //         className="btn btn-primary">
  //         Update
  //       </button>
  //     </div>
  //   </form>
  //   console.log('updage')
  // }
  // const updateItem = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const res = await axios.put(`http://localhost:8000/api/tasks/${isUpdate}`, { title: updateItemTask })
  //     setUpdateItemTask('')
  //     setIsUpdate('')
  //     console.log(res.data)
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
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
           <TodoItem deleteTodo={deleteTodo}  item={item} />
          )
        }
      </ul>
    </div>
  );

}
export default App;