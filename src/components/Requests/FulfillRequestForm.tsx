"use client";

const vaultFiles = [
  {
    id: 1,
    name: "ISO 27001 Certificate - 2023_Final.pdf",
    meta: "Updated Oct 12, 2023 • v2.4",
  },
  {
    id: 2,
    name: "Global InfoSec Policy - Revision C.pdf",
    meta: "Updated Sep 05, 2023 • v1.1",
  },
  {
    id: 3,
    name: "Annex A Statement of Applicability.docx",
    meta: "Updated Aug 22, 2023 • v3.0",
  },
];

export const FulfillRequestForm = () => {
  return (
    <div className="space-y-6">
      <div className="flex bg-slate-100 p-1 rounded-lg">
        <button className="flex-1 py-2 text-sm font-bold rounded-md bg-white text-primary shadow-sm border border-slate-200/50 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">inventory_2</span>{" "}
          Choose from Vault
        </button>
        <button className="flex-1 py-2 text-sm font-semibold text-muted hover:text-main flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-sm">upload_file</span>{" "}
          Upload New Evidence
        </button>
      </div>

      <div className="relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted text-sm">
          search
        </span>
        <input
          className="w-full pl-9 pr-4 py-2 border border-light rounded-lg text-sm outline-none"
          defaultValue="ISO 27001"
        />
      </div>

      <div className="border border-light rounded-lg overflow-hidden bg-slate-50/30 divide-y divide-light">
        {vaultFiles.map((file) => (
          <label
            key={file.id}
            className="flex items-center gap-4 p-4 hover:bg-white cursor-pointer group transition-colors"
          >
            <input
              type="checkbox"
              defaultChecked={file.id === 1}
              className="rounded border-slate-300 text-primary focus:ring-primary h-4 w-4"
            />
            <div className="flex flex-col flex-1">
              <span className="text-sm font-bold text-main">
                {file.name}
              </span>
              <span className="text-[10px] text-muted font-medium uppercase mt-0.5">
                {file.meta}
              </span>
            </div>
            <span className="material-symbols-outlined text-muted opacity-0 group-hover:opacity-100 transition-opacity">
              visibility
            </span>
          </label>
        ))}
      </div>

      {/* Info Box */}
      <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-xl mt-0.5">
          info
        </span>
        <div>
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">
            Preview of Selected Document
          </h4>
          <p className="text-sm text-main mt-1 leading-relaxed">
            The selected certificate expires on{" "}
            <span className="font-bold">Oct 12, 2024</span>. It will fulfill the
            requirement for <span className="font-bold">BlueWave Systems</span>.
          </p>
        </div>
      </div>
    </div>
  );
};
