import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  return (
    <div className='mycard'>
      <div className='card auth-card'>
        <h4 className='brand-logo'>Instagram 2.0</h4>
        <input type='text' placeholder='Email' />
        <input type='text' placeholder='Password' />
        <button
          style={{ marginTop: '20px' }}
          className='btn waves-effect waves-light'
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
