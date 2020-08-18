import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const [data, setData] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const { userId } = useParams()

  const getMyPosts = window.try(async () => {
    const posts = await fetch(`/user/${userId}`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })

    const result = await posts.json()
    if (result.data) {
      setData(result.data)
      console.log(JSON.stringify(result.data))
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
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h4>{data.user?.name}</h4>
            <h5>{data.user?.email}</h5>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h6>
              <b>{data.posts?.length}</b> posts
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
        {data.posts?.map((item) => {
          return <img key={item._id} alt='' className='item' src={item.photo} />
        })}
      </div>
    </div>
  )
}

export default UserProfile
