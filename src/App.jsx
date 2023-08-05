import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';
import LoginState from './context/StateFiles/LoginState'
import AlertState from './context/StateFiles/AlertState';

import Home from './components/Home';
const App = () => {
  
  return (
    <>
      <LoginState>
        <AlertState>
          <BrowserRouter>

            <Routes>
              <Route exact path="/" element={<Landing/>}>

              </Route>
              <Route exact path="/home" element={<Home />}>

              </Route>
              <Route exact path="/signup" element={<Signup />}>

              </Route>
              <Route exact path="/login" element={<Login />}>

              </Route>

            </Routes>


          </BrowserRouter>
        </AlertState>

      </LoginState>

    </>
  )
}

export default App
