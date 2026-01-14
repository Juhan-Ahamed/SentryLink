"use client";

import React, { useState, useRef } from "react";

export const UploadVersionForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <label className="text-[11px] font-black text-muted uppercase tracking-widest">
          Notes <span className="text-red-500">*</span>
        </label>
        <textarea
          rows={3}
          placeholder="Describe the changes in this version..."
          className="w-full px-3 py-2 text-sm border border-light rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400"
        />
      </div>

      <div className="space-y-1.5">
        <label
          className="text-[11px] font-black text-muted uppercase tracking-widest"
          htmlFor="expiry"
        >
          Expiry Date
        </label>
        <div className="relative group">
          <input
            type="date"
            id="expiry"
            onClick={(e) => e.currentTarget.showPicker()}
            className="w-full pl-10 pr-3 py-2 text-sm border border-light rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-main cursor-pointer date-input-custom"
          />

          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted text-lg pointer-events-none group-focus-within:text-primary transition-colors">
            calendar_today
          </span>

          <style jsx>{`
            .date-input-custom::-webkit-calendar-picker-indicator {
              display: none;
              -webkit-appearance: none;
            }
          `}</style>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[11px] font-black text-muted uppercase tracking-widest">
          File Upload
        </label>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.docx,.png"
        />
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed transition-all rounded-xl p-8 flex flex-col items-center justify-center group cursor-pointer ${
            selectedFile
              ? "border-primary bg-primary/5"
              : "border-slate-200 hover:border-primary/40 hover:bg-primary/5"
          }`}
        >
          <div className="bg-primary/10 p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-primary text-3xl">
              {selectedFile ? "description" : "cloud_upload"}
            </span>
          </div>
          <p className="text-sm font-semibold text-main mb-1">
            {selectedFile ? selectedFile.name : "Drag and drop file here"}
          </p>
          <p className="text-xs text-muted">
            {selectedFile ? (
              `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`
            ) : (
              <>
                or{" "}
                <span className="text-primary font-bold hover:underline">
                  Browse files
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
