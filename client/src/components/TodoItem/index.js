import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'

const TodoItem = ({item, deleteTodo}) => {
  const [edit, setEdit] = useState(false)
  return (
	 <div>
     <li key={item.id} className='list-group-item col-md-4 offset-md-4 d-flex justify-content-between align-items-center'>
            {
              edit? <input type='text' defaultValue={item.title}/> : <span>{item.title}</span>
            }
          
              <div>
                <button className='btn btn-danger btn-sm mr-2' onClick={()=> setEdit(!edit)}>
                 {
                  edit? <FontAwesomeIcon icon={faSave} />: <FontAwesomeIcon icon={faEdit} />
                 }
                </button>
                <button className='btn btn-primary btn-sm ' onClick={() => { deleteTodo(item.id) }}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </li>
   </div>
  )
}

export default TodoItem