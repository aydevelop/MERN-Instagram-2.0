import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../App'

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext)

  const renderList = () => {
    if (state) {
      return (
        <React.Fragment>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/create'>Create Post</Link>
          </li>
        </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/signup'>Signup</Link>
          </li>
        </React.Fragment>
      )
    }
  }

  return (
    <nav>
      <div className='nav-wrapper'>
        <a href='/' style={{ marginLeft: '20px' }} className='brand-logo left'>
          Instagram &nbsp;2.0
        </a>
        <ul id='nav-mobile' className='right'>
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
