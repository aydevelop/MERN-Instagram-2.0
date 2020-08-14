import React from 'react'

const CreatePost = () => {
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
        <input type='text' placeholder='title' />
        <input type='text' placeholder='body' />
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
          <a class='waves-effect waves-light btn red lighten-1'>
            <i class='material-icons left'>image</i>Submit post
          </a>
        </div>
      </div>
    </div>
  )
}

export default CreatePost
