import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='mycard'>
      <div className='card auth-card'>
        <h4>Instagram 2.0</h4>
        <input type='text' placeholder='Email' />
        <input type='text' placeholder='Password' />
        <button
          style={{ marginTop: '20px' }}
          class='btn waves-effect waves-light'
        >
          Login
        </button>
        <h6>
          <Link to='/signup'>Dont have an account?</Link>
        </h6>
      </div>
    </div>
  )
}

export default Login
