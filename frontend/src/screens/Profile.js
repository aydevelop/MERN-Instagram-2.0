import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'

const Profile = () => {
  const [data, setData] = useState([])
  const { state, dispatch } = useContext(UserContext)

  const getMyPosts = window.try(async () => {
    const posts = await fetch('/myposts', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })

    const result = await posts.json()
    if (result.data) {
      setData(result.data)
    }
  })

  useEffect(() => {
    getMyPosts()
  }, [])

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
            <h4>{state ? state.name : 'loading'}</h4>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h6>
              <b>{data.length}</b> posts
            </h6>
            <h6>
              <b>{state?.following?.length}</b> following
            </h6>
            <h6>
              <b>{state?.followers?.length}</b> followers
            </h6>
          </div>
        </div>
      </div>

      <div className='gallery'>
        {data.map((item) => {
          return <img key={item._id} alt='' className='item' src={item.photo} />
        })}
      </div>
    </div>
  )
}

export default Profile
