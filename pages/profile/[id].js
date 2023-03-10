import axios from 'axios'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Navbar from '../../components/Navbar'
import Posts from '../../components/Posts'
import SideBar from '../../components/SideBar'

const Profile = () => {
  const [createdPosts, setcreatedPosts] = useState([])
  const [savedPosts, setSavedPosts] = useState([])
  const [user,setuser] = useState({});
  const [ isCreated,setIsCreated] = useState(true);
    let router = useRouter();
    let {id} = router.query;

    const {currentUser} = useSelector(state=>state.auth);
  
    useEffect(()=>{
        if(!currentUser){
            router.replace('/login')
        }
    },[currentUser])

    useEffect(()=>{
     if(id){
      axios.get(`http://localhost:5000/posts?userId=${id}&_expand=user&_embed=saved`)
     .then(res=>setcreatedPosts(res.data))
     .catch(console.log)
     }
    },[id])

    useEffect(()=>{
      if(id){
       axios.get(`http://localhost:5000/saved?userId=${id}&_expand=post`)
      .then(res=>{
        let ids = res.data.map(el=>el.postId);
        let idsString = ids.join('&id=');
        console.log(idsString)
        axios.get(`http://localhost:5000/posts?_embed=saved&_expand=user&id=${idsString}`)
        .then(res=>setSavedPosts(res.data))
        .catch(console.log)
      })
      .catch(console.log)
      }
     },[id])

    useEffect(()=>{
      if(id){
        axios.get(`http://localhost:5000/users/${id}`)
      .then(res=>setuser(res.data))
      .catch(console.log)
      }
     },[id])

  return (
    <div>
      <Head>
        <title>Share Me</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Navbar />
      <div className='flex'>
        <SideBar />
        <div className='flex-1 ml-0 md:ml-[220px]'>
            <div className='w-full h-[200px] xl:h-[520px] bg-slate-500 relative shadow-lg shadow-gray-400'>
                <img  className='w-full h-full object-cover'/>
                <img src={user.avatar} alt='profile' className='w-24 h-24 object-cover rounded-full absolute left-1/2 -translate-x-1/2 -bottom-12 border-white'/>
            </div>
            <div className='flex items-center flex-col gap-4 mt-14 mb-4'>
                <p className='font-semibold text-3xl'>{user.name}</p>
                <div className='space-x-3'>
                <button className={`rounded-full ${isCreated&&'bg-red-500'} outline-none border-none ${isCreated?'text-white':'text-black'} px-4 py-2 font-medium`} onClick={()=>setIsCreated(true)}>Created</button>
                <button className={`rounded-full ${!isCreated&&'bg-red-500'} outline-none border-none ${isCreated?'text-black':'text-white'} px-4 py-2 font-medium`} onClick={()=>setIsCreated(false)}>Saved</button>
                </div>
            </div>
            <div className='px-3'>
                {isCreated?<Posts posts={createdPosts} />:<Posts posts={savedPosts} />}
            </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
