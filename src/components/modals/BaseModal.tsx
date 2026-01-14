"use client";
import React from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  children: React.ReactNode;
}

export const BaseModal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  primaryActionLabel,
  onPrimaryAction,
  children,
}: BaseModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-2xl rounded-xl shadow-2xl border border-light flex flex-col max-h-[90vh] animate-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()} 
      >
       
        <div className="p-6 border-b border-light flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-main tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-muted font-medium mt-1">
                {subtitle}
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="cursor-pointer text-muted hover:text-main transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        
        <div className="flex-1 overflow-auto p-6">{children}</div>

       
        <div className="p-6 border-t border-light bg-slate-50 flex justify-end items-center gap-3 rounded-b-xl">
          <button
            onClick={onClose}
            className="cursor-pointer px-5 py-2 text-sm font-bold text-muted hover:text-main transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onPrimaryAction}
            className="cursor-pointer px-6 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-bold rounded-lg shadow-md shadow-primary/20 transition-all"
          >
            {primaryActionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};
