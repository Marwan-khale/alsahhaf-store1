import { OrderRepository } from "@/repositories/OrderRepository";
import { CouponRepository } from "@/repositories/CouponRepository";
import { ORDER_STATUS } from "@/constants/order-status";
import type { Order, OrderItem } from "@/types/order";
import type { Coupon } from "@/types/coupon";
import type { WithId } from "@/types/common";

/**
 * Orchestrates OrderRepository and CouponRepository only, matching the
 * documented PAYMENT ARCHITECTURE workflow: customer creates order →
 * uploads transfer receipt → admin reviews → admin approves/rejects.
 *
 * Per ORDERS security section, customers "Never modify totals / payment
 * status / order status" — this service never accepts those fields from
 * the caller for order creation; totals/order numbers remain
 * server-authoritative (SERVER AUTHORITY section).
 */
export class CheckoutService {
  constructor(
    private readonly orderRepository: OrderRepository = new OrderRepository(),
    private readonly couponRepository: CouponRepository = new CouponRepository()
  ) {}

  /**
   * Creates an order in the documented initial state (pending), then
   * persists its items. Fields the customer must never set (status,
   * totals, order number) are not accepted as input here.
   */
  async createOrder(
    orderData: Omit<Order, "status">,
    items: OrderItem[]
  ): Promise<string> {
    const orderId = await this.orderRepository.create({
      ...orderData,
      status: ORDER_STATUS.PENDING,
    });

    for (const item of items) {
      await this.orderRepository.addItem(orderId, item);
    }

    return orderId;
  }

  getOrderItems(orderId: string): Promise<WithId<OrderItem>[]> {
    return this.orderRepository.findItems(orderId);
  }

  /** Looks up a coupon by code without computing any discount amount. */
  async findValidCoupon(code: string): Promise<WithId<Coupon> | null> {
    const matches = await this.couponRepository.findByCode(code);
    const coupon = matches[0] ?? null;
    if (!coupon || !coupon.isActive || coupon.isDeleted) {
      return null;
    }
    return coupon;
  }
}

export const checkoutService = new CheckoutService();
