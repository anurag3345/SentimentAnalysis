import React from 'react'

const Nav = () => {
  return (
    <div className='w-full flex items-center justify-between bg-white shadow-sm border-[0.3px]'>
        <div className='container mx-auto p-4 flex items-center space-x-4'>
            <h1 className='text-lg font-bold text-gray-800'>Sentiment Analysis</h1>
            <div className='flex items-center space-x-4'>
            <a href='/' className='text-gray-600 hover:text-gray-800 transition duration-200'>Home</a>
            <a href='/about' className='text-gray-600 hover:text-gray-800 transition duration-200'>About</a>
            </div>
        </div>
    </div>
  )
}

export default Nav