import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import M from 'materialize-css'

const CreatePost = () => {
  const history = useHistory()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [photo, setPhoto] = useState('')

  const postDetails = window.try(async () => {
    const data = new FormData()
    data.append('file', photo)
    data.append('upload_preset', 'hxilo3elfhxilo4elf')

    const cloudinary = await fetch(
      'https://api.cloudinary.com/v1_1/dkc4cdo9u/upload',
      {
        method: 'post',
        body: data,
      }
    )
    setPhoto(await cloudinary.json().url)

    const post = await fetch('http://localhost:5000/createpost', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        body,
        photo,
      }),
    })

    const postJson = await post.json()
    if (postJson.error) {
      M.toast({ html: postJson.error })
    } else {
      M.toast({ html: 'created post successfully', classes: 'green dark-1' })
    }
  })

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          marginTop: '7%',
          width: '100%',
          padding: '40px',
        }}
        className='card input-field'
      >
        <input
          type='text'
          placeholder='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <div className='file-field input-field'>
          <div className='btn'>
            <span>File</span>
            <input type='file' onChange={(e) => setPhoto(e.target.files[0])} />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a
            onClick={postDetails}
            className='waves-effect waves-light btn red lighten-1'
          >
            <i className='material-icons left'>image</i>Submit post
          </a>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
