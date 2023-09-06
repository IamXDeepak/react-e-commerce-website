import React, { useContext, useRef, useState } from 'react'
import './tshirt.css'
import ServerData from '../Data/ServerData'
import { Link } from 'react-router-dom'


const TShirt = ({setResultItem}) => {

  const {tShirts} = useContext(ServerData)
  let sorting = useRef()
  const [brandNames, setBrandNames] = useState([])
  const [priceDisplay, setPriceDisplay] = useState([])

  const focusSort = () => {
    const event = new Event('mousedown', { bubbles: true });
    sorting.current.dispatchEvent(event);
  }

  const percentageCalc = (price,mrp) => {
    const percentage = (price/mrp)*100
    const discount = 100 - percentage

    return Math.round(discount)
  }

  const linkstyle ={
    textDecoration : 'none',
    color : 'black'
  }

  const brandClicked = (event) => {
    const brandName = event.target.value
    const isChecked = event.target.checked
    if (isChecked === true) {
      if(brandNames.length === 0)
        setBrandNames(brandName)
      const update = [...brandNames,brandName]
      setBrandNames(update)
    }
    else {
      const update = brandNames.filter(i => i !== brandName);
      setBrandNames(update)
    }
  }

  const selectedItem = (item) => {
    setResultItem(item)
  }

  const resultShown = tShirts.reduce((totalCount, item) => {
        if(brandNames.includes(item.brand))
          totalCount++
        return totalCount
      },0)

  let resultIds = []
  const matchPrice = (min,max) => {
    setPriceDisplay([])
    resultIds = []
    resultIds.push(`min:${min}`)
    resultIds.push()
    if(min === 0) {
      resultIds.push(tShirts.reduce((temp,item) => {
        if(item.price < max)
          temp.push(item.id)
        return temp
      },[]))
    }
    else if(min >= 300 && max <=500) {
      resultIds.push(tShirts.reduce((temp,item) => {
        if(item.price >= min && item.price < max)
          temp.push(item.id)
        return temp
      },[]))
    }
    else if(min >=500 && max <= 1000) {
      resultIds.push(tShirts.reduce((temp,item) => {
        if(item.price >=min && item.price < max)
          temp.push(item.id)
        return temp
      },[]))
    }
    else if(min >= 1000 && max <= 1500) {
      resultIds.push(tShirts.reduce((temp,item) => {
        if(item.price >=min && item.price < max)
          temp.push(item.id)
        return temp
      },[]))
    }
    else{
      resultIds.push(tShirts.reduce((temp,item) => {
        if(item.price >=min)
          temp.push(item.id)
        return temp
      },[]))
    }
    console.log(resultIds)
    setPriceDisplay(resultIds)
    return resultIds  
  }
  
  const markValue = {
    color: "red"
  }

  return (
    <div className='tshirt'>
      <div className="top-panel">
        <div className="left">
          <p>{brandNames.length>0 ? resultShown : tShirts.length-1} results from <span>"{tShirts.find(item => item.id === 0)?.categoryName}"</span></p>
        </div>
        <div className="right">
          <div className='sort' onClick={focusSort}> sort by:
            <select name="sort-By : " id="" ref={sorting}>
              <option value="price_low_to_high">Price : low to high</option>
              <option value="price_high_to_low">Price : high to low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="main-component">
        <div className="categories">
          <h5>Category</h5>
          <h5>Brands</h5>
          <div className="brands">
            {tShirts[0].brands && tShirts[0].brands.map((brand, index)=> (
               <React.Fragment key={index}>
                <input 
                  type="checkbox" 
                  value={brand} 
                  onChange={(e => brandClicked(e))}/><label>{brand}</label><br/>
              </React.Fragment> 
            )) }
          </div>
          <div className="price">
            <h5>Price</h5>
            <p onClick={() => matchPrice(0,300) } style={markValue}>Under &#8377;300</p>
            <p onClick={() => matchPrice(300,500) } style={markValue}>&#8377;300 - &#8377;500</p>
            <p onClick={() => matchPrice(500,1000) } style={markValue}>&#8377;500 - &#8377;1000</p>
            <p onClick={() => matchPrice(1000,1500) } style={markValue}>&#8377;1000 - &#8377;1500</p>
            <p onClick={() => matchPrice(1500,0) } style={markValue}>Over &#8377;1500</p>
            <form action="" className='price-range'>
              <div className="min-val val-box">
                <span>&#8377; </span>
                <input type="text" name="" id="minimum" className='val-inp' placeholder='Min'/>
              </div>
              <div className="max-val val-box">
                <span>&#8377; </span>
                <input type="text" name="" id="maximum" className='val-inp'placeholder='Max'/>
              </div>
              <button>Go</button>
            </form>
          </div>
        </div>
        <div className="products">
          {tShirts.slice(1)
          .filter(item => brandNames.includes(item.brand) || priceDisplay.includes(item.id) || brandNames.length === 0 )
          .map(item => (
            <div className="border-container" key={item.id}>
              <Link to="/purchase" onClick={()=>selectedItem(item)} style={linkstyle} key={item.id}><img src={item.itemPath} alt={item.name} align = "center"/></Link>
              <div className="contents">
                <div className="color">
                  {item.colors && item.colors.map(color => (
                    <Link to="/purchase" onClick={()=>selectedItem(item)}style={linkstyle} key={color}><div className="product-colors" style={{backgroundColor:color}}></div></Link>
                  ))}
                </div>
                <p className='item-brand'>{item.brand}</p>
                <Link to="/purchase" onClick={()=>selectedItem(item)} style={linkstyle} key={item.id}><p className='item-description'>{item.itemDescription}</p></Link>
                {item.deals && <p className='deals'>{item.deals}</p>}
                <p className='item-price'>
                <Link to="/purchase" onClick={()=>selectedItem(item)}style={linkstyle} key={item.id}><label className='price-symbol'>&#8377;</label>
                  <span className='main-price'>{item.price}</span>
                  <span className='mrp'>M.R.P:</span>
                  <span className='mrp strike'>&#8377;{item.mrp}</span></Link>
                  <span className='percentage'>({percentageCalc(item.price,item.mrp)}% off)</span>
                </p>
                {item.coupon && <p>{item.coupon}</p>}
                <p className="item-delivery-type">{item.deliveryType}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TShirt