import React, { useState } from 'react'

import axios from 'axios';

const AddTodo = (props) => {
  const [task, setTask] = useState('')
  const addTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/api/tasks', { title: task })
      console.log(res)
    } catch (err) {
      console.log(err)
    }

  }




return (

 
    <div >
      <form className="flex items-center mt-5 mb-5 max-w-md mx-auto bg-white rounded-lg" onSubmit={e=>addTask(e)}>
      
      <input type="search" class="form-control me-3"
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
    </div>




)
}

export default AddTodo