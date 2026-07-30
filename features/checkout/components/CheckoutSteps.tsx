import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CheckoutStep {
  id: string;
  label: string;
}

export interface CheckoutStepsProps {
  steps: CheckoutStep[];
  currentStepId: string;
  completedStepIds?: string[];
  className?: string;
}

/** Displays the given steps and current position — does not control navigation itself. */
function CheckoutSteps({ steps, currentStepId, completedStepIds = [], className }: CheckoutStepsProps) {
  return (
    <ol className={cn("flex items-center gap-2", className)}>
      {steps.map((step, index) => {
        const isCompleted = completedStepIds.includes(step.id);
        const isCurrent = step.id === currentStepId;

        return (
          <li key={step.id} className="flex items-center gap-2">
            <span
              className={cn(
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-bold",
                isCompleted && "border-success bg-success text-white",
                isCurrent && !isCompleted && "border-primary bg-primary text-primary-foreground",
                !isCompleted && !isCurrent && "border-border text-muted-foreground"
              )}
              aria-current={isCurrent ? "step" : undefined}
            >
              {isCompleted ? <Check className="h-3.5 w-3.5" /> : index + 1}
            </span>
            <span className={cn("text-sm font-semibold", !isCurrent && !isCompleted && "text-muted-foreground")}>
              {step.label}
            </span>
            {index < steps.length - 1 && <span className="mx-1 h-px w-6 bg-border" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}

export { CheckoutSteps };
