import React, { useContext, useRef, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'
import M from 'materialize-css'

const NavBar = () => {
  const modal = useRef(null)
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()
  const [search, setSearch] = useState('tmp')

  useEffect(() => {
    M.Modal.init(modal.current)
    console.log('init....')
  }, [])

  const renderList = () => {
    if (localStorage.getItem('user')) {
      return (
        <React.Fragment>
          <li>
            <a data-target='modal1' className='modal-trigger'>
              <i style={{ marginTop: '2px' }} className='large material-icons'>
                search
              </i>
            </a>
          </li>
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
    <React.Fragment>
      <nav>
        <div className='nav-wrapper'>
          <Link
            to='/'
            style={{ marginLeft: '20px' }}
            className='brand-logo left'
          >
            Instagram &nbsp;2.0
          </Link>
          <ul id='nav-mobile' className='right'>
            {renderList()}
          </ul>
        </div>
      </nav>
      <div id='modal1' className='modal' ref={modal}>
        <div className='modal-content' style={{ color: 'black' }}>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type='text'
            placeholder='search users'
            value={search}
          ></input>
          <ul
            className='collection'
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <li className='collection-item'>Alvin</li>
            <li className='collection-item'>Alvin</li>
            <li className='collection-item'>Alvin</li>
            <li className='collection-item'>Alvin</li>
            <li className='collection-item'>Alvin</li>
            <li className='collection-item'>Alvin</li>
            <li className='collection-item'>Alvin</li>
            <li className='collection-item'>Alvin</li>
            <li className='collection-item'>Alvin</li>
            <li className='collection-item'>Alvin</li>
            <li className='collection-item'>Alvin</li>
            <li className='collection-item'>Alvin</li>
          </ul>
        </div>
        <div className='modal-footer'>
          <a
            href='#!'
            className='modal-close waves-effect waves-green btn-flat'
          >
            Agree
          </a>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NavBar
