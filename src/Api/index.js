import { useContext } from "react";
import { createAction } from "../action";
import store from "../store";

//Fetch user Details
export const fetchUser = async ()=> {
    
    const authToken = window.localStorage.getItem('token')
      if (!authToken) {
        return window.location = ('/login')
      }
    const response = await fetch('http://localhost:5000/api/auth/getuser', {
        method: "POST", 
        mode: "cors", 
        
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken
        },
        
      });
      let userData = await response.json();
        if (userData.success) {
          // console.log(userData)
          const action = createAction('addUserData',userData.user)
            store.dispatch(action)
            
        }
        else {
          console.log(userData.error)
          
        }
    }

//Fetch Todos of a user
export const fetchTodos = async(id)=> {
  // console.log(id)
  const response = await fetch(`http://localhost:5000/api/todo/getTodos/${id}`)
  const data = await response.json()
  // console.log(data)
  if(data.success) {
    const action = createAction('fetchTodos',data.todolist)
    store.dispatch(action)
  }
  else {
    console.log(data.message)
  }
}

//Add a new Todo
 export const addTodo = async(user,name,desc,status)=> {
  const todo = {
    user,name,desc,status
  }
  console.log(todo)
  const response = await fetch('http://localhost:5000/api/todo/addTodo', {
        method: "POST", 
        mode: "cors", 
        
        headers: {
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify(todo)
      });
      let data = await response.json();
      if(data.success) {
        const action = createAction('addTodo',data.newTodo)
    store.dispatch(action)
      }
      else {
        console.log(data.message)
      }
 }

//Update Status of a ToDo
export const fetchUpdateStatus = async(_id,status)=> {
  const updateTodo = {
    _id,status
  }
  const response = await fetch('http://localhost:5000/api/todo/updateTodo', {
        method: "PATCH", 
        mode: "cors", 
        
        headers: {
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify(updateTodo)
      });
      let data = await response.json();
      if(data.success){
        const action = createAction('updateStatus',data.oldTodo)
        store.dispatch(action)
      }
      else {
        console.log(data.message)
      }
}

//Delete a Todo of a User
export const deleteATodo = async(_id)=> {
  const deletedTodo = {
    _id
  }
  const response = await fetch('http://localhost:5000/api/todo/deleteTodo', {
    method: "DELETE", 
    mode: "cors", 
    
    headers: {
      "Content-Type": "application/json",
     
    },
    body: JSON.stringify(deletedTodo)
  });
  let data = await response.json();
  if(data.success) {
    const action = createAction('deleteTodo',_id)
    store.dispatch(action)
    return true
  }
  else {
    console.log(data.message)
    return false
  }
}