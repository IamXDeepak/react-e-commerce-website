import React, { useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import './error.css'
import ServerData from '../Data/ServerData';

const Error = ({setIsLogin}) => {
    const {companyImages} = useContext(ServerData)
    useEffect(() => {
        setIsLogin(true)
    },[])
    const getProductImagePath = (productId) => {
        const product = companyImages.find(product => product.id === productId);
        return product ? product.imagePath : '';
    };
    const changeLogin = () => {
            setIsLogin(false)
        }
    
  return (
    <div className='error'>
        <img className="companyPic"src={getProductImagePath(1)} alt="Logo" width="100px"/>
        <div className="error-box">
          <p className="error-title">Looking for something ?</p>
          <p className="error-content">We're sorry. The Web address you entered is not a functioning page on our site.</p>
          <br />
          <p className="redirect" onClick={changeLogin}>Go to PixelMarket.in <Link to='/'>Home</Link></p>
        </div>
    </div>
  )
}

export default Error