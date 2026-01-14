"use client";

import React from "react";
import { DocStatus } from "@/types";
import { StatusChip } from "@/components/ui/StatusChip";
import Link from "next/link";

interface HeaderAction {
  label: string;
  icon: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeaderProps {
  breadcrumbs: Breadcrumb[];
  title: string;
  status?: DocStatus;
  primaryAction?: HeaderAction;
  secondaryAction?: HeaderAction;
}

export const Header = ({
  breadcrumbs,
  title,
  status,
  primaryAction,
  secondaryAction,
}: HeaderProps) => {
  return (
    <header className="sticky top-0 bg-white border-b border-light px-8 pt-6 pb-4 z-50">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-2 text-[10px] text-muted font-black uppercase tracking-widest">
        {breadcrumbs.map((crumb, idx) => (
          <React.Fragment key={idx}>
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-primary transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span
                className={idx === breadcrumbs.length - 1 ? "text-main" : ""}
              >
                {crumb.label}
              </span>
            )}
            {idx < breadcrumbs.length - 1 && (
              <span className="material-symbols-outlined text-[14px]">
                chevron_right
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Main Header Content */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-black text-main tracking-tight">
            {title}
          </h2>
          {status && <StatusChip status={status} />}
        </div>

        <div className="flex gap-3">
          {secondaryAction && (
            <button
              onClick={secondaryAction.onClick}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-white border border-light hover:bg-slate-50 rounded-lg text-sm font-bold shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                {secondaryAction.icon}
              </span>
              <span>{secondaryAction.label}</span>
            </button>
          )}
          {primaryAction && (
            <button
              onClick={primaryAction.onClick}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 rounded-lg text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">
                {primaryAction.icon}
              </span>
              <span>{primaryAction.label}</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
