import React from 'react'
import {AiFillHome} from 'react-icons/ai';
import Logo from '../assets/logo.png';
import { categories } from '../categories';
import Image from 'next/image'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { hide } from '../redux/slices/showhideSideBar';
import { useDispatch } from 'react-redux';
const SideBarMob = () => {
  let router =useRouter()
  let dispatch = useDispatch()
  let {category} =router.query
  function handleFilter(cat){
    router.push(`/?category=${cat}`)
  }

  return (
    <div className='w-8/12 flex fixed md:hidden h-screen overflow-y-auto py-8 flex-col gap-3 bg-white shadow-md hide-scroll z-10'>
        <div className='absolute w-8 h-8 flex justify-center items-center text-white bg-red-500 top-0 right-0' onClick={()=>dispatch(hide())}>X</div>
      <div className='cursor-pointer pl-6'>
        <Link href='/'><div><Image className='w-[150px]' src={Logo} alt="logo" /></div></Link>
      </div>
        <Link href='/'>
      <div className={`flex items-center gap-2 mt-1 ${!category?'border-r-[3px]':''} pl-6 cursor-pointer border-black`}>
        <AiFillHome size={15}/>
        <div className={`text-sm ${!category?'font-bold':''}`}>Home</div>
      </div>
        </Link>
      <div>
        <h2 className='font-medium text-md py-3 px-6'>Discover Gategories</h2>
        {categories.map(cat=>(
          <div onClick={()=>handleFilter(cat.name)} key={cat.name} className={`flex gap-3 pl-6 items-center py-2 capitalize cursor-pointer ${category==cat.name?'border-r-[3px]':''} hover:bg-gray-200 transition-all border-black`}>
            <img src={cat.image} alt={cat.name} className='w-7 h-7 rounded-full object-cover'/>
            <div className={`text-sm ${category==cat.name?'font-semibold':''}`}>{cat.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SideBarMob
