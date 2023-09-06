import { Link, useNavigate } from 'react-router-dom'
import validator from 'validator'
import './form.css'
import {HiOutlineInformationCircle} from 'react-icons/hi'
import { useContext, useEffect, useState } from 'react'
import UserLoginData from '../../Data/UserLoginData'
import apiRequest from '../../api/apiRequest'
import ServerData from '../../Data/ServerData'

const RegisterForm = ({setIsLogin}) => {
    const navigate = useNavigate()
    const {loginData, companyImages} = useContext(ServerData)
    const {name, setName, mailOrNumber, setMailOrNumber, password, setPassword,conformPass, setConformPass,setUserInfo} = useContext(UserLoginData)
    const URL = "http://localhost:3500/loginCredentials"

    useEffect(() => {
        setIsLogin(true)
    })
    const addUser = (e) => {
        e.preventDefault()
        const correctName = name.trim()
        setName(correctName)
        if (validator.isMobilePhone(mailOrNumber)) {
            validateUsingNumber()}
        else if(validator.isEmail(mailOrNumber))
            validateUsingMail()
        else 
            alert("mobile number or mail id is incorrect")
        
    }
    const validateUsingNumber = async() => {
        if(password.length >= 6 ) {
            if (password === conformPass){
                const id = loginData.length ? (loginData[loginData.length  - 1].id + 1 ): 1
                const addDetail = {id,name,mailId:"",phoneNumber:mailOrNumber,password,address:[],cart:[]}
                setUserInfo(addDetail)
                localStorage.setItem("login data",JSON.stringify(addDetail))
                const option = {
                    method : 'POST',
                    headers : { 'content-type' :'application/json'},
                    body : JSON.stringify(addDetail)
                }
                await apiRequest(URL,option)
                setName("")
                setMailOrNumber("")
                setPassword("")
                setConformPass("")
                navigate('/login');
                setIsLogin(false)
            } else
                alert("password or conform password no matched")
        } else {
            alert("password must contain atleast 6 characters")
        }

    }
    const validateUsingMail = async() => {
        if(password.length >= 6 ) {
            if (password === conformPass) {
                const id = loginData.length ? (loginData[loginData.length  - 1].id + 1 ): 1
                const addDetail = {id,name,mailId:mailOrNumber,phoneNumber:"",password,address:[],cart:[]}
                setUserInfo(addDetail)
                localStorage.setItem("login data",JSON.stringify(addDetail))
                const option = {
                    method : 'POST',
                    headers : { 'content-type' :'application/json'},
                    body : JSON.stringify(addDetail)
                }
                await apiRequest(URL,option)
                setName("")
                setMailOrNumber("")
                setPassword("")
                setConformPass("")
                navigate('/login');
                setIsLogin(false)
            }
            else
                alert("password or conform password no matched")
        } else {
            alert("password must contain atleast 6 characters")
        }
    }
    const getProductImagePath = (productId) => {
        const product = companyImages.find(product => product.id === productId);
        return product ? product.imagePath : '';
      };

    return (
        <div className="register-form">
            <div className="top-container">
                <img src={getProductImagePath(1)} alt="company logo" />
                <p className="company-name">PixelMarket</p>
            </div>
            
            <div className="middle-container">
                <h3>Create Account</h3>
                <form className='form'>
                    <label htmlFor="name"><b>Your name</b></label><br />
                    <input type="text" id='name'className='input-box'placeholder='First and last name'value={name}onChange={e => (setName(e.target.value))}/><br />
                    <label htmlFor="mail.id"><b>Email or Mobile number</b></label><br />
                    <input type="text" id='mail-id'className='input-box'value={mailOrNumber}onChange={e => (setMailOrNumber(e.target.value))}/><br />
                    <label htmlFor="password"><b>password</b></label>
                    <input type="password"id='password' className='input-box'placeholder='Atleast 6 characters'value={password}onChange={e =>(setPassword(e.target.value))}/>
                    <div className="info">
                            <HiOutlineInformationCircle className='information-icon'/>
                            <label>Password must be at least 6 characters
                        </label>
                    </div>
                    <label htmlFor="password"><b>Re-enter password</b></label>
                    <input type="password"id='conform-password' className='input-box'placeholder='Atleast 6 characters'value={conformPass}onChange={e =>(setConformPass(e.target.value))}/>
                    <input type="submit" value='Continue'onClick={e => (addUser(e))}/>
                </form>
            </div>
            <div className="bottom-container">
            <div className="line-container">
                <div className="line"></div>
            </div>
            <label>Aldready have a account? </label>
            <Link to = "/login"><label>Sign in</label></Link>
            </div>
        </div>
    )
}

export default RegisterForm