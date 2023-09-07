import React from 'react'
import './deleteAddress.css'
import apiCurrentUser from '../../../../api/apiCurrentUser'
import apiRequest from '../../../../api/apiRequest'


const DeleteAddress = ({address, setRemove}) => {

  const removeAddress = async(id) => {
      const currentUser = await apiCurrentUser()
      const userAddress = currentUser.address.filter(address => address.id !== id)
      const option = {
        method : 'PATCH',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify({address : userAddress})
      }
      const URL = `http://localhost:3500/loginCredentials/${currentUser.id}`
      await apiRequest(URL, option)
      setRemove(false)
      window.location.reload()
  }
  return (
    <div className='overlay'>
        <div className="info-box">
            <div className="youraddress deleteAddress" key={address.id}>
                <p className=''>Confirm deletion</p>
                <hr />
                    <p className="my-address yourAddress-name">{address.fname} {address.lname}</p>
                    {address.flatDoorNo && <p className="my-address yourAddress-doorNo">{address.flatDoorNo}</p>}
                    {<p className="my-address yourAddress-area">{address.area}</p>}
                    {<p className='my-address yourAddress-landmark'>{address.landmark}</p>}
                    {<p className='my-address yourAddress-city'>{address.city}</p>}
                    {<p className='my-address yourAddress-state'>{address.state} {address.pincode}</p>}
                    {<p className='my-address yourAddress-country'>{address.country}</p>}
                    {<p className='my-address yourAddress-number'>Phone number : {address.mobileNumber}</p>}
                    <button className='cancel-delete' onClick={()=>setRemove(false)}>Cancel</button>
                    <button className='delete-address' onClick={()=>removeAddress(address.id)}>Remove</button>
            </div>
        </div>
    </div>
  )
}

export default DeleteAddress