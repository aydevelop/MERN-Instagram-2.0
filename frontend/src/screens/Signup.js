import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'

const SignUp = () => {
  const history = useHistory()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [avatar, setAvatar] = useState('')

  const uploadAvatar = async () => {
    const data = new FormData()
    data.append('file', avatar)
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_API_KEY)

    const cloudinary = await fetch(
      'https://api.cloudinary.com/v1_1/dkc4cdo9u/upload',
      {
        method: 'post',
        body: data,
      }
    )
    const { url } = await cloudinary.json()
    return url
  }

  const postData = async () => {
    let avatarUrl = ''
    if (avatar) {
      avatarUrl = await uploadAvatar()
    }

    const re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!re.test(email)) {
      M.toast({ html: 'invalid email' })
      return
    }

    fetch('http://localhost:5000/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        password,
        email,
        avatar: avatarUrl,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          M.toast({ html: res.error })
        } else {
          M.toast({ html: 'saved successfully', classes: 'green dark-1' })
          history.push('/login')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className='mycard'>
      <div className='card auth-card'>
        <h4 className='brand-logo'>Instagram 2.0 {avatar && typeof avatar}</h4>
        <input
          type='text'
          placeholder='Name'
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='file-field input-field'>
          <div
            className='btn'
            style={{ lineHeight: '2rem', height: 'auto', marginTop: '10px' }}
          >
            <span>Avatar</span>
            <input type='file' onChange={(e) => setAvatar(e.target.files[0])} />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
        <button
          style={{ marginTop: '20px' }}
          className='btn waves-effect waves-light'
          onClick={postData}
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
