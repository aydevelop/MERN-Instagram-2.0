import React, { useState, useEffect } from 'react'

const Home = () => {
  const [data, setData] = useState([])

  const getPosts = window.try(async () => {
    const posts = await fetch('/allpost', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
    })

    const result = await posts.json()
    setData(result.data)
  })

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <div className='home'>
      {data.map((item) => {
        return (
          <div key={item._id} className='card home-card'>
            <div style={{ textAlign: 'center', paddingTop: '1px' }}>
              <h5>Ramesh</h5>
            </div>
            <div className='card-image'>
              <img alt='' className='item' src={item.photo} />
            </div>
            <div className='card-content'>
              <i className='material-icons' style={{ color: '#e53935' }}>
                favorite
              </i>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              <input type='text' placeholder='add a comment' />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
