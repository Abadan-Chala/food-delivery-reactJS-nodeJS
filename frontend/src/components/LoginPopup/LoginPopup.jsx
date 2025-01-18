import React, { useState } from 'react'
import './LoginPopup.css'
import close from '../../assets/close.png'

const LoginPopup = ({ setShowLogin }) => {

    const [currentState, setCurrentState] = useState("Sign Up")
  return (
    <div className='login-popup'>
        <form className="login-popup-container">
            <div className="login-popup-title">
                <h1>{currentState}</h1>
                <img onClick={()=>setShowLogin(false)} src={close} alt="" />
            </div>
            <div className="login-popup-inputs">
              {currentState==="Login"?<></>:<input type="text" placeholder='Your name' required />
}
              <input type="email" placeholder='Your email' required />
              <input type="password" placeholder='Password' required />
            </div>
            <button>{currentState==="Sign Up"?"Create account":"Login"}</button>
            <div className="login-popup-condition">
              <input type="checkbox" required />
              <p>I agree to the terms of use & privacy policy</p>
            </div>
            {currentState==="Login"
            ?<p>Create a new account? <span onClick={()=>setCurrentState("Sing Up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setCurrentState("Login")}>Login here</span></p>
            }  
        </form>
    </div>
  )
}

export default LoginPopup
