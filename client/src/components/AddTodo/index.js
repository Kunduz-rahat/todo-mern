import React, { useState } from 'react'

import axios from 'axios';

const AddTodo = (props) => {
  const [task, setTask] = useState('')
  const addTask =()=>{
    if(task.trim()===''){
      return
    }else{
      axios.post('http://localhost:8000/api/posts' ,
      {
        title:task
      } 
    ).then(res=>{
      setTask('')
      props.addTask(res.data)

    }).catch(err=> console.log(err))
  }




  }
  return (
   
      <div className='flex items-center mt-5 mb-5 max-w-md mx-auto bg-white rounded-lg '>
     
      <div className="w-full">
          <input type="search" class="form-control me-3"
            placeholder="Add todo" 
            x-model="search" 
            value={task}
            required
        onChange={event =>setTask(event.target.value)}
            />
        </div>
        <button  
        className="btn btn-primary"
    onClick={()=>addTask()}
        >
          Add
        </button>
     
       
      </div>



  )
}

export default AddTodo