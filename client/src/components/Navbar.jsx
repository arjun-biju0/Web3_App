import {AiOutlineClose} from 'react-icons/ai'
import {HiMenuAlt4} from 'react-icons/hi'


import logo from '../../images/logo.png'
import { useState } from 'react'

const NavbarItems=({title, classprops})=>{
  return (
    <li className={`mx-4 cursor-pointer ${classprops} `}>
      {title}
    </li>
  )
}

const Navbar = () => {

  const [toggleMenu,setToggleMenu]=useState(false)

  return (
    <nav className="w-full flex md:justify-center justify-between items-center p-4">
      
      <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
        {["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
          <NavbarItems key={index+item} title={item}/>
        ))}
      </ul>

      <div className="flex relative">
        {toggleMenu? <AiOutlineClose  fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=> setToggleMenu(false)}/>:
        <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={()=> setToggleMenu(true)}/>}
        {toggleMenu && (
          <ul className="z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none
          flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
            <li className="text-xl w-full my-2">
              <AiOutlineClose onClick={()=>  setToggleMenu(false)}/>
            </li>
            {["Market","Exchange","Tutorials","Wallets"].map((item,index)=>(
              <NavbarItems key={index+item} title={item} classprops="my-2 text-lg"/>
            ))}
          </ul>
        )}
      </div>
    </nav>
  )
}

export default Navbar
