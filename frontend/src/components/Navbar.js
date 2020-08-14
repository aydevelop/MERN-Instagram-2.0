import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <nav>
      <div className='nav-wrapper'>
        <a href='/' style={{ marginLeft: '20px' }} className='brand-logo left'>
          Instagram &nbsp;2.0
        </a>
        <ul id='nav-mobile' className='right'>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
