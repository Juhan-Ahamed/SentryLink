"use client";
import React, { useState } from "react";
import { Header } from "@/components/Header";
import { RequestsList } from "@/components/Requests/RequestsList";
import { requestsList } from "@/data/requests";
import { BaseModal } from "@/components/modals/BaseModal";
import { FulfillRequestForm } from "@/components/Requests/FulfillRequestForm";
import { BuyerRequest } from "@/types";

export default function RequestsClient() {
 const [activeReq, setActiveReq] = useState<BuyerRequest | null>(null);

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <Header
        breadcrumbs={[
          { label: "SentryLink Comply", href: "/" },
          { label: "Requests", href: "/requests" },
        ]}
        title={"Buyer Requests"}
      />

      <div className="flex-1 overflow-auto px-8 py-6">
        <RequestsList
          requests={requestsList}
          onFulfill={(req) => setActiveReq(req)}
        />
      </div>

      <BaseModal
        isOpen={!!activeReq}
        onClose={() => setActiveReq(null)}
        title={`Fulfill Request: ${activeReq?.docType}`}
        subtitle="Select evidence to fulfill the buyer's requirement."
        primaryActionLabel="Mark as Fulfilled"
        onPrimaryAction={() => console.log("Submit logic...")}
      >
        <FulfillRequestForm />
      </BaseModal>
    </main>
  );
}
