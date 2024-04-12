'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { useAccount, useNetwork } from "wagmi";
import { useEffect, useState } from "react";
import Link from 'next/link'
import { Button,buttonVariants } from '@/components/ui/button'
import Carousel from '@/components/Carousel'
import { getEvents } from './Web3Apiscall';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [events, setEvents] = useState([]);
  

  useEffect(() => {
    if (isConnected) {
      getEvents(setEvents);
    }
  }, [isConnected]);

  return (
    <>
          <MaxWidthWrapper>
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
          <h2 className='text-4xl font-bold  text-gray-900 sm:text-6xl'>
          Don't miss chance to support your FavTeam!!  {' '}
            <span className='text-blue-600 '>
            Get your tickets today before you miss out!!!!
            </span>
    
          </h2>
          <p className='mt-6 text-lg max-w-prose text-muted-foreground'>
          Buy your tickets for your favourite team and win a chance to meet your favourite team. 
          </p>
          <div className='flex flex-col sm:flex-row gap-4 mt-6'>
            <Link
              href='#events-section'
              className={buttonVariants()}>
              Live Events
            </Link>
            <Button variant='ghost'>
              <Link href={'/createEvent'}>Create your own event &rarr;</Link>
            </Button>
          </div>
        </div>
      </MaxWidthWrapper>
      <section id= "events-section" className='border-t border-gray-200 bg-gray-50 py-20'>
           <Carousel data={events} header="Events" showButton= {true}/>
      </section>
    </>
  )
}
