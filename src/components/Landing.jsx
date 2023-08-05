import React from 'react'
import Logo from '../images/Logo.png'
import '../CSS/Landing.css'
import { easeIn, motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
const Landing = () => {
  const navigate = useNavigate()
  const login = ()=> {
    navigate('/login')
  }
  return (
    <motion.div
  initial={{ scale: 0,x: "-50%",y:"-50%" }}
  animate={{ rotate: 360, scale: 1,  }}
  transition={{
    type: "spring",
    stiffness: 150,
    damping: 30,
    ease:easeIn

  }}
  whileHover={{ scale: 1.2, rotate: 0 }}
  whileTap={{
    scale: 0.8,
    rotate: 360,
    borderRadius: "100%"
  }}
  onClick={login}
  className='landingDiv'
>
      <img src={Logo} alt="" />
    </motion.div>
  )
}

export default Landing
