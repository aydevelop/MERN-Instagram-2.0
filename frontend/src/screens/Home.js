import React, { useState, useEffect, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { UserContext } from '../App'

const Home = () => {
  const [data, setData] = useState([])
  const { state, dispatch } = useContext(UserContext)
  const history = useHistory()

  const getPosts = window.try(async () => {
    const posts = await fetch('/allpost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })

    const result = await posts.json()
    if (result.data) {
      setData(result.data.reverse())
    } else {
      history.push('/login')
    }
  })

  const likePost = window.try(async (e, id) => {
    e.preventDefault()
    const like = await fetch('/like', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })

    const jLike = await like.json()
    const newData = data.map((item) => {
      if (item._id === id) {
        return jLike.data
      }
      return item
    })

    setData(newData)
  })

  const unlikePost = window.try(async (e, id) => {
    e.preventDefault()
    let unlike = await fetch('/unlike', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })

    const jUnlike = await unlike.json()
    const newData = data.map((item) => {
      if (item._id === id) {
        return jUnlike.data
      }
      return item
    })

    setData(newData)
  })

  const makeComment = window.try(async (text, postId) => {
    let comment = await fetch('/comment', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId, text }),
    })

    let jComment = await comment.json()
    const newData = data.map((item) => {
      if (item._id === postId) {
        return jComment.data
      }
      return item
    })

    setData(newData)
  })

  const deletePost = window.try(async (postId) => {
    let post = await fetch(`/deletepost/${postId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })

    const newData = data.filter((item) => {
      return item._id !== postId
    })

    setData(newData)
  })

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className='home'>
      {data.map((item) => {
        return (
          <div key={item._id} className='card home-card'>
            <div style={{ float: 'left', marginLeft: '25px' }}>
              <h5>
                <Link to={'/profile/' + item.postedBy._id}>
                  {item.postedBy.name}
                </Link>
              </h5>
            </div>
            <div
              onClick={() => {
                deletePost(item._id)
              }}
              style={{
                textAlign: 'right',
                paddingRight: '10px',
                paddingTop: '3px',
                cursor: 'pointer',
              }}
            >
              {state?._id === item.postedBy._id ? (
                <h5>
                  <i className='material-icons'>delete</i>
                </h5>
              ) : (
                <h5>&nbsp;</h5>
              )}
            </div>
            <div className='card-image'>
              <img alt='' className='item' src={item.photo} />
            </div>
            <div className='card-content'>
              <i
                className='material-icons'
                style={{
                  color:
                    state && item.likes.includes(state._id)
                      ? '#e53935'
                      : 'gray',
                  position: 'relative',
                  top: '4px',
                }}
              >
                favorite
              </i>
              {state && !item.likes.includes(state._id) ? (
                <a
                  href='#'
                  onClick={(e) => {
                    likePost(e, item._id)
                  }}
                >
                  <big> Like</big>
                </a>
              ) : (
                <a
                  href='#'
                  onClick={(e) => {
                    unlikePost(e, item._id)
                  }}
                >
                  <big> Unlike</big>
                </a>
              )}
              <h6>{item.likes.length} likes</h6>
              <div style={{ marginTop: '30px', marginBottom: '30px' }}>
                <h6>{item.title}</h6>
                <p>{item.body}</p>
                <div style={{ textAlign: 'right' }}>
                  {item.comments.map((item) => {
                    return (
                      <div>
                        <div>
                          [
                          <Link to={'/profile/' + item.postedBy._id}>
                            {item.postedBy.name}
                          </Link>
                          ] : {item.text}
                        </div>
                      </div>
                    )
                  })}
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (e.target[0].value.trim()) {
                      makeComment(e.target[0].value.trim(), item._id)
                      e.target[0].value = ''
                    }
                  }}
                >
                  <input
                    type='text'
                    placeholder='add a comment & press `enter`'
                  />
                </form>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
