"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  couponCodeSchema,
  type CouponCodeInput,
} from "@/features/checkout/validation/coupon-code.schema";

export interface CouponFormProps {
  applyLabel?: string;
  isSubmitting?: boolean;
  errorMessage?: string;
  onSubmit: (data: CouponCodeInput) => void;
  className?: string;
}

/**
 * Form UI only, validated against the existing couponCodeSchema.
 * Whether the code is actually valid is decided by the caller
 * (via CheckoutService.findValidCoupon) — this component only collects it.
 */
function CouponForm({ applyLabel = "Apply", isSubmitting, errorMessage, onSubmit, className }: CouponFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponCodeInput>({
    resolver: zodResolver(couponCodeSchema),
    defaultValues: { code: "" },
  });

  return (
    <form className={cn("flex flex-col gap-1.5", className)} onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2">
        <Input placeholder="Coupon code" aria-label="Coupon code" {...register("code")} />
        <Button type="submit" variant="outline" disabled={isSubmitting}>
          {applyLabel}
        </Button>
      </div>
      {(errors.code || errorMessage) && (
        <p className="text-xs text-destructive">{errors.code?.message ?? errorMessage}</p>
      )}
    </form>
  );
}

export { CouponForm };
