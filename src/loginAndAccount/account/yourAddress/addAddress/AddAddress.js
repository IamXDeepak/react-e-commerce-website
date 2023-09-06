import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './addaddress.css'
import ServerData from '../../../../Data/ServerData'
import UserLoginData from '../../../../Data/UserLoginData'
import apiRequest from '../../../../api/apiRequest'
import apiGet from '../../../../api/apiGet'


const AddAddress = () => {
  const {companyImages, loginData} = useContext(ServerData)
  const {formData, setFormData} = useContext(UserLoginData)
  const [addPreference, setAddPreference] = useState(false)
  const [doNotDistrub, setDoNotDistrub] = useState(false)
  const [deliveryDays, setDeliveryDays] = useState(false)
  const [additional, setAdditional] = useState(false)
  const countryData = companyImages.find(image => image.name === 'country');
  const countries = countryData ? countryData.countries : [];
  const stateData = companyImages.find(image => image.name === 'state');
  const states = stateData? stateData.states : [];
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'defaultAddress') {
        // For single checkbox
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked ? value : '',
        }));
      } else {
        // For multiple checkboxes
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked
            ? [...prevData[name], value]
            : prevData[name].filter((item) => item !== value),
        }));
      }
    } else if (type === 'radio') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      e.preventDefault()
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const viewOrHide = (e,input) => {
    e.preventDefault()
    if(input === 'add-preference') {
      if(!addPreference)
        setAddPreference(true)
      else
        setAddPreference(false)
    }
    if(input === 'do-not-distrub') {
      if(!doNotDistrub){
        setDeliveryDays(false)
        setAdditional(false)
        setDoNotDistrub(true)
      }
      else
        setDoNotDistrub(false)
    }
    if(input === 'delivery-day') {
      if(!deliveryDays) {
        setDeliveryDays(true)
        setAdditional(false)
        setDoNotDistrub(false)
      }
      else
        setDeliveryDays(false)
    }
    if(input === 'additional')
      if(!additional) {
        setDeliveryDays(false)
        setAdditional(true)
        setDoNotDistrub(false)
      }
      else
        setAdditional(false)
  }

  const getCurrentUser = async() => {
    const user = JSON.parse(localStorage.getItem('login data'))
    const userId = user[0].id
    const userData = await apiGet(`http://localhost:3500/loginCredentials/${userId}`)
    return userData
  }

  const addAddress = async(e) => { 
    e.preventDefault();
    const currentUser = await getCurrentUser()
    const URL = ` http://localhost:3500/loginCredentials/${currentUser.id}`
    const oldAddress = currentUser.address
    const addressId = oldAddress.length ? (oldAddress[oldAddress.length  - 1].id + 1 ): 1
    setFormData((prevData) => ({
      ...prevData,
      ['id']: addressId,
    }));
    const newAddress = [...oldAddress, formData]
    const option = {
      method : 'PATCH',
      headers : { 'content-type' :'application/json'},
      body : JSON.stringify({address : newAddress}),
    }
    await apiRequest(URL, option)
    navigate('/account/your-address')
  };
  

  return (
    <div className='new-address'>
      <h1 className='new-address-title'>Add a New Address</h1>
      <form className='new-address-form'>
        <label htmlFor="country" className='text'>Country/Region</label><br />
        <select name="country" value={formData.country} onChange={(e)=>handleChange(e)}id="country" className='dropbox' defaultValue='India'>
          {countries.map((country) => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>
        <br />
        <div className="name">
          <div className="firstname">
            <label htmlFor="fname" className='text'>First name</label><br />
            <input type="text" value={formData.fname} onChange={(e)=>handleChange(e)}className='address-input'name="fname" id="fname" /><br />
          </div>
          <div className="lastname">
            <label htmlFor="lname" className='text'>Last name</label><br />
            <input type="text" value={formData.lname} onChange={(e)=>handleChange(e)}className='address-input'name="lname" id="lname" /><br />
          </div>
        </div>   
          <label htmlFor="number" className='text'>mobile Number</label><br />
          <input type="text" value={formData.mobileNumber} onChange={(e)=>handleChange(e)}className='address-input'name="mobileNumber" id="number" /><br />
          
          <label htmlFor="pincode" className='text'>Pincode</label><br />
          <input type="text" value={formData.pincode} onChange={(e)=>handleChange(e)}className='address-input'name="pincode" id="pincode" maxLength="6"/><br />
          
          <label htmlFor="door-no" className='text'>Flat, House no., Building, Company, Apartment</label><br />
          <input type="text" value={formData.flatDoorNo} onChange={(e)=>handleChange(e)} className='address-input'name="flatDoorNo" id="door-no"/><br />
          
          <label htmlFor="street" className='text'>Area, Street, Sector, Village</label><br />
          <input type="text" value={formData.area} onChange={(e)=>handleChange(e)} className='address-input'name="area" id="street"/><br />
          
          <label htmlFor="landmark" className='text'>Landmark</label><br />
          <input type="text" value={formData.landMark} onChange={(e)=>handleChange(e)} className='address-input'name="landMark" id="landmark"/><br />
          
          <label htmlFor="Town/City" className='text'>Town/City</label><br />
          <input type="text" value={formData.city} onChange={(e)=>handleChange(e)} className='address-input'name="city" id="Town/City"/><br />
          
          <label htmlFor="state" className='text'>State</label><br />
          <select name="state" value={formData.state} onChange={(e)=>handleChange(e)}id="state" className='dropbox'>
          {states.map((state) => (
            <option key={state} value={state}>{state}</option>
          ))}
          </select><br />
          
          <p className='set-default'><input type="checkbox" value='default' checked={formData.defaultAddress.includes('default')} onChange={(e)=>handleChange(e)}name='defaultAddress' id='default-address' />Make this my default addres</p>
          <label htmlFor="Delivery-instruction" className='text'>Delivery instruction(optional)</label><br />
          <button className='text preference' onClick={(e)=>viewOrHide(e,'add-preference')}>Add preference, notes, access codes and more</button>
          {addPreference && 
          <div className='preference-content'>
            <p className=" text address-type">Please select an address type</p>
            <div className="address-types">
              <button value='House' onClick={(e)=>handleChange(e)} name='addressType' className='addresstype-button'>House</button>
              <button value='Apartment' onClick={(e)=>handleChange(e)} name='addressType' className='addresstype-button'>Apartment</button>
              <button value='Business' onClick={(e)=>handleChange(e)} name='addressType' className='addresstype-button'>Business</button>
              <button value='Other' onClick={(e)=>handleChange(e)} name='addressType' className='addresstype-button'>Other</button>
            </div>
            <div className="grid-display">
              <button className='text preference-button' onClick={(e)=>viewOrHide(e,'do-not-distrub')}>Select your do not disturb delivery preference</button>
              { doNotDistrub && <p>
                <input type="radio" value='Front door' onChange={(e)=>handleChange(e)}className='distrub-preference' name='doNotDistrub'/><label classname='input-label'htmlFor="front door">Front door</label><br />
                <input type="radio" value='With a security guard' onChange={(e)=>handleChange(e)}className='distrub-preference' name='doNotDistrub'/><label classname='input-label'htmlFor="security">With a security guard</label><br />
                <input type="radio" value='Mail room'onChange={(e)=>handleChange(e)}className='distrub-preference' name='doNotDistrub'/><label classname='input-label'htmlFor="mailroom">Mail room</label><br />
                <input type="radio" value='Turn off do not disturb delivery' onChange={(e)=>handleChange(e)}className='distrub-preference' name='doNotDistrub'/><label classname='input-label'htmlFor="turnoff">Turn off do not disturb delivery</label>
              </p>}
              <button className='text preference-button' onClick={(e)=>viewOrHide(e,'delivery-day')}>When is this address open for deliveries</button>
              {deliveryDays && <p>
                <input type="checkbox" value='Sunday' checked={formData.deliveryDays.includes('Sunday')}onChange={(e)=>handleChange(e)}className='delivery-days' name='deliveryDays'/><label classname='input-label'htmlFor="sunday">Sunday</label><br />
                <input type="checkbox" value='Monday' checked={formData.deliveryDays.includes('Monday')}onChange={(e)=>handleChange(e)}className='delivery-days' name='deliveryDays'/><label classname='input-label'htmlFor="monday">Monday</label><br />
                <input type="checkbox" value='Tuesday' checked={formData.deliveryDays.includes('Tuesday')}onChange={(e)=>handleChange(e)}className='delivery-days' name='deliveryDays'/><label classname='input-label'htmlFor="tuesday">Tuesday</label><br />
                <input type="checkbox" value='Wednesday' checked={formData.deliveryDays.includes('Wednesday')}onChange={(e)=>handleChange(e)}className='delivery-days' name='deliveryDays'/><label classname='input-label'htmlFor="wednesday">Wednesday</label><br />
                <input type="checkbox" value='Thursday' checked={formData.deliveryDays.includes('Thursday')}onChange={(e)=>handleChange(e)}className='delivery-days' name='deliveryDays'/><label classname='input-label'htmlFor="thursday">Thursday</label><br />
                <input type="checkbox" value='Friday' checked={formData.deliveryDays.includes('Friday')}onChange={(e)=>handleChange(e)}className='delivery-days' name='deliveryDays'/><label classname='input-label'htmlFor="friday">Friday</label><br />
                <input type="checkbox" value='Saturday' checked={formData.deliveryDays.includes('Saturday')}onChange={(e)=>handleChange(e)}className='delivery-days' name='deliveryDays'/><label classname='input-label'htmlFor="saturday">Saturday</label>  
              </p>}
              <button className='text preference-button' onClick={(e)=>viewOrHide(e,'additional')}>Share additional information to find this address</button>
              { additional && <textarea name='additionalInfo' value={formData.additionalInfo} onChange={(e)=>handleChange(e)}className='additional-details' placeholder='provide details such as building description, a nearby landmark, or other navigation instruction'></textarea>}
            </div>
          </div>}
          <br />
          <button className="submit-address" onClick={(e)=>addAddress(e)}>Add address</button>
      </form>
    </div>
  )
}

export default AddAddress