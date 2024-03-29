export const login = username => ({ type: 'LOGIN', username })

export const register = (
  username
) => ({ type: 'REGISTER', username})

export const logout = () => ({ type: 'LOGOUT' })

export const fetchPosts = posts => ({ type: 'FETCH_POSTS', posts })

export const createPost = ({
  title,
  content,
  user,
  id
}) => ({ type: 'CREATE_POST', title, content, author: user, id })


export const postsError = () => ({ type: 'POSTS_ERROR' })