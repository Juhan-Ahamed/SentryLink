import { DocStatus } from "@/types";

export const StatusChip = ({ status }: { status: DocStatus }) => {
  const config = {
    Verified: {
      container: "bg-green-50 text-green-700 border-green-200",
      dot: "bg-green-500",
    },
    "Expiring Soon": {
      container: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
    Expired: {
      container: "bg-red-50 text-red-700 border-red-200",
      dot: "bg-red-500",
    },
    Pending: {
      container: "bg-slate-100 text-slate-700 border-slate-200",
      dot: "bg-slate-400",
    },
  };

  const current = config[status] || config.Pending;

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border ${current.container}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-2 ${current.dot}`}></span>
      {status}
    </span>
  );
};
