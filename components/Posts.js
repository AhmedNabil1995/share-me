import React from 'react'
import Masonry from 'react-masonry-css'
import PostItem from './PostItem';

const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1
  };

const Posts = ({posts}) => {
  return (
    <Masonry
    breakpointCols={breakpointColumnsObj}
    className="my-masonry-grid"
    columnClassName="my-masonry-grid_column">
      {posts.map(post=>{
        return (
          <PostItem key={post.id} post = {post}/>
        )
      })}
  </Masonry>
  )
}

export default Posts
