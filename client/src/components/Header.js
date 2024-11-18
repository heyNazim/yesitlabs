import { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/Logo.webp'
import { FaUserCircle } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";


import {
  Dialog,
  DialogBackdrop,
  DialogPanel
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { IoCartOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';



export default function Header() {
  const [open, setOpen] = useState(false)

    const {carts} = useSelector((state)=>state.allCart);

  return (
    <div className="bg-white stick-head">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>

       
  

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900">
                  Sign in
              </Link>
              </div>
              <div className="flow-root">
                <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900">
                  Create account
              </Link>
              </div>
            </div>

          </DialogPanel>
        </div>
      </Dialog>

      <header className="relative bg-white">
        <p className="flex h-10 items-center justify-center green-color px-4 text-sm font-medium  sm:px-6 lg:px-8">
          Lorem ipsum, dolor sit amet consectetur adipisicing.
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'}>
                  <span className="sr-only">Your Company</span>
                  {/* <img
                    alt=""
                    src={logo}
                    className="h-8 w-auto"
                  /> */}
                  <h1>YES IT Labs</h1>
              </Link>
              </div>

        
              <div className="ml-auto flex items-center">
                {/* <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Sign in
                </Link>
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                    Create account
                </Link>
                </div> */}


<input id="search"  name="search" type="search" placeholder=' Search Item' autoComplete="search" required className="searchfield mr-5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />


         {/* Checkout */}
         <Link to={'dashboard'} className="group -m-2 flex items-center p-2">
              
Dashboard
                </Link>
        


                {/* Cart */}
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2">
                  <IoCartOutline  className='AuthIcon mr-4'/>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800 headlength">{carts.length}</span>
                </Link>

       

                <div className="dropdown">
  <FaUserCircle className='AuthIcon' data-bs-toggle="dropdown" aria-expanded="false"/>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" to={'login'}>Sign In </Link></li>
    <li><Link className="dropdown-item" to={'register'}>Sign Up</Link></li>

  </ul>
</div>


              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
