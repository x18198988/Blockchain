"use client";
import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import Address from "../constants/Addresses.json";
import TicketMasterABI from "../constants/abis/TicketMaster.json";
import NFTABI from "../constants/abis/NFT.json";
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";

const Card = ({
  id,
  img,
  width,
  name,
  description,
  external_url,
  ticket_owner,
  showButton,
}) => {
  const [remaningTicket, setRemaningTickets] = useState("Loading");
  const { config } = usePrepareContractWrite({
    abi: TicketMasterABI,
    address: Address.TicketMaster,
    functionName: "buyTicket",
    value: "1000000000000000",
    args: [id, 1, ticket_owner],
  });
  const { write } = useContractWrite(config);

  const {
    data: tickets,
    isError: prepareError,
    isLoading: contractLoading,
  } = useContractRead({
    abi: NFTABI,
    address: Address.NFT,
    functionName: "balanceOf",
    args: [ticket_owner, id],
  });

  useEffect(() => {
    if (tickets) {
      setRemaningTickets(tickets.toString());
    }
  }, [tickets]);

  return (
    <>
      <div
        className={`shadow hover:shadow-md shrink-0 bg-white rounded-[1rem] overflow-hidden cursor-pointer hover:-translate-y-2 transition-all ${width}`}
      >
        <img
          className="object-cover w-full h-48"
          src={img}
          alt="Flower and sky"
        />

        <div className="relative p-4">
          <h3 className="text-base md:text-xl font-semibold text-gray-800 text-ellipsis">
            {name}
          </h3>
          <p className="pb-4 text-gray-600 text-sm">{description}</p>
          <div className="flex justify-between pb-4">
            <div className="flex flex-col">
              <span className="uppercase font-semibold text-gray-500 text-sm">
                Price
              </span>
              <span className="font-semibold ">0.001 ETH</span>
            </div>
            {showButton && (
              <div className="flex flex-col">
                <span className="uppercase font-semibold text-gray-500 text-sm">
                  Remaining
                </span>
                <span className="font-semibold">{remaningTicket}</span>
              </div>
            )}
          </div>
          <div>
            {external_url && (
              <a
                className="text-blue-600 underline"
                href={external_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Learn more
              </a>
            )}
          </div>
          {showButton && (
            <div className="flex justify-center items-center">
              <Button
                className=" w-full m-4 bg-blue-600"
                onClick={() => write?.()}
              >
                {" "}
                Buy
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Card;
