import React, { useState, useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'

import { StateContext } from '../contexts'

import { login as loginUser } from '../actions'

export default function Login () {
  const { dispatch } = useContext(StateContext)

  const [ loginFailed, setLoginFailed ] = useState(false)
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')

  const handleUsername = e => setUsername(e.target.value)
  const handlePassword = e => setPassword(e.target.value)
  const handleOnSubmit  = e => {
    e.preventDefault()
    login(username,password)
  }

  const [ user, login ] = useResource((username, password) => ({
    url: `/login/${encodeURI(username)}/${encodeURI(password)}`,
    method: 'get'
  }))

  useEffect(() => {
    console.log(user)
    if(user.data && user.data.length > 0) {
      setLoginFailed(false)
      dispatch(loginUser(user.data[0].username))
  } else {
    setLoginFailed(true)
  }

  if (user && user.error) {
    setLoginFailed(true)
  }
}, [user])

  return (
    <form onSubmit={handleOnSubmit}>
        <label htmlFor="login-username">Username:</label>
        <input type="text" value={username} onChange={handleUsername} name="login-username" id="login-username" />
        <label htmlFor="login-password">Password:</label>
        <input type="password" value={password} onChange={handlePassword} name="login-password" id="login-password" />
        <input type="submit" value="Login" disabled={username.length === 0 || password.length === 0} />
        {loginFailed && <span style={{ color: 'red' }}>Invalid username or password</span>}
    </form>
  )
}