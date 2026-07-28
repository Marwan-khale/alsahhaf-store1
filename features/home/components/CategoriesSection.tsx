import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { SectionTitle } from "@/features/home/components/SectionTitle";

export interface CategoryItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

export interface CategoriesSectionProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: string;
  categories: CategoryItem[];
}

const CategoriesSection = React.forwardRef<HTMLElement, CategoriesSectionProps>(
  ({ title, description, categories, className, ...props }, ref) => (
    <section ref={ref} className={cn(className)} {...props}>
      <SectionTitle title={title} description={description} />
      <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            className="flex flex-col items-center gap-2.5 rounded-md border border-border bg-card p-5 text-center transition-transform hover:-translate-y-0.5"
          >
            {category.icon && <span aria-hidden="true">{category.icon}</span>}
            <span className="text-sm font-bold">{category.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
);
CategoriesSection.displayName = "CategoriesSection";

export { CategoriesSection };
