import React, { useEffect, useState } from 'react'
import './purchase.css'
import {BiSolidOffer} from 'react-icons/bi'
import {CiLocationOn} from 'react-icons/ci'
import {CiDeliveryTruck} from 'react-icons/ci'
import {GiPayMoney, GiReturnArrow, GiTrophyCup} from 'react-icons/gi'
import {GrSecure} from 'react-icons/gr'

const Purchase = ({items}) => {
  const exclusive = {
    freeDelivery : [<CiDeliveryTruck style = {{height:"5rem",widht:"5rem"}}/>,"Free Delivery"],
    payOnDelivery : [<GiPayMoney />,"Pay on delivery"],
    returnExchange : [<GiReturnArrow />,"return & Exchange"],
    delivery : [<CiDeliveryTruck />,"PixelMarket Delivered"],
    secureTranscation : [<GrSecure />,"Secure transcation"],
    topBrand : [<GiTrophyCup />,"Top brand"]
  }
  
  const item = items
  const [imageShow, setImageShow] = useState("")
  const [colorShow, setColorShow] = useState("")
  const [size, setSize] = useState("")
  const [productQuantity, setProductQuantity] = useState("1")
  const selectImage = (imagePath) => {
    setImageShow(imagePath)
  }

  useEffect(() => {
    setImageShow(item.allImages[0])
    setColorShow(item.colors && item.colors[0])
  },[])
  
  const showColor =(color) => {
    setColorShow(color)
  }

  const changeSize = (event) => {
    setSize(event.target.value)
  }

  const addToCart = () => {
    /*  item,showColor,size,ProductQuantity */
    const cartItem = {...item}

    cartItem.colors = showColor
    console.log(cartItem);

    
  }

  return (
    <div className='purchase'>
      <nav className='top'>
        &lt; back to results
      </nav>
      <div className="purchase-grid">
        <div className="img-column">
          <div className="images">
            {item.allImages.map((image, index )=> (
              <div className="all-images" key={index}>
                <img src={image} alt={index} onMouseEnter={(()=>selectImage(image))} onClick={(()=>selectImage(image))}width="100%"/>
              </div>
            ))}
          </div>
          <div className="preview">
            <img src={imageShow} alt="previewing" width="100%"/>
          </div>
        </div>
        <div className="description-column">
          <a href="https://chat.openai.com/c/70696914-91b5-4b2e-9f8b-7c0084cbda6f" className="store">visit the {item.brand} store</a>
          <p className='product-title'>{item.brand} {item.itemDescription}</p>
          <hr className="border" />
          {item.deals && <p className='deals'>{item.deals}</p>}
          <p className='price-tag'>
            <span className='discount'>-{Math.round(100 - ((item.price/item.mrp)*100))}%</span> 
            <span className='price-design'> &#8377;</span>
            <span className='actual-price'>{item.price}</span>
          </p>
          <p className='mrp-price'>M.R.P: <span> &#8377;{item.mrp}</span></p>
          <p className="tax">Inclusive all taxes</p>
          <hr className="border" />
          {item.offers && <>
            <p className='offer'><BiSolidOffer className='offer-icon'/> Offers</p>
            <div className="product-offers">
              {Object.entries(item.offers).map(([category, items]) => (
                <div className="offer" key={category}>
                  {items.map((item, index )=> (
                    <p key={index} className= {`offer${index}`}>{item}</p> 
                  ))}
                </div>
              ))}
            </div>
          </>}  
          {item.offers && <hr className="border" />} 
          <div className="exclusive-container">
            {item.productExclusive && item.productExclusive.map((item,index) => (
            <div key={index} className="exclusive-features">
              <div className='exclusive-image'>{exclusive[item] && exclusive[item][0]}</div>
              <p className='exclusive-content'>{exclusive[item] && exclusive[item][1]}</p>
            </div>
          ))}
        </div>
        {item.productExclusive && <hr className="border" />}
        <div className="size">
          <p className="size-heading">
            Size:
          </p>
          <select value={size} onChange={changeSize}name="size-fix" className="size-fix">
            <option value="select" selected>select</option>
            {item.availSize.map(size=> (
              <option  value={size}>{size}</option>
            ))}
          </select>
        </div>
        {item.colors && 
        <>
          <p className='color'>Colors: {colorShow}</p>
          <div className="color-variants">
          {item.colors && item.colors.map((color, index) => (
            <div key={index} className="color-palettes"style={{backgroundColor:color}} onMouseEnter={() => showColor(color)}onClick={() => showColor(color)}></div>
          ))}
          </div>
        </>}
        <div className="description">
          <ul>
            {item.detailDescription.map((item, index)=> (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        </div>
        <div className="purchase-column">
          <div className="main-box">
            <p className='final-price'>
            <span className='price-design'> &#8377;</span>
            <span className='actual-price'>{item.price}</span>
            <span className='zeros'>00</span>
            </p>  
            <p>
              <a href="https://www.amazon.in/" className="free-delivery">Free delivery</a>
              <span className='delivery-date'> Thursday, 25 august</span>
              <br />
              <br />
              <p>
                Or fast delivery
                <span className="delivery-date"> Tommorow, 7 July</span>.
                order within
                <span className="order-timing"> 6 hr 15 mins</span>
              </p>
            </p>
            <p className='delivery-location'>
              <span className='location'><CiLocationOn className='location'/></span>
              <span className='location-content'>select delivery location</span>
            </p>
            <p className="stock">In stock</p>
            <p className="seller-details">
              sold by <span>{item.sellerDetails}</span>
            </p>
            <p className='quantity-box'>
              <span className="quantity-text">Quantity:</span>
              <input value={productQuantity} onChange={(e)=>setProductQuantity(e.target.value)} type="number" max="10"/>
            </p>
            <button className="add-to-cart" type='submit' onClick={addToCart()}>Add to cart</button><br />
            <button className="buy-now" type='submit'>Buy now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Purchase
