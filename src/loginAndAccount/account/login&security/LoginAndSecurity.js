import React, { useState } from 'react'
import './loginandsecurity.css'
import { Link } from 'react-router-dom'
import Confirmation from './Confirmation'

const LoginAndSecurity = ({userInfo,setUserInfo}) => {
  const passChar = '*'
  const [confirmation, setConfirmation] = useState(false)

  const linkStyle = {
    texDecoration : 'none',
    color : 'black'
  }

  const password = passChar.repeat(userInfo.password.length)
  return (
    <div className='login-and-security'>
      <h1>Login & security</h1>
      <div className="outer-box">
        <div className="inner-box">
          <p className="title">Name:</p>
          <p className="value">{userInfo.name}</p>
          <button className="submit">Edit</button>
        </div>
        <div className="inner-box">
        <p className="title">Primary phone number:</p>
        <p className="value">{userInfo.phoneNumber}</p>
        <p className="content">
          Quickly sign in, easily recovered password, and receive security notification
          with this mobile number.
        </p>
        <button className="submit">Edit</button>
        </div>
        <div className="inner-box">
        <p className="title">Email:</p>
        <p className="value">{userInfo.mailId}</p>
        <p className="content">
          For stronger account security,add your email, if there is an unusual sign-in, 
          we can email you and verify thats really you.
        </p>
        <button className="submit">Add</button>
        </div>
        <div className="inner-box">
        <p className="title">Password:</p>
        <p className="value">{password}</p>
        <button className="submit">Edit</button>
        </div>
        <div className="inner-box">
        <p className="title">2-step verification:</p>
        <p className="content">
          Add a layer of security.Require verification code in addition to your password
        </p>
        <button className="submit">Turn on</button>
        </div> 
      </div>
      <Link to="/account" style={linkStyle}><button className="buttons done">Done</button></Link>
      <button onClick={()=>setConfirmation(true)}className='buttons logout'>Logout</button>
      {confirmation && <Confirmation setConfirmation={setConfirmation} setUserInfo={setUserInfo}/>
      }
    </div>
  )
}

export default LoginAndSecurity