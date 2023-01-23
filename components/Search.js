import Link from 'next/link';
import React from 'react'
import {AiOutlineSearch} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { searchPosts } from '../redux/slices/postsSclice';
const Search = () => {
  let {currentUser} = useSelector(state=>state.auth);
  let dispatch = useDispatch()
  function handleSearch(e){
      setTimeout(()=>{
        let q = e.target.value || ''
      dispatch(searchPosts(q))
      },500)
  }
  
  return (
    <div className='flex items-center gap-4 pb-8 mt-14 md:mt-0'>
        <div className='flex gap-1 items-center flex-1 bg-white h-12 p-2 rounded-md'>
            <AiOutlineSearch size={20}/>
            <input className='outline-none border-none bg-transparent w-full h-full' placeholder='Search' onKeyUp={handleSearch}/>
        </div>
        <Link href={`/profile/${currentUser?.id}`}>
        <img src={currentUser?.avatar} className='w-12 h-12 rounded-md cursor-pointer hidden md:flex' />
        </Link>
        <Link href='/createpost'>
        <div className='w-12 h-12 rounded-md flex justify-center items-center text-white bg-black text-lg cursor-pointer'>+</div>
        </Link>
    </div>
  )
}

export default Search
