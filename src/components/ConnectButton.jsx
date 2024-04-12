'use client'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";
import { Button } from "./ui/button";
import config from "@/config";

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useWeb3Modal()
  const { chain } = useNetwork();
  const { isConnected } = useAccount();
  const { switchNetwork } = useSwitchNetwork();
  const defaultChain = config.chains[0];

  const switchToSepolia = ()=>{
    if(!isConnected){
        open()
    }
    else if(chain.id !== defaultChain.id){
        switchNetwork?.(defaultChain.id)
    }
  }

  return (
    <div>
     <button className='bg-black rounded-3xl' onClick={switchToSepolia}> <w3m-button label='Connect Wallet'/> </button>
    </div>
  )
}