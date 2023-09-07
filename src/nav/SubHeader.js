import React from 'react'
import './subheader.css'
import {TbCategory} from 'react-icons/tb'

const SubHeader = () => {
  return (
    <div className='sub-header'>
        <TbCategory role = "button" className='category-button'/>
        <p>Home & Kitchen</p>
        <p>Electronics</p>
        <p>Bags</p>
        <p>Toys</p>

    </div>
  )
}

export default SubHeader