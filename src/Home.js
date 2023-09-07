import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import './home.css'
import ServerData from './Data/ServerData';
const Home = () => {
  const {homeProductImages} = useContext(ServerData)

  const linkstyle ={
    textDecoration : 'none',
    color : 'black'
  }
  return (
    <div className='home'>
      <div className='home-products'>
      {Object.entries(homeProductImages).map(([category, items]) => (
          <div className="outside-container"key={category}>
            <h4>{items.find(item => item.id === 0)?.category}</h4>
            <div className='inner-grid'>
            {items.slice(1).map(item => (
                <Link to = {item.link} style={linkstyle} key={item.id}>
                  <div className="inside-container"key={item.id}>
                    <img src={item.imagePath} alt={item.name} />
                    <p>{item.name}</p>
                  </div>
                </Link>
              ))}
            </div>
            <Link to={items.find(item => item.id === 0)?.link}style={linkstyle} key={items.find((item) => item.id === 0)?.link}>
              <p className='div-link'>{items.find(item => item.id === 0)?.linkName}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home