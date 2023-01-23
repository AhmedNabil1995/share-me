import Link from 'next/link';
import React from 'react'
import {BsArrowUpRightCircleFill} from 'react-icons/bs'
import {MdDownloadForOffline} from 'react-icons/md';
import { useState } from 'react';
import axios from 'axios';

const PostItem = ({post}) => {
  let [saved,setSaved] = useState(post.saved)

  const handleSave =(e)=>{
    e.preventDefault()
    if(!saved.find(s=>s.userId==1)){
      let savedPost = {postId:post.id,userId:1};
      axios.post('http://localhost:5000/saved',savedPost)
      .then(res=>setSaved([...saved,res.data]))
      .catch(console.log);
    }else{
      let savedId = saved.find(s=>s.userId==1)?.id;
      axios.delete(`http://localhost:5000/saved/${savedId}`)
      .then(res=>setSaved(saved.filter(s=>s.id!=savedId)))
      .catch(console.log);
    }
  }
  return (
    <div className='pb-5'>
            <Link href={`/post/${post.id}`}>
            <div className='relative group cursor-zoom-in rounded-xl hover:shadow-lg bg-transparent'>
              <img src={post.image} className='w-full rounded-xl h-auto' alt={post.title} />
              <div className='hidden flex-col justify-between p-2 absolute top-0 left-0 w-full h-full transition-all group-hover:flex'>
                <div className='flex items-center justify-between'>
                  <button className='flex justify-center rounded-full items-center w-10 h-10 bg-gray-400/60 hover:bg-gray-50 outline-none border-none'>
                    <MdDownloadForOffline />
                  </button>
                  <button className='rounded-full bg-red-600/60 hover:bg-red-600 outline-none border-none text-white px-2 py-1' onClick={handleSave}>{saved?.length||0} Save</button>
                </div>
                <button className='flex items-center gap-1 w-min rounded-full px-2 py-1 bg-gray-400/60 hover:bg-gray-50 outline-none border-none'>
                  <BsArrowUpRightCircleFill /> {(post?.link)?.substring(0,8)+'...'}
                </button>
              </div>
            </div>
            </Link>
            <Link href={`/profile/${post?.user?.id}`}>
            <div className='flex items-center gap-3 hover:cursor-pointer'>
              <img src={post?.user?.avatar} alt={post?.user?.name} className='w-8 h-8 rounded-full'/>
              <span className='text-sm font-medium'>{post?.user?.name}</span>
            </div>
            </Link>
        </div>
  )
}

export default PostItem
