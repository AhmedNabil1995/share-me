import Head from 'next/head'
import SideBar from '../components/SideBar'
import Search from '../components/Search';
import Create from '../components/Create';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';


export default function CreatePost() {
  const router = useRouter();
  const {currentUser} = useSelector(state=>state.auth);

  useEffect(()=>{
      if(!currentUser){
          router.replace('/login')
      }
  },[currentUser])

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
        <div className='flex-1 px-8 py-3 ml-0 md:ml-[220px]'>
          <Search />
         <Create currentUser={currentUser}/>
        </div>
      </div>
    </div>
  )
}
