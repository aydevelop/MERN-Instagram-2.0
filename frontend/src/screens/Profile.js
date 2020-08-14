import React from 'react'

const Profile = () => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          marginTop: '30px',
          paddingBottom: '10px',
          borderBottom: '1px solid gray',
        }}
      >
        <div>
          <img
            style={{ width: '130px', borderRadius: '80px' }}
            src={require('../assets/avatar.svg')}
            alt=''
          />
        </div>
        <div style={{ width: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h4>Ramesh Verma</h4>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h6>
              <b>40</b> posts
            </h6>
            <h6>
              <b>40</b> followers
            </h6>
            <h6>
              <b>40</b> following
            </h6>
          </div>
        </div>
      </div>

      <div className='gallery'>
        <img
          alt=''
          className='item'
          src='https://images.unsplash.com/photo-1597117489038-bba57da6c58f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80'
        />

        <img
          alt=''
          className='item'
          src='https://images.unsplash.com/photo-1597117489038-bba57da6c58f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80'
        />

        <img
          alt=''
          className='item'
          src='https://images.unsplash.com/photo-1597117489038-bba57da6c58f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80'
        />
        <img
          alt=''
          className='item'
          src='https://images.unsplash.com/photo-1597117489038-bba57da6c58f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80'
        />
        <img
          alt=''
          className='item'
          src='https://images.unsplash.com/photo-1597117489038-bba57da6c58f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80'
        />
      </div>
    </div>
  )
}

export default Profile
