import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css'
import NavBar from './components/Navbar'
import Home from './screens/Home'
import Signup from './screens/Signup'
import Login from './screens/Login'
import Profile from './screens/Profile'

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <NavBar />
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile' component={Profile} />
      </div>
    </BrowserRouter>
  )
}

export default App
