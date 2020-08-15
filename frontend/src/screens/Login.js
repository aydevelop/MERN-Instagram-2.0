import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const Login = () => {
  const history = useHistory()
  const [password, setPassword] = useState('test@mail.com')
  const [email, setEmail] = useState('test@mail.com')

  const postData = window.try(async () => {
    const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(email)) {
      return M.toast({ html: 'invalid email' })
    }

    let res = await fetch('http://localhost:5000/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        password,
        email,
      }),
    })

    let json = await res.json()
    if (json.error) {
      M.toast({ html: json.error })
    } else {
      M.toast({ html: 'login successfully', classes: 'green dark-1' })
      history.push('/')
    }
  })

  return (
    <div className='mycard'>
      <div className='card auth-card'>
        <h4 className='brand-logo'>Instagram 2.0</h4>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='text'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          style={{ marginTop: '20px' }}
          className='btn waves-effect waves-light'
          onClick={postData}
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
