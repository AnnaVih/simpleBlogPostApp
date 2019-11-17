import React, { useReducer, useEffect, useState } from 'react'
import { useResource } from 'react-request-hook'

import { ThemeContext, StateContext } from './contexts'

import appReducer from './reducers'
import { fetchPosts, postsError } from './actions'
import ChangeTheme from './ChangeTheme'

import PostList from './post/PostList'
import CreatePost from './post/CreatePost'
import UserBar from './user/UserBar'
import Header from './Header'

export default function App () {
  const [ state, dispatch ] = useReducer(appReducer, { user: '', posts: [], error: '' })
  const [ posts, getPosts ] = useResource(() => ({
    url: '/posts',
    method: 'get'
  }))

  const [ theme, setTheme ] = useState({
    primaryColor: 'deepskyblue',
    secondaryColor: 'coral'
  })

  const { user, error } = state

  useEffect(getPosts, [])

  useEffect(() => {
    if (posts && posts.error) {
      dispatch(postsError())
    }
    if(posts && posts.data){
      dispatch(fetchPosts(posts.data.reverse()))
    }
  },[posts])

  useEffect(() => {
    if (user) {
      document.title = `${user} - React Hooks Blog`
    } else {
      document.title = 'React Hooks Blog'
    }
  }, [user])

  return (
    <StateContext.Provider value={{ state, dispatch }}>
      <ThemeContext.Provider value={theme}>
        <div style={{ padding: 8 }}>
          <Header text="React Hooks Blog" />
          <ChangeTheme theme={theme} setTheme={setTheme} />
          <UserBar/>
          <br />
          {user && <CreatePost />}
          <br />
          <hr />
          {error && <b>{error}</b>}
          <PostList />
        </div>
      </ThemeContext.Provider>
    </StateContext.Provider>
  )
}