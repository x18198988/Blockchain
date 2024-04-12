'use client'
import React, { useEffect, useState } from 'react'
import { CircleUserRound } from 'lucide-react';
import Link from "next/link"
import ConnectButton from './ConnectButton';


const Navbar = () => {
    
  return (
    <nav className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <div className="border-b border-gray-200 px-5 flex items-center gap-5 justify-between">
          <div className="flex h-16 items-center cursor-pointer text-2xl font-bold">
            {/* TODO : Mobile nav */}
            <Link href="/">Sports Master</Link>
          </div>
          <div className='font-semibold'>
          <ul className="cursor-pointer flex gap-2">
            <li className="mr-5">
              <Link href="/">Home </Link>
            </li>
            <li className="mr-5">
              <Link href="/#events-section" >Upcoming Events </Link>
            </li>
            <li className="mr-5">
              <Link href="/createEvent">Create Event </Link>
            </li>
            <li className="mr-5">
              <Link href="/myTickets">My Tickets</Link>
            </li>
          </ul>
          </div>
          
          <ConnectButton/>


        </div>
      </header>
    </nav>
  );
}

export default Navbar