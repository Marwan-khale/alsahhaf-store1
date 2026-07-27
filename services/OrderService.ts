import { OrderRepository } from "@/repositories/OrderRepository";
import { ORDER_STATUS } from "@/constants/order-status";
import type { Order, OrderItem, OrderStatus } from "@/types/order";
import type { WithId } from "@/types/common";

/**
 * Orchestrates OrderRepository only, for the admin-facing side of order
 * management (ORDERS security section: "Admins ... Update order status
 * ... Cancel orders", and "Orders are immutable after delivery").
 */
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository = new OrderRepository()) {}

  getById(id: string): Promise<WithId<Order> | null> {
    return this.orderRepository.findById(id);
  }

  getAll(): Promise<WithId<Order>[]> {
    return this.orderRepository.findAll();
  }

  getByUser(userId: string): Promise<WithId<Order>[]> {
    return this.orderRepository.findByUser(userId);
  }

  getByStatus(status: OrderStatus): Promise<WithId<Order>[]> {
    return this.orderRepository.findByStatus(status);
  }

  getItems(orderId: string): Promise<WithId<OrderItem>[]> {
    return this.orderRepository.findItems(orderId);
  }

  /** Blocks any status change once an order has already been delivered. */
  async updateStatus(id: string, status: OrderStatus): Promise<void> {
    const order = await this.orderRepository.findById(id);
    if (order?.status === ORDER_STATUS.DELIVERED) {
      throw new Error("Orders are immutable after delivery.");
    }
    return this.orderRepository.updateStatus(id, status);
  }

  cancelOrder(id: string): Promise<void> {
    return this.updateStatus(id, ORDER_STATUS.CANCELLED);
  }
}

export const orderService = new OrderService();
