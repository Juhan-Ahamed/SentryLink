import { evidenceList } from "@/data/evidence";
import EvidenceDetailsClient from "@/components/vault/EvidenceDetailsClient";
import { notFound } from "next/navigation";

export default async function EvidenceDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = evidenceList.find((e) => e.id === id) || evidenceList[0]; // Fallback for demo

  if (!doc) return notFound();

  return (
    <main className="flex-1 flex flex-col overflow-hidden bg-[#F8FAFC]">
      <EvidenceDetailsClient doc={doc} />
    </main>
  );
}
