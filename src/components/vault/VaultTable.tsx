"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import { Evidence } from "@/types";
import { StatusChip } from "@/components/ui/StatusChip";

interface VaultTableProps {
  data: Evidence[];
}

export const VaultTable = ({ data }: VaultTableProps) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Handle Individual Selection
  const toggleSelect = (id: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
  };

  // Handle Bulk Selection
  const toggleAll = () => {
    if (selectedIds.size === data.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(data.map((item) => item.id)));
    }
  };

  const isAllSelected = data.length > 0 && selectedIds.size === data.length;

  return (
    <div className="relative">
      <div className="bg-white border border-light rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-light">
              <th className="p-4 w-12 text-center">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={toggleAll}
                  className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                />
              </th>
              <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
                Doc Name
              </th>
              <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
                Doc Type
              </th>
              <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
                Status
              </th>
              <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
                Expiry
              </th>
              <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest text-center">
                Versions
              </th>
              <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
                Last Updated
              </th>
              <th className="p-4 w-12"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-light">
            {data.map((item) => (
              <tr
                key={item.id}
                // onClick={() => toggleSelect(item.id)}
                onClick={() => router.push(`/evidence/${item.id}`)}
                className={`transition-colors group cursor-pointer ${
                  selectedIds.has(item.id)
                    ? "bg-primary/[0.02]"
                    : "hover:bg-slate-50/50"
                }`}
              >
                <td
                  className="p-4 text-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    type="checkbox"
                    checked={selectedIds.has(item.id)}
                    onChange={() => toggleSelect(item.id)}
                    className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary bg-primary/10 p-1.5 rounded-lg text-lg">
                      {item.icon || "description"}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-main">{item.name}</p>
                      <p className="text-[10px] text-muted font-bold uppercase">
                        ID: {item.displayId}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-xs text-main font-semibold">
                  {item.docType}
                </td>
                <td className="p-4">
                  <StatusChip status={item.status} />
                </td>
                <td className="p-4 text-xs text-main font-medium tabular-nums">
                  {item.expiryDate}
                </td>
                <td className="p-4 text-center">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/5 text-primary text-[10px] font-black tabular-nums border border-primary/20">
                    {item.versions[0]?.versionNumber || "v1.0"}
                  </span>
                </td>
                <td className="p-4 text-xs text-muted font-medium tabular-nums">
                  {item.lastUpdated}
                </td>
                <td className="p-4 text-right">
                  <button className="p-1 hover:bg-slate-100 rounded transition-colors text-muted">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Floating Selection Bar - Only visible when items are selected */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-6 bg-white border border-slate-200 rounded-full px-6 py-3 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
            <div className="flex items-center gap-3 pr-6 border-r border-slate-200">
              <span className="flex items-center justify-center size-6 bg-primary text-white text-[10px] font-black rounded-full">
                {selectedIds.size}
              </span>
              <p className="text-sm font-bold text-main whitespace-nowrap">
                Document{selectedIds.size > 1 ? "s" : ""} Selected
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg transition-all shadow-md shadow-primary/10 transform active:scale-95">
                <span className="material-symbols-outlined text-sm">
                  auto_stories
                </span>
                <span>Add to Pack</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-main text-sm font-bold rounded-lg transition-all">
                <span className="material-symbols-outlined text-sm text-red-500">
                  delete
                </span>
                <span>Delete</span>
              </button>
              <div className="w-px h-6 bg-slate-200 mx-1"></div>
              <button
                onClick={() => setSelectedIds(new Set())}
                className="p-2 hover:bg-slate-50 text-muted rounded-lg"
                title="Clear selection"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
