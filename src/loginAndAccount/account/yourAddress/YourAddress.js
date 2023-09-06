import React, { useEffect, useState } from 'react'
import './youraddress.css'
import {CgMathPlus} from 'react-icons/cg'
import { Link } from 'react-router-dom'
import apiCurrentUser from '../../../api/apiCurrentUser'
import DeleteAddress from './deleteAddress/DeleteAddress'
const YourAddress = () => {
  const [currentAddress, setCurrentAddress] = useState([])
  const [remove, setRemove] = useState(false)
  const [address, setAddress] = useState()
  useEffect(() => {
    const getData = async() => {
      const currentUser = await apiCurrentUser()
      setCurrentAddress(currentUser.address)
    }
    getData();
  },[])
  const linkStyle = {
    textDecoration: 'none',
    color:'black'
  }

  const removeAddress = (id) =>{
    const address = currentAddress.find(data => data.id === id)
    setAddress(address)
    setRemove(true)
  }
  return (
    <div className='your-addresses'>
        <h2 className='address-heading'>Your Addresses</h2>
        <div className="address-box">
            <Link to="/account/your-address/add-address" style={linkStyle}>
              <div className="add-address youraddress">
                <CgMathPlus className='plus-icon'/>
                <p>Add address</p>
              </div>
            </Link>
            {currentAddress && 
              currentAddress.map(address => (
                <div className="youraddress" key={address.id}>
                  {address.defaultAddress === 'default' && <p className="yourAddress-default">Default</p>}
                  <hr />
                  <p className="my-address yourAddress-name">{address.fname} {address.lname}</p>
                  {address.flatDoorNo && <p className="my-address yourAddress-doorNo">{address.flatDoorNo}</p>}
                  {<p className="my-address yourAddress-area">{address.area}</p>}
                  {<p className='my-address yourAddress-landmark'>{address.landmark}</p>}
                  {<p className='my-address yourAddress-city'>{address.city}</p>}
                  {<p className='my-address yourAddress-state'>{address.state} {address.pincode}</p>}
                  {<p className='my-address yourAddress-country'>{address.country}</p>}
                  {<p className='my-address yourAddress-number'>Phone number : {address.mobileNumber}</p>}
                  <button className='yourAddress-edit'>Edit</button>
                  <button className='yourAddress-remove' onClick={()=>removeAddress(address.id)}>Remove</button>
                  {!address.defaultAddress && <button className='yourAddress-defaultAddress'>Set as Default</button>}
                </div>
              ))
            }
        </div>
        {remove && <DeleteAddress address={address} setRemove={setRemove}/>}
    </div>
  )
}

export default YourAddress