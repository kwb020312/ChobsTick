import TicketForm from "@/app/(components)/TicketForm";

interface TicketPageProps {
  params: { id: string };
}

const TicketPage = ({ params }: TicketPageProps) => {
  return <TicketForm />;
};

export default TicketPage;
