import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='mycard'>
      <div className='card auth-card'>
        <h4>Instagram 2.0</h4>
        <input type='text' placeholder='Name' />
        <input type='text' placeholder='Email' />
        <input type='text' placeholder='Password' />
        <button
          style={{ marginTop: '20px' }}
          class='btn waves-effect waves-light'
        >
          SignUp
        </button>
        <h6>
          <Link to='/login'>Already have an account?</Link>
        </h6>
      </div>
    </div>
  )
}

export default SignUp
