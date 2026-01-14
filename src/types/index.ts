export type DocStatus = "Verified" | "Expiring Soon" | "Expired" | "Pending";

export type DocType =
  | "Compliance Certificate"
  | "Audit Report"
  | "Internal Policy"
  | "Internal Review"
  | "Questionnaire";

export interface EvidenceVersion {
  id: string;
  versionNumber: string;
  uploadedBy: string;
  uploadedAt: string;
  notes: string;
  fileSize: string;
}

export interface Evidence {
  id: string;
  displayId: string;
  name: string;
  icon: string;
  docType:
    | "Compliance Certificate"
    | "Audit Report"
    | "Internal Policy"
    | "Internal Review"
    | "Questionnaire";
  status: "Verified" | "Expiring Soon" | "Expired" | "Pending";
  expiryDate: string;
  lastUpdated: string;
  versions: EvidenceVersion[];
}

export type RequestStatus = "PENDING" | "OVERDUE" | "FULFILLED";

export interface BuyerRequest {
  id: string;
  docType: string;
  category: string;
  dueDate: string;
  isToday?: boolean;
  buyerName: string;
  buyerInitial: string;
  status: RequestStatus;
}

