'use client'

import Carousel from '@/components/Carousel'
import data from '@/components/data'
import { useAccount, useNetwork } from "wagmi";
import { useEffect, useState } from "react";
import { getMYTickets } from '../Web3Apiscall';

const page = () => {
  const { address, isConnected } = useAccount();
  const [tickets, setTickets] = useState([]);
  

  useEffect(() => {
    if (isConnected) {
      getMYTickets(address, setTickets);
    }
  }, [isConnected]);
  return (
    <Carousel data={tickets} header="My Tickets"/>
  )
}

export default page