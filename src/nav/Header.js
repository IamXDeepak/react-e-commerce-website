import './header.css'
import {VscAccount} from 'react-icons/vsc'
import {RiShoppingCart2Line} from 'react-icons/ri'
import {HiDevicePhoneMobile} from 'react-icons/hi2'
import {BsSearch} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { useContext,useEffect } from 'react'
import UserLoginData from '../Data/UserLoginData'
import ServerData, { LoginData } from '../Data/ServerData'


const Header = ({userPersonal}) => {
    const {userInfo,setUserInfo} = useContext(UserLoginData)
    const {companyImages} = useContext(ServerData)
    useEffect(() =>{
        setUserInfo(userPersonal)
    })
    const getProductImagePath = (productId) => {
        const product = companyImages.find(product => product.id === productId);
        return product ? product.imagePath : '';
      };
    return (
        <nav>
            <div className="main-heading">
                <Link to = "/"><img src={getProductImagePath(1)} alt="Logo" width="100px"/></Link>
                <div className="search-box">
                <input type="text" placeholder='search for derss, electronics, etc...'/>
                <button type="submit" onClick = {(e) => (e.preventDefault())}><BsSearch className='search-button'/></button>
                </div>
                <ul>
                    <li className='download'>
                        <HiDevicePhoneMobile role = "image"className='mobile'/>
                        <p>Download app</p>
                    </li>
                    <li><Link to = "/account"><VscAccount className='login-account' role='button'/></Link>
                        {<span className='username'>{userInfo && userInfo.name}</span>}
                    </li>
                    <li><Link to="/cart"><RiShoppingCart2Line className='cart-icon' role='button'/></Link></li>

                </ul>
            </div>
            <div className="categories">

            </div>
        </nav>
  )
}

export default Header