import React from 'react'

const Header = () => {
  return (
	 <div className='bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 border-b border-transparent py-4 dark:bg-slate-900 dark:border-b-slate-300/10 mx-auto'>
   <div className='container flex flex-wrap items-center  justify-center'>
   <h2 className='font-medium text-3xl tracking-wide text-slate-700 transition-colors duration-200 py-2 px-3 rounded hover:bg-yellow-400 hover:text-white focus:bg-yellow-500 focus:text-white dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-700/50 dark:focus:bg-slate-700 dark:focus:text-slate-200'>
   Todo List
   </h2>
   </div>
 
  
   </div>
  )
}

export default Header