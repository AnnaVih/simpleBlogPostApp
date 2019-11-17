import React, { useState, useContext } from 'react'
import { useResource } from 'react-request-hook'
import { StateContext } from '../contexts'
import { createPost as createAuthorPost } from '../actions'

export default function CreatePost () {
    const { state, dispatch } = useContext(StateContext)
    const { user } = state

    const [ title, setTitle ] = useState('')
    const [ content, setContent ] = useState('')

    const [ , createPost ] = useResource(({ title, content, author }) => ({
        url: '/posts',
        method: 'post',
        data: { title, content, author }
    }))


    const handleTitle = e => setTitle(e.target.value)
    const handleContent = e => setContent(e.target.value)
    const handleCreate = e => {
        e.preventDefault();
        createPost({ title, content, author: user })
        dispatch(createAuthorPost(title, content, user))
    }

    return (
        <form  onSubmit={handleCreate}>
            <div>Author: <b>{user}</b></div>
            <div>
                <label htmlFor="create-title">Title:</label>
                <input type="text" value={title} onChange={handleTitle} name="create-title" id="create-title" />
            </div>
            <textarea value={content} onChange={handleContent}/>
            <input type="submit" value="Create" />
        </form>
    )
}