'use client'

import Moralis from 'moralis';
import Addresses from '../constants/Addresses.json'

const getMYTickets = async(address, setTickets)=>{
  console.log("getMyTicket")
    try {
      if (!Moralis.Core.isStarted) {
        await Moralis.start({
          apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY });
        }
      
        const response = await Moralis.EvmApi.nft.getWalletNFTs({
          "chain": "0xaa36a7",
          "format": "decimal",
          "tokenAddresses": [
            Addresses.NFT
          ],
          "mediaItems": false,
          "address": address
        });

        let data = response.raw.result
      
        const myTickets = data.map(item => {
          const metadataObject = JSON.parse(item.metadata);
          return {
            external_url: metadataObject.external_url,
            image: metadataObject.image,
            name: metadataObject.name,
            description: metadataObject.description,
            token_address: item.token_address,
            id: item.token_id,
            ticket_owner : metadataObject.ticketOwner
          }
        })

        console.log(myTickets);

        setTickets(myTickets);
        
      } catch (e) {
        console.error(e);
      }
}

const getEvents = async(setEvents)=>{
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY });
      }
        const response = await Moralis.EvmApi.nft.getContractNFTs({
          "chain": "0xaa36a7",
          "format": "decimal",
          "address": Addresses.NFT
        });
      
        let data = response.raw.result
        console.log(data)
        data = data.filter(item => item.metadata != null);
        const events = data.map(item => {
          console.log(item)
          const metadataObject = JSON.parse(item.metadata);
          console.log(metadataObject);
          return {
            external_url: metadataObject.externalLink ?? '',
            image: metadataObject.image,
            name: metadataObject.name,
            description: metadataObject.description ?? '',
            token_address: item.token_address,
            id: item.token_id,
            ticket_owner : metadataObject.ticketOwner
          }
        })

        setEvents(events);
      } catch (e) {
        console.error(e);
      }
}

const uploadFolder = async(options)=>{
  try {
    if (!Moralis.Core.isStarted) {
      await Moralis.start({
        apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY });
      }

      const response = await Moralis.EvmApi.ipfs.uploadFolder(options);
      return response;
    } catch (e) {
      console.error(e);
    }
}


export {getMYTickets, getEvents, uploadFolder}
