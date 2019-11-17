import React, { useContext } from 'react'
import { StateContext } from '../contexts'
import { logout } from '../actions'

export default function Logout () {
  const { state, dispatch } = useContext(StateContext)
  const { user } = state
  const handleOnSubmit = e => {
    e.preventDefault()
    dispatch(logout())
  }

  return (
    <form onSubmit={handleOnSubmit}>
        Logged in as: <b>{user}</b>
        <input type="submit" value="Logout" />
    </form>
  )
}