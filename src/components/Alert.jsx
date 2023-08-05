import React, { useContext } from 'react'
import AlertContext from '../context/ContextFiles/AlertContext'
import {easeOut, motion } from "framer-motion"
import '../CSS/Alert.css'
function Alert() {
    const props = useContext(AlertContext)
  return (
   props.alert && <motion.div className={`alert alert-${props.alert.type} alert-dismissible fade show`} style={{zIndex:100,backgroundColor:props.alert.type==='success'?'#03c503ad':'#ff0000b3'}} role="alert"
   initial={{ opacity: 0, y:50 }}
      animate={{ opacity: 1, y:10}}
      transition={{
        duration: 0.8,
        delay: 0.5,
        ease:easeOut
      }}>
  {props.alert.type==='success'?'Success':'Failure'}: {props.alert.message} 
  {/* initially it will show error as we set alert to null and we cannot read property of null
        however if we write an if statement that if props.alert!=null then it will solve the problem
        rather than if we can use an alternate syntax: props.alert &&. */}
</motion.div>
  )
}

export default Alert
