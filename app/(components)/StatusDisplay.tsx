interface StatusDisplayProps {
  status: string;
}

const StatusDisplay = ({ status }: StatusDisplayProps) => {
  const getColor = (status: string) => {
    let color = "bg-slate-700";
    switch (status.toLowerCase()) {
      case "작업 완료":
        color = "bg-green-200";
        break;
      case "작업 진행":
        color = "bg-yellow-200";
        break;
      case "작업 전":
        color = "bg-red-200";
        break;
      default:
        break;
    }
    return color;
  };

  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700 bg-green-200 ${getColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

export default StatusDisplay;
