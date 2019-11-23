import React, { useEffect, useContext } from 'react'
import { useResource } from 'react-request-hook'

import { StateContext } from '../contexts'

import { fetchPosts, postsError } from '../actions'

import PostList from '../post/PostList'

export default function HomePage () {
  const { state, dispatch } = useContext(StateContext)
  const { error } = state
  const [ posts, getPosts ] = useResource(() => ({
    url: '/posts',
    method: 'get'
  }))

  useEffect(getPosts, [])

  useEffect(() => {
    if (posts && posts.error) {
      dispatch(postsError())
    }
    if(posts && posts.data){
      dispatch(fetchPosts(posts.data.reverse()))
    }
  },[posts])

    return (
        <div>
          {error && <b>{error}</b>}
          <PostList />
        </div>
    )
}