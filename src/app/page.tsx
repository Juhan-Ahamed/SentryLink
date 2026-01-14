import { Header } from "@/components/Header";
import { FilterBar } from "@/components/vault/FilterBar";
import { VaultTable } from "@/components/vault/VaultTable";
import { evidenceList } from "@/data/evidence";

export default async function VaultPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;

  const searchQuery = params.search?.toLowerCase() || "";
  const typeFilter = params.type || "all";
  const statusFilter = params.status || "all";

 const filteredData = evidenceList.filter((item) => {
   const matchesSearch =
     item.name.toLowerCase().includes(searchQuery) ||
     item.displayId.toLowerCase().includes(searchQuery);

   const matchesType = typeFilter === "all" || item.docType === typeFilter;

   const matchesStatus = statusFilter === "all" || item.status === statusFilter;

   return matchesSearch && matchesType && matchesStatus;
 });

  return (
    <>
      <Header
        breadcrumbs={[
          { label: "SentryLink Comply", href: "/" },
          { label: "Vault", href: "/vault" },
        ]}
        title="Evidence Vault"
      />
      
      <FilterBar />

      <div className="flex-1 overflow-auto px-8 py-6">
        <VaultTable data={filteredData} />
      </div>
    </>
  );
}
