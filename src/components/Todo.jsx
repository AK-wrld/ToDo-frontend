import React, { useContext } from 'react'
import { deleteATodo, fetchUpdateStatus } from '../Api'
import AlertContext from '../context/ContextFiles/AlertContext'

const Todo = (props) => {
    const {_id,name,desc} = props
    const alertProps = useContext(AlertContext)
    const updateStatus = (_id)=> {
        fetchUpdateStatus(_id,true)
    }
    const deleteTodo = async(_id)=> {
        const response = await deleteATodo(_id)
        if(response) {
            alertProps.showAlert('Success: ToDo successfully deleted','success')
        }
        else {
            alertProps.showAlert('Failure: Inernal Server error','danger')

        }
    }
  return (
    <>
      <div className="todoBox" key={_id}>
            <h6 className="cartoon textShadow name">{name}</h6>
           
            <i class="bi bi-bag-dash-fill flasestatusIcon" onClick={()=>updateStatus(_id)}></i>      
                {/* use bi-bag-dash-fill for false status */}
            <p className="cartoon">{desc}</p>
            <button type="button" class="btn btn-danger deleteTodo" onClick={()=>deleteTodo(_id)}><i class="bi bi-x"></i></button>
          </div>
    </>
  )
}

export default Todo
