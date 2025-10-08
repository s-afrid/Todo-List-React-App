import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-between bg-amber-500 text-white py-2'>
        <div className="logo">
            <span className='font-bold text-xl mx-8'>Task Nest</span>
        </div>
        <ul className="flex gap-8 mx-7">
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all duration-200'>Your Task</li>
        </ul>
    </nav>
  )
}

export default Navbar