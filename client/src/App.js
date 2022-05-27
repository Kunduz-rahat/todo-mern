import React, {useEffect, useState} from 'react';
import axios from "axios";
import Header from './components/Header';


const App = () => {
  const [tasks, setTasks] = useState([])
  useEffect(()=>{
    axios('http://localhost:8000/api/tasks')
      .then(({data})=> setTasks(data))
  },[])

  return (
    <div className=''>
    <Header/>
     <ul className='list-group'>
       {
         tasks.map(item=>
           <li className='list-group-item col-md-4 offset-md-4 d-flex justify-content-between align-items-center'>{item.title}
           <button className='btn btn-primary btn-sm'>Delete</button>
           </li>
         )
       }
     </ul>
    </div>
  );
};

export default App;