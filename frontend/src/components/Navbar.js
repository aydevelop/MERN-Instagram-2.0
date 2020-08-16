import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()

  const renderList = () => {
    if (localStorage.getItem('user')) {
      return (
        <React.Fragment>
          <li>
            <Link to='/profile'>Profile</Link>
          </li>
          <li>
            <Link to='/create'>Create Post</Link>
          </li>
          <li>
            <a
              onClick={() => {
                localStorage.clear()
                dispatch({ type: 'CLEAR' })
                history.push('/login')
              }}
            >
              Logout
            </a>
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
        <Link to='/' style={{ marginLeft: '20px' }} className='brand-logo left'>
          Instagram &nbsp;2.0
        </Link>
        <ul id='nav-mobile' className='right'>
          {renderList()}
        </ul>
      </div>
    </nav>
  )
}

export default NavBar
