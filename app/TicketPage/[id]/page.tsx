interface TicketPageProps {
  params: { id: string };
}

const TicketPage = ({ params }: TicketPageProps) => {
  return <div>TicketPage {params.id}</div>;
};

export default TicketPage;
