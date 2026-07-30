"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { checkoutSchema, type CheckoutInput } from "@/features/checkout/validation/checkout.schema";
import { PAYMENT_METHODS } from "@/constants/payment-methods";

export interface BankTransferFormProps {
  bankInstructions?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
  onSubmit: (data: CheckoutInput) => void;
  className?: string;
}

/**
 * Form UI only, validated against the existing checkoutSchema.
 * Only bank transfer is offered (the sole ACTIVE_PAYMENT_METHODS entry).
 * onSubmit receives validated data — persisting the order is the caller's
 * responsibility, via CheckoutService.
 */
function BankTransferForm({
  bankInstructions,
  submitLabel = "Place order",
  isSubmitting,
  onSubmit,
  className,
}: BankTransferFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: PAYMENT_METHODS.BANK_TRANSFER,
      bankTransferReference: "",
      notes: "",
    },
  });

  return (
    <form className={cn("flex flex-col gap-4", className)} onSubmit={handleSubmit(onSubmit)}>
      {bankInstructions && (
        <Alert>
          <AlertDescription>{bankInstructions}</AlertDescription>
        </Alert>
      )}

      <input type="hidden" {...register("paymentMethod")} />

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="bankTransferReference">Transfer reference</Label>
        <Input id="bankTransferReference" {...register("bankTransferReference")} />
        {errors.bankTransferReference && (
          <p className="text-xs text-destructive">{errors.bankTransferReference.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="notes">Order notes (optional)</Label>
        <Textarea id="notes" {...register("notes")} />
        {errors.notes && <p className="text-xs text-destructive">{errors.notes.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}

export { BankTransferForm };
