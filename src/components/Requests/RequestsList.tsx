
"use client";

import { BuyerRequest } from "@/types";

interface RequestsListProps {
  requests: BuyerRequest[];
  onFulfill: (request: BuyerRequest) => void;
}

export const RequestsList = ({ requests, onFulfill }: RequestsListProps) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "OVERDUE":
        return "bg-red-100 text-red-800 border-red-200";
      case "FULFILLED":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <div className="bg-white border border-light rounded-xl overflow-hidden shadow-sm">
      <div className="p-4 border-b border-light bg-slate-50/50 flex justify-between items-center">
        <h3 className="text-[11px] font-black text-muted uppercase tracking-widest">
          To-Do List
        </h3>
        <div className="flex gap-4">
          <button className="flex items-center gap-1 text-[10px] font-bold text-muted hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-sm">
              filter_list
            </span>{" "}
            FILTER
          </button>
          <button className="flex items-center gap-1 text-[10px] font-bold text-muted hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-sm">sort</span> SORT
          </button>
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/30 border-b border-light">
            <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
              Document Type
            </th>
            <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
              Due Date
            </th>
            <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
              Buyer
            </th>
            <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
              Status
            </th>
            <th className="p-4 w-32"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-light">
          {requests.map((req) => (
            <tr
              key={req.id}
              className={`hover:bg-slate-50/50 transition-colors ${
                req.status === "OVERDUE" ? "bg-red-50/10" : ""
              }`}
            >
              <td className="p-4">
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-main">
                    {req.docType}
                  </span>
                  <span className="text-[10px] text-muted font-medium mt-0.5 uppercase tracking-tight">
                    {req.category}
                  </span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  {req.status === "OVERDUE" && (
                    <span className="material-symbols-outlined text-red-500 text-sm">
                      warning
                    </span>
                  )}
                  {req.isToday && (
                    <span className="size-2 bg-red-500 rounded-full animate-pulse"></span>
                  )}
                  <span
                    className={`text-xs font-bold tabular-nums ${
                      req.status === "FULFILLED"
                        ? "text-muted"
                        : "text-main"
                    } ${
                      req.status === "OVERDUE" || req.isToday
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {req.dueDate} {req.isToday && "(Today)"}
                  </span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <div className="size-6 bg-slate-100 rounded border border-light flex items-center justify-center text-[10px] font-bold text-muted">
                    {req.buyerInitial}
                  </div>
                  <span className="text-xs text-main font-semibold">
                    {req.buyerName}
                  </span>
                </div>
              </td>
              <td className="p-4">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border uppercase ${getStatusStyles(
                    req.status
                  )}`}
                >
                  {req.status}
                </span>
              </td>
              <td className="p-4 text-right">
                {req.status === "FULFILLED" ? (
                  <button className="cursor-pointer px-4 py-1.5 bg-white border border-light hover:bg-slate-50 rounded-lg text-muted text-[11px] font-bold transition-all uppercase tracking-wider">
                    View
                  </button>
                ) : (
                  <button
                    onClick={() => onFulfill(req)}
                    className="cursor-pointer px-4 py-1.5 bg-primary hover:bg-primary/90 rounded-lg text-white text-[11px] font-bold shadow-md shadow-primary/20 transition-all uppercase tracking-wider"
                  >
                    Fulfill
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
