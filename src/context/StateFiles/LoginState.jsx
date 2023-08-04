import React, {useEffect, useRef, useState} from 'react'
import LoginContext from '../ContextFiles/LoginContext'

const loginState = (props)=> {
    const [loginState,isLogged] = useState(false)
    const [authToken,setAuthToken] = useState('')
    
    const [seePass,setSeepass] = useState(false)
    const passRef = useRef(false)
    
    return (
        <LoginContext.Provider value={{loginState,isLogged,authToken,setAuthToken,seePass,setSeepass,passRef}}>
           
            {props.children}
        </LoginContext.Provider>
    )
}
export default loginState