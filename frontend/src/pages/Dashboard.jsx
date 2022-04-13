import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import PostItem from '../components/PostItem'
import Spinner from '../components/Spinner'
import { getPosts, reset } from '../features/posts/postSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [postTitle, setPostTitle] = useState('');

  const { user } = useSelector((state) => state.auth)
  const { posts, isLoading, isError, message } = useSelector(
    (state) => state.posts
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getPosts())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
  
  let filteredPosts = posts.filter(post => {
    return post.title.toLowerCase().includes(postTitle.toLowerCase())
  })

  return (
    <>
      <form className='form-group'>
        <input type='text' placeholder='Search Posts...'
               onChange={(e => setPostTitle(e.target.value))}
        />
      </form>

      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Posts</p>
      </section>

      <section className='content'>
        {posts.length > 0 ? (
          <div className='posts'>
            {filteredPosts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <h3>There is no posts</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard