import React, { useEffect, createContext, useReducer } from 'react'
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom'

import './App.css'
import NavBar from './components/Navbar'
import Home from './screens/Home'
import Signup from './screens/Signup'
import Login from './screens/Login'
import Profile from './screens/Profile'
import CreatePost from './screens/CreatePost'
import ErrorBoundary from './components/ErrorBoundary'
import { reducer, initialState } from './reducers/userReducer'

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      history.push('/')
    } else {
      history.push('/login')
    }
  }, [])

  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/create' component={CreatePost} />
      </Switch>
    </React.Fragment>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <ErrorBoundary>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <div className='container'>
            <NavBar />
            <Routing />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </ErrorBoundary>
  )
}

export default App
