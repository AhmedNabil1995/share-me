import React from 'react'

const Comment = ({comment}) => {
  return (
    <div className='flex items-center gap-2 mb-3'>
        <img src={comment?.user?.avatar} alt="profile pic" className='w-10 h-10 object-cover rounded-full' />
        <div className=''>
            <span className='font-semibold text-base'>{comment?.user?.name}</span>
            <p className='text-sm'>{comment?.text}</p>
        </div>
    </div>
  )
}

export default Comment
