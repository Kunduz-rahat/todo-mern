import React, { useEffect, useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Header from './components/Header';
import AddTodo from './components/AddTodo';



const App = () => {
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    axios('http://localhost:8000/api/tasks')
      .then(({ data }) => {
        setTasks(data)
      // setTasks(prev=>[...prev, data])
        
      })
  }, [])


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
  return (
    <div className=''>
      <Header />
      <AddTodo />
      <ul className='list-group'>
        {
          tasks.map(item =>
            <div key={item._id}>
              <li className='list-group-item col-md-4 offset-md-4 d-flex justify-content-between align-items-center'>{item.title}
                <div>
                  <button className='btn btn-primary btn-sm mr-2'>
                    <FontAwesomeIcon icon={faTrash} onClick={() => { deleteTodo(item.id) }} />
                  </button>
                  <button className='btn btn-danger btn-sm'>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </div>

              </li>
            </div>

          )
        }
      </ul>
    </div>
  );
};

export default App;