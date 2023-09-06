import React from 'react'
import './confirmation.css'
import { useNavigate } from 'react-router-dom'

const Confirmation = ({setConfirmation,setUserInfo}) => {
    const navigate = useNavigate()

    const logout = () => {
        setUserInfo(null)
        localStorage.removeItem("login data")
        navigate('/')
    }
  return (
    <div className='overlay'>
        <div className='information'>
            <p className='logout-title'>confirm logout</p>
            <button onClick={()=>setConfirmation(false)}className="confirm-cancel">Cancel</button>
            <button onClick={logout}className="confirm-logout">Logout</button>
        </div>
    </div>
  )
}

export default Confirmation