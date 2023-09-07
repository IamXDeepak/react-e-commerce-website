import React, { useEffect, useState } from 'react'
import './cart.css'
import UserLoginData from '../../Data/UserLoginData'
import { Link } from 'react-router-dom'

const Cart = () => {
    const free = "FREE"
    const[quantity, setQuantity] = useState("1")
    const [quantityInput, setQuantityInput] = useState("")
    const [totalQuantity, setTotalQuantity] = useState(1)
    const [price, setPrice] = useState([])
    const [total, setTotal] = useState(0)
    const [checkBoxValue, setCheckBoxValue] = useState(true)
    const [updateButton, setupdateButton] = useState("")
    const size = "XL"
    const colorShow = "blue"
    const [lessThan10, setLessThan10] = useState("true")
    const cart = [
        {
            "id": 1,
            "name": "tshirt-max-black",
            "itemPath": "../../images/tshirt-max-black.webp",
            "allImages": [
              "../../images/tshirt-max-black.webp",
              "../../images/tshirt-max-black.webp",
              "../../images/tshirt-max-black.webp",
              "../../images/tshirt-max-black.webp"
            ],
            "offers": {
              "offer1": [
                "Partner Offers",
                "Buy 3Get 5% off,",
                "Buy 4 Get 10% off"
              ],
              "offer2": [
                "No Cost EMI",
                "Avil no Cost EMI on select cards for orders above ₹3000"
              ],
              "offer3": [
                "Bank Offer",
                "Upto ₹21.45 discount on HSBC Cashback credit card transcation"
              ]
            },
            "productExclusive": [
              "freeDelivery",
              "payOnDelivery",
              "returnExchange",
              "delivery",
              "secureTranscation"
            ],
            "brand": "Max",
            "colors": [
              "red",
              "blue",
              "orange",
              "green"
            ],
            "itemDescription": "Men solid Henleyneck regular fit T-Shirt",
            "deals": "Deal of the day",
            "price": "359",
            "mrp": "399",
            "deliveryType": "FREE delivery by PixelMarket",
            "detailDescription": [
              "sleek and versatile, this black Max T-shirt is a wardrobe essential for effortless style.",
              "Keep it simple and stylish with this classic black Max T-shirt, perfect for any casual occasion.",
              "A must-have staple, this black Max T-shirt offers a comfortable fit and endless outfit possibilities.",
              "Unleash your fashion-forward side with this black Max T-shirt, combining comfort and trendiness.",
              "Upgrade your basics with this black Max T-shirt, featuring a modern and minimalist design."
            ],
            "sellerDetails": "Hifi Retail"
          },
    ]
    
    useEffect(() => {
      cart.map(item => {
        const money = parseFloat(quantity) * parseFloat(item.price)
        const product = {id:item.id,quantity:quantity,price:money}
        {price.length>0 && price.find(id => id.id !== item.id) ? setPrice([...price,product]) : setPrice([product])}
      })
      if(quantity > 9 || quantity === 'more')
        setLessThan10('false')
      else
        setLessThan10('true')

    },[quantity])

    useEffect(() => {
      const totPrice = price.length > 0 ? price.reduce((total,item) => total + item.price, 0) : 0
      setTotal(totPrice)
      const totQuantity = price.length > 0 ? price.reduce((total, price) => total + parseFloat(price.quantity), 0) : 0
      setTotalQuantity(totQuantity)
    })

    const submitQuantity = (e) => {
      e.preventDefault()
      setupdateButton('none')
      if(quantityInput <= 9){
        setLessThan10('true')
        setQuantity(quantityInput)
      }
      else
      setQuantity(quantityInput)
    }
    const handleFocus = () => {
      setupdateButton("")
    }

    const selectedItem = (e) => {
      setCheckBoxValue(!checkBoxValue)
      const checkBox = e.target
      const id = checkBox.dataset.id
      addOrRemovePrice(id)
    }

    const addOrRemovePrice = (id) => {
      if(checkBoxValue === true) {
        const item = cart.filter(item => item.id === id)
        const specificPrice = parseFloat(item.price).toFixed(2)
        const addItem = {id,price:specificPrice,quantity}
        setPrice([...price,addItem])
      }
      else {
        const updatedPrice = price.length > 0 ? price.filter(item => item.id !== id) : []
        console.log(updatedPrice);
        setPrice(updatedPrice)
      }
    }

    const checkedOrNot = (e) => {
      if(!e.target.checked) {
        const id = e.target.dataset.id
        const item = price.filter(item => item.id !== id)
        setPrice(item)
      }
    }

  return (
    <div className="cart">
        <div className="cart-box">
            {cart && 
                <div className="non-empty-cart">
                    <h3 className='cart-heading'>Shopping Cart</h3>
                    <p className='delete-all'>Deselect all items</p>
                    <p className="price-column">Price</p>
                    <hr />
                    <div className="main-grid">
                    {cart.map(item => 
                    <React.Fragment key={item.id}>
                        <div className="column1">
                            <input type="checkbox" checked={checkBoxValue} data-id={item.id} onChange={(e)=>selectedItem(e)} onClick={(e)=>checkedOrNot(e)}/>
                            <img src={item.itemPath} alt={item.name} width="150px"/>
                        </div>
                        <div className="column2">
                          <p className='cart-main-title'>{item.brand} {item.itemDescription} {colorShow}_{size}</p>
                          <p className="cart-stock">In Stock</p>
                          {item.deliveryType.includes(free) && <p className='free-delivery'>Eligible for FREE Shipping</p>}
                          <p className='item-size'>Size: <span>{size}</span></p>
                          <p className="item-color">Color: <span>{colorShow}</span></p>
                          <div className="option-box">
                            {lessThan10 === 'true' ? <select name="quantity" defaultValue={quantity} className="quantity"value={quantity} onChange={(e)=>setQuantity(e.target.value)}>
                              <option value="1" >1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="more">10+</option>
                            </select>
                            : <>
                              <input type="number" onFocus={handleFocus} value={quantityInput} onChange={(e) => setQuantityInput(e.target.value)}className='extra-quantity'/>
                              <input type="submit" value="Update"className="update-button"onClick={(e) => submitQuantity(e)} style={{display:updateButton}}/>
                              </>
                            }
                            <button className='delete-product'>Delete</button>
                          </div> 
                        </div>
                        <div className="column3">
                            <p className="price-view"><span>&#8377;</span>{parseFloat(item.price).toFixed(2)}</p>
                        </div>
                        
                    </React.Fragment>)}
                    </div>
                    <div className="sub-total">
                      <p className='total-price'>Subtotal ({isNaN(totalQuantity) ? 0 : totalQuantity} {parseFloat(totalQuantity).lenght>1 ? "items" : "item"}):<span>&#8377;</span><span>{isNaN(total) ? 0 : total.toFixed(2)}</span></p>
                    </div>
                </div>
            }
            {!cart && 
                <div className="empty-cart">
                    <h3 className='empty-cart-heading cart-heading'>Your Cart is empty</h3>
                    <p className='empty-cart-content'>
                        Your shopping cart is empty.
                        Give it purpose-fill with groceries, clothes,
                        household supplies, electronics and more
                    </p>
                    <p className='empty-cart-content'>
                        continue shopping on <Link to="/">PixelMarket homepage</Link>

                    </p>
                </div>
            }
        </div>
    </div>
  )

    
}

export default Cart