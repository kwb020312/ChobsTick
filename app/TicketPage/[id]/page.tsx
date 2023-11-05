import TicketForm from "@/app/(components)/TicketForm";
import { TicketType } from "@/app/(types)/type";

interface TicketPageProps {
  params: { id: string };
}

const getTicketById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to get Ticket.");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

const TicketPage = async ({ params }: TicketPageProps) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateTicketData;
  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.foundTicket;
  } else {
    updateTicketData = {
      _id: "new",
    };
  }
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
