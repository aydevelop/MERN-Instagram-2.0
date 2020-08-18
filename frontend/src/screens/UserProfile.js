import React, { useState, useEffect, useContext } from 'react'
import { UserContext } from '../App'
import { useParams } from 'react-router-dom'

const UserProfile = () => {
  const [profile, setProfile] = useState({})
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
      setProfile(result.data)
    }
  })

  const followUser = window.try(async () => {
    const result = await fetch('/follow', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })

    const jResult = await result.json()
    setProfile((prev) => {
      const p = { ...prev }
      p.user.followers = jResult.data.user.followers
      p.user.following = jResult.data.user.following
      return p
    })

    dispatch({ type: 'UPDATE', payload: jResult.data.user2 })
    localStorage.setItem('user', JSON.stringify(jResult.data.user2))
  })

  const unfollowUser = window.try(async () => {
    const result = await fetch('/unfollow', {
      method: 'post',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })

    const jResult = await result.json()
    setProfile((prev) => {
      const p = { ...prev }
      p.user.followers = jResult.data.user.followers
      p.user.following = jResult.data.user.following
      return p
    })

    dispatch({ type: 'UPDATE', payload: jResult.data.user2 })
    localStorage.setItem('user', JSON.stringify(jResult.data.user2))
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
            <h4>{profile.user?.name}</h4>
            <h5>{profile.user?.email}</h5>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h6>
              <b>{profile.posts?.length}</b> posts
            </h6>
            <h6>
              <b>{profile.user?.following?.length}</b> following
            </h6>
            <h6>
              <b>{profile.user?.followers?.length}</b> followers
            </h6>
            {!profile.user?.followers.includes(state?._id) ? (
              <button
                style={{ marginTop: '5px' }}
                className='btn-small waves-effect waves-light'
                onClick={followUser}
              >
                Follow
              </button>
            ) : (
              <button
                style={{ marginTop: '5px' }}
                className='btn-small waves-effect waves-light'
                onClick={unfollowUser}
              >
                UnFollow
              </button>
            )}
          </div>
        </div>
      </div>
      <div className='gallery'>
        {profile.posts?.map((item) => {
          return <img key={item._id} alt='' className='item' src={item.photo} />
        })}
      </div>
    </div>
  )
}

export default UserProfile
