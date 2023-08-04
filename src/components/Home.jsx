import React, { useContext, useEffect, useState } from 'react'
import '../CSS/Home.css'
import Logo from '../images/logo.png'
import { addTodo, deleteATodo, fetchTodos, fetchUser } from '../Api'
import { useSelector } from 'react-redux'
import AlertContext from '../context/ContextFiles/AlertContext'
import Alert from './Alert'
import Todo from './Todo'

const Home = () => {
  const state = useSelector((state)=>state)
  const userData = useSelector((state)=>state.userData)
  const hasToken = useSelector((state)=>state.hasToken)
  const ongoingTodoList = useSelector((state)=>state.ongoingTodoList)
  const completedTodoList = useSelector((state)=>state.completedTodoList)

  const alertProps = useContext(AlertContext)
  const [name,setName] = useState('')
  const [desc,setDesc] = useState('')
  const [status,setStatus] = useState(false)
  useEffect(()=> {
    fetchUser()
  },[])
  useEffect(()=> {
    if(hasToken) {
      fetchTodos(userData._id)
    }
  },[userData])
  
  const submitTodo = (ev)=> {
    
    if(name==='' ) {
      alertProps.showAlert('name cannot be left blank','danger')
    }
    addTodo(userData._id,name,desc,status)
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
    userData && <div className='main'>
      <Alert/>
      <div className="box1">
        <div className="logoContainer pt-2">
          <img src={Logo} alt="" width={90} height={45} />
          <h4 className='cartoon textShadow m-0'>Welcome Back {userData.username}</h4>

        </div>
        <div className="formContainer">
          <h5 className="cartoon textShadow">Lets Add a new Todo!!</h5>
          <form className='todoForm'>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label cartoon textShadow">Name</label>
              <input type="text" className="form-control cartoon " id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(ev)=>setName(ev.target.value)}/>

            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label cartoon textShadow">Description</label>
              <textarea type="text" className="form-control cartoon " id="exampleInputPassword1" onChange={(ev)=>setDesc(ev.target.value)}/>
              <div id="emailHelp" className="form-text cartoon">A short description always works.</div>
            </div>
            <div className="mb-3 form-check">
              <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={()=>setStatus(!status)}/>
              <label className="form-check-label cartoon" for="exampleCheck1 textShadow" >Status</label>
            </div>
            <input type='button' value="Submit" className="btn btn-primary cartoon todoSubmitBtn textShadow" onClick={submitTodo}/>
          </form>
        </div>
      </div>
      <div className="box2">
        <h4 className='cartoon textShadow mb-4' style={{ paddingTop: "53px", width: "95%", margin: "0 auto" }}>Keep track of your ongoing ToDo's</h4>
        {
          ongoingTodoList.length!==0? ongoingTodoList.map((el,index)=> {
            
            return <Todo _id = {el._id} name={el.name} desc={el.desc} key={el._id}/>
            
          }): 
          <div className="emptyBox" > 
          <h3 className='cartoon textShadow' >No Ongoing ToDos</h3>
          </div>
          
        }
        
        
      </div>
      <div className="box3">
      <h4 className='cartoon textShadow mb-4' style={{ paddingTop: "53px", width: "95%", margin: "0 auto" }}>Record of your completed ToDo's</h4>
      {
           completedTodoList.length!==0? completedTodoList.map((el,index)=> {
            return <div className="todoBox" key={el._id}>
            <h6 className="cartoon textShadow name">{el.name}</h6>
           
            <i class="bi bi-bag-check-fill statusIcon"></i>      
                {/* use bi-bag-dash-fill for false status */}
            <p className="cartoon">{el.desc}</p>
            <button type="button" class="btn btn-danger deleteTodo" onClick={()=>deleteTodo(el._id)}><i class="bi bi-x"></i></button>
          </div>
          }):
          <div className="emptyBox" > 
          <h3 className='cartoon textShadow' >No Completed ToDos</h3>
          </div>
        }
      </div>
    </div>
  )
}

export default Home
