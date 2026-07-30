"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "@/features/auth/validation/forgot-password.schema";

export interface ForgotPasswordFormProps {
  isSubmitting?: boolean;
  errorMessage?: string;
  successMessage?: string;
  submitLabel?: string;
  onSubmit: (data: ForgotPasswordInput) => void;
  className?: string;
}

/** Form UI only, validated against the existing forgotPasswordSchema. No Firebase call happens here. */
function ForgotPasswordForm({
  isSubmitting,
  errorMessage,
  successMessage,
  submitLabel = "Send reset link",
  onSubmit,
  className,
}: ForgotPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  return (
    <form className={cn("flex flex-col gap-4", className)} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      {errorMessage && <p className="text-xs text-destructive">{errorMessage}</p>}
      {successMessage && <p className="text-xs text-success">{successMessage}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}

export { ForgotPasswordForm };
