"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useTransition, useCallback } from "react";

export function FilterBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleSearch = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term) {
        params.set("search", term);
      } else {
        params.delete("search");
      }

      startTransition(() => {
        replace(`${pathname}?${params.toString()}`);
      });
    },
    [searchParams, pathname, replace]
  );

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      replace(pathname);
    });
  };

  return (
    <section className="sticky top-[105px] z-50 px-8 py-4 bg-white border-b border-slate-200 flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-75">
        <div className="relative group">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors text-[20px]">
            search
          </span>
          <input
            type="text"
            placeholder="Search by document name or ID..."
            defaultValue={searchParams.get("search")?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-white border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary rounded-lg pl-10 pr-4 py-2 text-slate-900 placeholder-slate-400 text-sm transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="relative">
          <select
            onChange={(e) => updateParam("type", e.target.value)}
            value={searchParams.get("type") || "all"}
            className="appearance-none flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs font-semibold hover:bg-slate-50 transition-colors pr-8 outline-none"
          >
            <option value="all">Doc Type: All</option>
            <option value="Compliance Certificate">Compliance</option>
            <option value="Audit Report">Audit</option>
            <option value="Internal Policy">Policy</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">
            keyboard_arrow_down
          </span>
        </div>

        <div className="relative">
          <select
            onChange={(e) => updateParam("status", e.target.value)}
            value={searchParams.get("status") || "all"}
            className="appearance-none flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs font-semibold hover:bg-slate-50 transition-colors pr-8 outline-none"
          >
            <option value="all">Status: All</option>
            <option value="Verified">Verified</option>
            <option value="Expired">Expired</option>
            <option value="Pending">Pending</option>
          </select>
          <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">
            keyboard_arrow_down
          </span>
        </div>

        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-900 text-xs font-semibold hover:bg-slate-50 transition-colors">
          <span className="material-symbols-outlined text-slate-400 text-[18px]">
            calendar_month
          </span>
          <span>Last 12m</span>
        </button>
      </div>

      <div className="h-6 w-px bg-slate-200 mx-2"></div>
      <button
        onClick={clearFilters}
        className="cursor-pointer text-primary text-xs font-bold hover:underline transition-all active:scale-95"
      >
        Clear all filters
      </button>

      {isPending && (
        <div className="fixed top-0 left-0 w-full h-1 bg-primary/20 overflow-hidden">
          <div className="w-full h-full bg-primary animate-progress"></div>
        </div>
      )}
    </section>
  );
}
