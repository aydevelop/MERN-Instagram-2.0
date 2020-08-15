import React, { useState } from 'react'

const CreatePost = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

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
            <input type='file' />
          </div>
          <div className='file-path-wrapper'>
            <input className='file-path validate' type='text' />
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a className='waves-effect waves-light btn red lighten-1'>
            <i className='material-icons left'>image</i>Submit post
          </a>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
