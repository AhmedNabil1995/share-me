import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineCloudDownload } from 'react-icons/ai'
import { categories } from '../categories';

const Create = ({currentUser}) => {
  let [post,setPost] = useState({title:'',description:'',link:'',category:'other',image:'',userId:1});
  let handleChange = (e)=>{
    setPost({...post,[e.target.name]:e.target.value});
  }
  const handleCreate = ()=>{
    axios.post('http://localhost:5000/posts',post)
    .then(res=>{
      console.log(res.data);
      setPost({title:'',description:'',link:'',category:'other',image:'',userId:currentUser.id});
    })
    .catch(console.log)
  }
  return (
    <div className='block lg:flex p-5 mt-5 bg-white mx-2 gap-8 xl:mx-28 xl:gap-8'>
      <div className='flex-1 min-h-[400px] h-full bg-zinc-100  rounded p-3 hover:cursor-pointer'>
        <div className='border-dotted border-2 border-gray-300 p-2 flex flex-col justify-evenly text-center h-[400px]'>
            <div className='text-center'>
                <AiOutlineCloudDownload size={25} className='m-auto'/>
                <p className='text-lg'>Click to upload</p>
            </div>
            <div className='text-start text-gray-400'>
                Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 20MB
            </div>
        </div>
      </div>
      <div className='flex-[1.5]'>
        <input value={post.title} name='title' onChange={handleChange} className='w-full outline-none border-solid border-b-2 text-gray-700 text-3xl p-2 my-4' placeholder='Add your title' />
        <div className='flex items-center my-5 gap-2'>
            <img src={currentUser.avatar} alt="profile pic" className='w-10 h-10 object-cover rounded-full' />
            <span className='font-medium'>{currentUser.name}</span>
        </div>
        <input value={post.description} name='description' onChange={handleChange} className='w-full outline-none border-solid border-b-2 text-gray-700 text-md p-2 my-4' placeholder='Tell every one what your post about' />
        <input value={post.image} name='image' onChange={handleChange} className='w-full outline-none border-solid border-b-2 text-gray-700 text-md p-2 my-4' placeholder='image url' />
        <input value={post.link} name='link' onChange={handleChange} className='w-full outline-none border-solid border-b-2 text-gray-700 text-md p-2 my-4' placeholder='Add a destination link' />
        <h2 className='font-bold text-xl'>Choose Post Category</h2>
        <select value={post.category} name='category' onChange={handleChange} className='my-4 w-9/12 border-none outline-none'>
            <option>Select Category</option>
            {categories.map((cat,i)=>{
              return <option key={i} value={cat.name}>{cat.name}</option>
            })}
        </select>
        <button className='block rounded-full bg-red-500 outline-none border-none ml-auto text-white px-4 py-2 font-medium' onClick={handleCreate}>Save Post</button>
      </div>
    </div>
  )
}

export default Create
