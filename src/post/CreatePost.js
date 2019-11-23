import React, { useState, useContext, useEffect } from 'react'
import useUndo from 'use-undo'
import { useNavigation } from 'react-navi'
import { useResource } from 'react-request-hook'
import { useDebouncedCallback } from 'use-debounce'
import { StateContext } from '../contexts'
import { createPost as createAuthorPost } from '../actions'

export default function CreatePost () {
    const { state, dispatch } = useContext(StateContext)
    const { user } = state

    const [ title, setTitle ] = useState('')
    const [ content, setInput ] = useState('')

    const [ undoContent, {
        set: setContent,
        undo,
        redo,
        canUndo,
        canRedo
    } ] = useUndo('')

    const [ setDebounce, cancelDebounce ] = useDebouncedCallback(
        (value) => {
            setContent(value)
        },
        200
    )

    useEffect(() => {
        cancelDebounce()
        setInput(undoContent.present)
    }, [undoContent])

    const [ post, createPost ] = useResource(({ title, content, author }) => ({
        url: '/posts',
        method: 'post',
        data: { title, content, author }
    }))
    const navigation = useNavigation()

    useEffect(() => {
        if (post && post.data) {
            dispatch(createAuthorPost({...post.data}))
            navigation.navigate(`/view/${post.data.id}`)
        }
    }, [post])


    const handleTitle = e => setTitle(e.target.value)
    const handleContent = (e)  => {
        const { value } = e.target
        setInput(value)
        setDebounce(value)
    }
    const handleCreate = e => {
        e.preventDefault();
        createPost({ title, content, author: user })
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
            <button type="button" onClick={undo} disabled={!canUndo}>Undo</button>
            <button type="button" onClick={redo} disabled={!canRedo}>Redo</button>
        </form>
    )
}