import { Link } from 'react-router-dom'
import './form.css'
import {FiLogIn} from 'react-icons/fi'
import { useContext, useEffect, useState } from 'react'
import validator from 'validator'
import {useNavigate} from 'react-router-dom'
import ServerData from '../../Data/ServerData'
import UserLoginData from '../../Data/UserLoginData'
const LoginForm = ({setIsLogin}) => {
    const {setUserInfo} = useContext(UserLoginData)
    const navigate = useNavigate()
    const {loginData, companyImages} = useContext(ServerData)
    const [mailOrNumber, setMailOrNumber] = useState("")
    const [password, setPassword] = useState("")
    useEffect(() => {
        setIsLogin(true)
    },[])
    const checkUser = (e) => {
        e.preventDefault()
        if(validator.isMobilePhone(mailOrNumber))
            checkUserMobile()
        else if(validator.isEmail(mailOrNumber))
            checkUserMail()
        else
            alert("mail or number is incorrect")

    }
    const checkUserMobile = () => {
        const oldUser = loginData.find(data => data.phoneNumber === mailOrNumber)
        const passMatch = loginData.find(data => data.password === password)
        findOldOrNot(oldUser, passMatch)
    }

    const checkUserMail = () => {
        const oldUser = loginData.find(data => data.mailId === mailOrNumber)

        const passMatch = loginData.find(data => data.password === password)
        findOldOrNot(oldUser, passMatch)
    }

    const findOldOrNot = (oldUser, passMatch) => {
        if (oldUser && passMatch){
            setUserInfo(oldUser)
            const storeData = loginData.filter(data => data.name === oldUser.name)
            setUserInfo(storeData)
            console.log(storeData)
            localStorage.setItem("login data",JSON.stringify(storeData))
            setTimeout(() => {
                setPassword("")
                navigate('/');
                window.location.reload()
                setIsLogin(false)
              }, 500);
        }
        else {
            alert('Login fail') 
            window.location.reload()
        }
    }

    const getProductImagePath = (productId) => {
        const product = companyImages.find(product => product.id === productId);
        return product ? product.imagePath : '';
      };
    return (
        <div className="login-form">
            <div className="top-container" >
                <img src={getProductImagePath(1)} alt="company logo" />
                <p className='company-name'>PixelMarket</p>
            </div>
            
            <div className="middle-container">
                <h3><FiLogIn role = "svg" className='login-img'/>Login</h3>
                <form className='form'>
                    <label htmlFor="mail.id"><b>Email or Phone number</b></label><br />
                    <input type="text" id='mail-id'className='input-box'value = {mailOrNumber} onChange={(e) => (setMailOrNumber(e.target.value))}/><br />
                    <label htmlFor="password"><b>password</b></label>
                    <input type="password"id='password' className='input-box'value = {password} onChange={(e) => (setPassword(e.target.value))}/>
                    <input type="submit" onClick={e =>(checkUser(e))}/>
                </form>
            </div>
            <div className="bottom-container">
            <div className="line-container">
                <div className="line"></div>
                <div className="word">New</div>
            </div>
            <Link to = "/register"><button>Create your account</button></Link>
            </div>
            
        </div>
    )
}

export default LoginForm