import React from 'react'

const Home = () => {
  return (
    <div className='home'>
      <div className='card home-card'>
        <div style={{ textAlign: 'center', paddingTop: '1px' }}>
          <h5>Ramesh</h5>
        </div>
        <div className='card-image'>
          <img
            alt=''
            className='item'
            src='https://images.unsplash.com/photo-1597117489038-bba57da6c58f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80'
          />
        </div>
        <div className='card-content'>
          <i className='material-icons' style={{ color: '#e53935' }}>
            favorite
          </i>
          <h6>title</h6>
          <p>this is amazing post</p>
          <input type='text' placeholder='add a comment' />
        </div>
      </div>
      <div className='card home-card'>
        <h5>Ramesh</h5>
        <div className='card-image'>
          <img
            alt=''
            className='item'
            src='https://images.unsplash.com/photo-1597117489038-bba57da6c58f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80'
          />
        </div>
        <div className='card-content'>
          <h6>title</h6>
          <p>this is amazing post</p>
          <input type='text' placeholder='add a comment' />
        </div>
      </div>
    </div>
  )
}

export default Home
