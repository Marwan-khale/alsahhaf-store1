// Matches DATABASE SCHEMA → COLLECTION: orders

import type { AuditFields, Currency, UnstructuredRecord } from "@/types/common";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export interface Order extends AuditFields {
  orderNumber: string;
  userId: string;
  customerSnapshot: UnstructuredRecord;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: string;
  subtotal: number;
  discount: number;
  shippingFee: number;
  total: number;
  currency: Currency;
  notes: string;
  bankTransferReference: string;
}

// Subcollection: orders/{orderId}/items/{itemId}
export interface OrderItem {
  productId: string;
  productSnapshot: UnstructuredRecord;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}
