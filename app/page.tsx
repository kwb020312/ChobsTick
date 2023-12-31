import React from "react";
import TicketCard from "./(components)/TicketCard";
import { TicketType } from "./(types)/type";

const getTickets = async () => {
  try {
    const res = await fetch(`${process.env.URL}/api/Tickets`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Failed to get tickets", error);
  }
};

const Dashboard = async () => {
  const data = await getTickets();

  if (!data?.tickets) {
    return <p>생성된 티켓이 없습니다.</p>;
  }

  const tickets: TicketType[] = data.tickets;

  const uniueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ];
  return (
    <div className="p-5">
      <div className="">
        {tickets &&
          uniueCategories?.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2>{uniqueCategory}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets
                  .filter((ticket) => ticket.category === uniqueCategory)
                  .map((filteredTicket, _index) => (
                    <TicketCard
                      key={_index}
                      id={_index}
                      ticket={filteredTicket}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
