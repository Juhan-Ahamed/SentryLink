import { BuyerRequest } from "@/types";

export const requestsList: BuyerRequest[] = [
  {
    id: "REQ-001",
    docType: "SOC 2 Type II Report",
    category: "Annual Compliance",
    dueDate: "Oct 24, 2023",
    isToday: true,
    buyerName: "Global Retail Corp",
    buyerInitial: "G",
    status: "PENDING",
  },
  {
    id: "REQ-002",
    docType: "Environmental Policy",
    category: "ESG Disclosure",
    dueDate: "Oct 20, 2023",
    buyerName: "Apex Logistics",
    buyerInitial: "A",
    status: "OVERDUE",
  },
  {
    id: "REQ-003",
    docType: "ISO 27001 Certificate",
    category: "Information Security",
    dueDate: "Nov 12, 2023",
    buyerName: "BlueWave Systems",
    buyerInitial: "B",
    status: "PENDING",
  },
  {
    id: "REQ-004",
    docType: "Modern Slavery Statement",
    category: "Social Responsibility",
    dueDate: "Oct 15, 2023",
    buyerName: "TerraForm Inc",
    buyerInitial: "T",
    status: "FULFILLED",
  },
];
