import Image from 'next/image'
import React, { useEffect } from 'react'
import {VscListFlat} from 'react-icons/vsc' 
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../assets/logo.png';
import {show } from '../redux/slices/showhideSideBar';


const Navbar = () => {
  let {currentUser} = useSelector(state=>state.auth);
  let dispatch = useDispatch()

  return (
    <div className='fixed w-full z-10 flex md:hidden justify-between items-center px-1 py-1 shadow-md bg-white'>
      <VscListFlat  size={40} className='cursor-pointer' onClick={()=>dispatch(show())}/>
      <Image className='w-[120px]' src={Logo} alt="logo" />
        <img src={currentUser?.avatar} alt='profile' className='w-10 h-10 object-cover rounded-full'/>
    </div>
  )
}

export default Navbar
