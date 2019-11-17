import React, { useState, useContext, useEffect } from 'react'
import { useResource } from 'react-request-hook'
import { StateContext } from '../contexts'

import { register as registerUser } from '../actions'

export default function Register () {
    const { dispatch } = useContext(StateContext)
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ passwordRepeat, setPasswordRepeat ] = useState('')

    const handleUsername = e => setUsername(e.target.value)
    const handlePassword = e => setPassword(e.target.value)
    const handlePasswordRepeat = e => setPasswordRepeat(e.target.value)

    const [ user, register ] = useResource((username, password) => ({
        url: '/users',
        method: 'post',
        data: { username, password }
    }))

    useEffect(() => {
        if (user && user.data) {
            dispatch(registerUser(user.data.username))
        }
    }, [user])

    const handleOnSubmit = e => {
        e.preventDefault()
        register(username, password)
    }




    return (
        <form onSubmit={handleOnSubmit}>
            <label htmlFor="register-username">Username:</label>
            <input type="text" value={username} onChange={handleUsername} name="register-username" id="register-username" />
            <label htmlFor="register-password">Password:</label>
            <input type="password" value={password} onChange={handlePassword} name="register-password" id="register-password" />
            <label htmlFor="register-password-repeat">Repeat password:</label>
            <input type="password" value={passwordRepeat} onChange={handlePasswordRepeat} name="register-password-repeat" id="register-password-repeat" />
            <input type="submit" value="Register" disabled={username.length === 0 || password.length === 0 || password !== passwordRepeat}/>
        </form>
    )
}