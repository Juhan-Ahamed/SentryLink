"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() || "/";

  const navLinkClass = (
    href: string,
    activeClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary",
    defaultClass = "flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted hover:bg-slate-50 transition-colors"
  ) => {
    const isRoot = href === "/";
    const matched = isRoot ? pathname === "/" : pathname.startsWith(href);
    return matched ? activeClass : defaultClass;
  };

  return (
    <>
      {/* --- MOBILE TOGGLE BUTTON --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed flex items-center justify-center w-10 h-10 top-4 right-4 z-[60] p-2 bg-white border border-light rounded-lg shadow-sm"
      >
        <span className="material-symbols-outlined">
          {isOpen ? "close" : "menu"}
        </span>
      </button>

      {/* --- OVERLAY --- */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[60] w-64 bg-white border-r border-light transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          flex flex-col shrink-0
        `}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-primary/10 rounded-lg p-2">
              <span className="material-symbols-outlined text-primary text-3xl">
                shield_person
              </span>
            </div>
            <div className="flex flex-col">
              <h1 className="text-base font-bold leading-none tracking-tight">
                SentryLink
              </h1>
              <p className="text-muted text-[10px] font-bold uppercase tracking-wider mt-1">
                Comply Phase A
              </p>
            </div>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            <Link
              onClick={() => setIsOpen(false)}
              className={navLinkClass("/#")}
              href="/#"
            >
              <span className="material-symbols-outlined">dashboard</span>
              <p className="text-sm font-medium">Dashboard</p>
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className={navLinkClass("/")}
              href="/"
            >
              <span className="material-symbols-outlined filled-icon">
                inventory_2
              </span>
              <p className="text-sm font-medium">Evidence Vault</p>
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className={navLinkClass("/requests")}
              href="/requests"
            >
              <span className="material-symbols-outlined">description</span>
              <p className="text-sm font-medium">Requests</p>
            </Link>
            <Link
              onClick={() => setIsOpen(false)}
              className={navLinkClass("/#")}
              href="/#"
            >
              <span className="material-symbols-outlined">settings</span>
              <p className="text-sm font-medium">Settings</p>
            </Link>
          </nav>
          <div className="mt-auto pt-6 border-t border-light">
            <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-xl border border-light/50">
              <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-300">
                <Image
                  width={30}
                  height={30}
                  alt="User avatar"
                  src="/user.png"
                />
              </div>
              <div className="flex flex-col overflow-hidden">
                <p className="text-sm font-semibold truncate">Factory User</p>
                <p className="text-muted text-[10px] truncate">
                  factory-admin-01
                </p>
              </div>
            </div>
            <Link
              className="flex items-center gap-3 px-3 py-2 mt-4 text-muted hover:text-foreground transition-colors"
              href="/#"
            >
              <span className="material-symbols-outlined">help_outline</span>
              <p className="text-sm font-medium">Help Center</p>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
