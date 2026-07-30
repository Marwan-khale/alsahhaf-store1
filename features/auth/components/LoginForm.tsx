"use client";

import * as React from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { loginSchema, type LoginInput } from "@/features/auth/validation/login.schema";

export interface LoginFormProps {
  isSubmitting?: boolean;
  errorMessage?: string;
  forgotPasswordHref?: string;
  submitLabel?: string;
  onSubmit: (data: LoginInput) => void;
  className?: string;
}

/**
 * Form UI only, validated against the existing loginSchema.
 * Does not call Firebase Authentication itself — the caller wires
 * onSubmit to features/auth/hooks/useSignIn.
 */
function LoginForm({
  isSubmitting,
  errorMessage,
  forgotPasswordHref,
  submitLabel = "Sign in",
  onSubmit,
  className,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form className={cn("flex flex-col gap-4", className)} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" autoComplete="email" {...register("email")} />
        {errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          {forgotPasswordHref && (
            <Link href={forgotPasswordHref} className="text-xs font-semibold text-secondary hover:underline">
              Forgot password?
            </Link>
          )}
        </div>
        <Input id="password" type="password" autoComplete="current-password" {...register("password")} />
        {errors.password && <p className="text-xs text-destructive">{errors.password.message}</p>}
      </div>

      {errorMessage && <p className="text-xs text-destructive">{errorMessage}</p>}

      <Button type="submit" disabled={isSubmitting}>
        {submitLabel}
      </Button>
    </form>
  );
}

export { LoginForm };
