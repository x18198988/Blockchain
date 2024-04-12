import React from "react";
import Card from "./Card";
import Link from "next/link";
import { Button } from "./ui/button";

const Carousel = ({ header, data, showButton = false }) => {
  const nftdata = Array.isArray(data) ? data : [];
  return (
    <div className="px-4 md:px-8 my-10 h-full">
      <div className="flex mb-5 font-semibold text-lg md:text-xl">
        <h2>{header}</h2>
      </div>

      {nftdata.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 md:gap-8 -mx-5 px-5  place-items-center">
          {nftdata.map((item) => {
            const { id, image, name, description, external_url, ticket_owner } =
              item;
            return (
              <Card
                key={id}
                id={id}
                img={image}
                name={name}
                description={description}
                external_url={external_url}
                ticket_owner={ticket_owner}
                width={"w-[280px]"}
                showButton={showButton}
              />
            );
          })}{" "}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h3 className="mt-20 text-center mb-10">No Data present yet</h3>{" "}
          {showButton ? (
            <Button className="bg-gray-700">
              <Link href={"/createEvent"}>Create your own event &rarr;</Link>
            </Button>
          ) : (
            <Button className="bg-gray-700">
              <Link href={"/#events-section"}>Buy Ticket now &rarr;</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Carousel;
