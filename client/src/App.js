import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Header from './components/Header';




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

  const updateForm = () => {

    <form onSubmit={(e) => { updateItem(e) }}>
      <input type="text"
        placeholder='New Todo' onChange={e => { setUpdateItemTask(e.target.value) }}
        value={updateItemTask}
      />
      <div>
        <button type='submit'
          className="btn btn-primary">
          Update
        </button>
      </div>
    </form>
  }
  const updateItem = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:8000/api/tasks/${isUpdate}`, { title: updateItemTask })
      setUpdateItemTask('')
      setIsUpdate('')
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
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
            <div key={item.id}>
              <li className='list-group-item col-md-4 offset-md-4 d-flex justify-content-between align-items-center'>{item.title}
                {
                  isUpdate === item.id
                    ? updateForm()
                    :
                    <>

                      <div >
                        <button className='btn btn-danger btn-sm mr-2' onClick={() => { setIsUpdate(item.id) }}>
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button className='btn btn-primary btn-sm ' onClick={() => { deleteTodo(item.id) }}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </div>

                    </>

                }
              </li>
            </div>
          )
        }
      </ul>
    </div>
  );

}
export default App;