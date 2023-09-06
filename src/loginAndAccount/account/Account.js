import React from 'react'
import './account.css'
import {BsBox2} from 'react-icons/bs'
import {CiLock, CiLocationOn, CiCreditCard1} from 'react-icons/ci'
import {GiHeadphones} from 'react-icons/gi'
import { Link } from 'react-router-dom'
const Account = () => {

  const linkStyle = {
    textDecoration:'none',
    color : 'black'
  }
  return (
    <div className='account'>
      <h2>Your Account</h2>
      <div className="main-box" style={{border:"none"}}>
        <ul>
          <li>
            <Link to='/cart' style={linkStyle} >
              <div className="your-order box">
                <div className='image-box'><BsBox2 className='image'/></div>
                <div className='content'>
                  <h4>Your Orders</h4>
                  <p>Track, return, or buy things again</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/account/login&security" style={linkStyle}>
              <div className="login-security box">
                <div className='image-box'><CiLock className='image'/></div>
                <div className='content'>
                  <h4>Login & security</h4>
                  <p>Edit login, name, and mobile number</p>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/account/your-address" style={linkStyle}>
            <div className="your-address box">
              <div className='image-box'><CiLocationOn className='image'/></div>
              <div className='content'>
                <h4>Your address</h4>
                <p>Edit addresses for orders and gifts</p>
              </div>
            </div>
            </Link>
          </li>
          <li>
            <div className="payment-option box">
              <div className='image-box'><CiCreditCard1 className='image'/></div>
              <div className='content'>
                <h4>Payment options</h4>
                <p>Edit or add payment methods</p>
              </div>
            </div>
          </li>
          <li>
            <div className="contact-us box">
            <div className='image-box'><GiHeadphones className='image'/></div>
              <div className='content'>
                <h4>Contact Us</h4>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Account