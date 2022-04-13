import { useDispatch } from 'react-redux'
import { deletePost } from '../features/posts/postSlice'

function PostItem({ post }) {
  const dispatch = useDispatch()

  return (
    <div className='post'>
      <h2>{post.title}</h2>
      <div>{post.creator}</div>
      <button onClick={() => dispatch(deletePost(post._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default PostItem
