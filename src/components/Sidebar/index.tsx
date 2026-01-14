"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
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
      <aside className="w-64 shrink-0 flex flex-col bg-white border-r border-light">
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
            <Link className={navLinkClass("/#")} href="/#">
              <span className="material-symbols-outlined">dashboard</span>
              <p className="text-sm font-medium">Dashboard</p>
            </Link>
            <Link className={navLinkClass("/")} href="/">
              <span className="material-symbols-outlined filled-icon">
                inventory_2
              </span>
              <p className="text-sm font-bold">Evidence Vault</p>
            </Link>
            <Link className={navLinkClass("/requests")} href="/requests">
              <span className="material-symbols-outlined">description</span>
              <p className="text-sm font-medium">Requests</p>
            </Link>
            <Link
              className={navLinkClass(
                "/#",
                undefined,
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted hover:bg-slate-50 transition-colors"
              )}
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
