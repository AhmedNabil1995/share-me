import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import Posts from './Posts'
import Comment from './Comment'
import Link from 'next/link';

const Post = ({currentUser}) => {
    const [posts, setposts] = useState([])
    const [post,setpost] = useState({});
    const [comments,setcomments] = useState([])
    let [text,settext] = useState('');
    const router = useRouter()
    let {id} = router.query;
    useEffect(()=>{
     if(post.category){
      axios.get(`http://localhost:5000/posts?category=${post.category}&_expand=user`)
     .then(res=>setposts(res.data))
     .catch(console.log)
     }
    },[post])

    useEffect(()=>{
      if(id){
        axios.get(`http://localhost:5000/posts/${id}?_expand=user`)
      .then(res=>setpost(res.data))
      .catch(console.log)
      }
     },[id])
     
     useEffect(()=>{
      if(id){
        axios.get(`http://localhost:5000/comments?postId=${id}&_expand=user`)
      .then(res=>setcomments(res.data))
      .catch(console.log)
      }
     },[id])

     const handleClick = ()=>{
      let comment = {
        text,
        postId:post.id,
        userId:currentUser.id
      }
      console.log(comment)
      axios.post('http://localhost:5000/comments?_expand=user',comment)
      .then(res=>{
        setcomments([...comments,{...res.data,user:{id:currentUser.id,name:currentUser.name,avatar:currentUser.avatar}}])
        settext('')
      })
      .catch(console.log)
     }
  return (
    <>
        <div className='block lg:flex gap-5 bg-white rounded-3xl overflow-hidden'>
      <div className='flex-1'>
        <img src={post?.image||'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} className='w-full h-auto rounded-xl' />
      </div>
      <div className='flex-1 py-3 px-3'>
        <div className='flex items-center justify-between'>
        <button className='flex justify-center rounded-full items-center w-10 h-10 bg-gray-200 hover:bg-gray-300 outline-none border-none'>
            <MdDownloadForOffline />
        </button>
            <span className='cursor-pointer text-gray-400'>{post.link}</span>
        </div>
        <h2 className='text-2xl py-3 font-bold'>{post.title}</h2>
        <p className=''>{post.description}</p>
        <Link href={`/profile/${post?.user?.id||1}`}>
        <div className='flex items-center gap-2 my-3'>
            <img src={post?.user?.avatar} alt="profile pic" className='w-12 h-12 object-cover rounded-full' />
            <span className='font-semibold'>{post?.user?.name}</span>
        </div>
        </Link>
        <p className='text-2xl my-2 text-gray-700'>Comments</p>
        <div className='max-h-[400px] overflow-y-auto'>
            {comments.map(comment=>{
                return <Comment key={comment.id} comment={comment} />
            })}
        </div>
        <div className='flex flex-wrap items-center gap-2 mt-5'>
        <img src={currentUser?.avatar} alt="profile pic" className='w-12 h-12 object-cover rounded-full' />
            <input value={text} onChange={(e)=>settext(e.target.value)} className='flex-1 outline-none border-solid border-gray-400 border-2 p-2 rounded-full' placeholder='Add comment'/>
        <button className='rounded-full bg-red-500 outline-none border-none text-white px-4 py-2 font-medium' onClick={handleClick}>Done</button>
        </div>
      </div>
    </div>
    <div className='my-5 text-center text-2xl font-semibold'>
    More Like this
  </div>
  <Posts posts={posts}/>
    </>
  )
}

export default Post
