"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { StatusChip } from "@/components/ui/StatusChip";
import { Evidence } from "@/types";
import { BaseModal } from "../modals/BaseModal";
import { UploadVersionForm } from "./UploadVersionForm";

export default function EvidenceDetailsClient({ doc }: { doc: Evidence }) {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <>
      <Header
        breadcrumbs={[
          { label: "SentryLink Comply", href: "/" },
          { label: "Vault", href: "/vault" },
          { label: doc.name },
        ]}
        title={doc.name}
        status={doc.status}
        secondaryAction={{ label: "Download Current", icon: "download" }}
        primaryAction={{
          label: "Upload New Version",
          icon: "upload",
          onClick: () => setIsUploadOpen(true),
        }}
      />

      <section className="flex-1 overflow-auto p-8 flex flex-col lg:flex-row gap-6">
        {/* Left Column: Metadata */}
        <div className="lg:w-[30%] space-y-6">
          <div className="bg-white border border-light rounded-xl shadow-sm p-6">
            <h3 className="text-[11px] font-black text-muted uppercase tracking-widest mb-4">
              Document Details
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-muted font-bold uppercase mb-1">
                  Doc Type
                </p>
                <p className="text-sm font-semibold text-main">{doc.docType}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted font-bold uppercase mb-1">
                  Status
                </p>
                <StatusChip status={doc.status} />
              </div>
              <div>
                <p className="text-[10px] text-muted font-bold uppercase mb-1">
                  Expiry Date
                </p>
                <p className="text-sm font-semibold text-main">
                  {doc.expiryDate}
                </p>
              </div>
              <div>
                <p className="text-[10px] text-muted font-bold uppercase mb-1">
                  Owner
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-muted border border-light">
                    JD
                  </div>
                  <p className="text-sm font-semibold text-main">Jane Doe</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-8 py-2 px-4 text-xs font-bold text-primary hover:bg-primary/5 rounded-lg border border-primary/20 transition-colors">
              Edit Metadata
            </button>
          </div>

          <div className="bg-white border border-light rounded-xl shadow-sm p-6">
            <h3 className="text-[11px] font-black text-muted uppercase tracking-widest mb-4">
              System Info
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-[10px] text-muted font-bold uppercase">
                  ID
                </span>
                <span className="text-[10px] font-mono font-bold text-main">
                  {doc.displayId}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] text-muted font-bold uppercase">
                  Created
                </span>
                <span className="text-[10px] font-bold text-main">
                  Oct 12, 2023
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Version History */}
        <div className="lg:w-[70%]">
          <div className="bg-white border border-light rounded-xl overflow-x-auto shadow-sm">
            <div className="p-4 border-b border-light bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-[11px] font-black text-muted uppercase tracking-widest">
                Version History
              </h3>
              <span className="text-[10px] font-bold text-muted">
                {doc.versions.length} Total Versions
              </span>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/30 border-b border-light">
                  <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
                    Version
                  </th>
                  <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
                    Date Uploaded
                  </th>
                  <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
                    Uploader
                  </th>
                  <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
                    Notes
                  </th>
                  <th className="p-4 text-[11px] font-black text-muted uppercase tracking-widest">
                    File Size
                  </th>
                  <th className="p-4 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-light">
                {doc.versions.map((v, idx) => (
                  <tr
                    key={v.id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-black border ${
                          idx === 0
                            ? "bg-primary/5 text-primary border-primary/20"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {v.versionNumber}
                      </span>
                      {idx === 0 && (
                        <span className="ml-2 text-[10px] font-bold text-green-600">
                          Current
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-xs text-main font-medium tabular-nums">
                      {v.uploadedAt}
                    </td>
                    <td className="p-4 text-xs text-main font-semibold">
                      {v.uploadedBy}
                    </td>
                    <td className="p-4">
                      <p className="text-xs text-muted leading-relaxed max-w-xs">
                        {v.notes || "No notes provided."}
                      </p>
                    </td>
                    <td className="p-4 text-xs text-muted font-medium tabular-nums">
                      {v.fileSize}
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-1 hover:bg-slate-100 rounded transition-colors text-muted">
                        <span className="material-symbols-outlined">
                          more_vert
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <BaseModal
        isOpen={!!isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        title={`Upload New Version`}
        subtitle="Upload a new version of this document."
        primaryActionLabel="Upload"
        onPrimaryAction={() => console.log("Submit logic...")}
      >
        <UploadVersionForm />
      </BaseModal>
    </>
  );
}
