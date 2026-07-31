"use client";

import * as React from "react";
import { CreditCard, Truck, LayoutGrid } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import {
  HeroSection,
  CategoriesSection,
  FeaturedProductsSection,
  OffersSection,
  BenefitsSection,
  NewsletterSection,
} from "@/features/home/components";
import {
  ProductGrid,
  ProductCard,
  LoadingProducts,
  EmptyProducts,
} from "@/features/products/components";
import { useFeaturedProducts } from "@/features/products/hooks/useFeaturedProducts";
import { useProducts } from "@/features/products/hooks/useProducts";
import { useCategories } from "@/features/categories/hooks/useCategories";
import { ROUTES } from "@/constants/routes";
import { siteConfig } from "@/config/siteConfig";
import type { Product } from "@/types/product";
import type { WithId } from "@/types/common";

function toProductCardProps(product: WithId<Product>) {
  return {
    name: product.name_ar,
    imageUrl: product.thumbnail || product.images[0],
    price: product.price,
    comparePrice: product.comparePrice > product.price ? product.comparePrice : undefined,
    currency: product.currency,
    rating: product.ratingCount > 0 ? { average: product.ratingAverage, count: product.ratingCount } : undefined,
    badges: product.isFeatured ? [{ label: "مميز" }] : [],
    href: `/product/${product.slug}`,
  };
}

export default function HomePage() {
  const featured = useFeaturedProducts();
  const allProducts = useProducts();
  const categories = useCategories();

  const discountedProducts = (allProducts.data ?? []).filter((product) => product.comparePrice > product.price);

  return (
    <Container>
      <Section className="mt-6">
        <HeroSection
          eyebrow={siteConfig.name}
          title="كل ما يحتاجه أبناؤك في مكان واحد"
          description="أدوات مكتبية، قرطاسية، وكتب — توصيل داخل اليمن وتحويل بنكي آمن."
          ctas={[{ label: "تسوّق الآن", href: ROUTES.BEST_SELLERS }]}
        />
      </Section>

      {categories.data && categories.data.length > 0 && (
        <Section>
          <CategoriesSection
            title="تسوّق حسب القسم"
            categories={categories.data.map((category) => ({
              label: category.name_ar,
              href: `/category/${category.slug}`,
            }))}
          />
        </Section>
      )}

      <Section>
        <FeaturedProductsSection title="منتجات مميزة">
          {featured.isLoading ? (
            <LoadingProducts />
          ) : featured.data && featured.data.length > 0 ? (
            <ProductGrid>
              {featured.data.map((product) => (
                <ProductCard key={product.id} {...toProductCardProps(product)} />
              ))}
            </ProductGrid>
          ) : (
            <EmptyProducts title="لا توجد منتجات مميزة حاليًا" />
          )}
        </FeaturedProductsSection>
      </Section>

      {discountedProducts.length > 0 && (
        <Section>
          <OffersSection title="عروض حالية">
            <ProductGrid>
              {discountedProducts.map((product) => (
                <ProductCard key={product.id} {...toProductCardProps(product)} />
              ))}
            </ProductGrid>
          </OffersSection>
        </Section>
      )}

      <Section>
        <BenefitsSection
          items={[
            { icon: <Truck className="h-5 w-5" />, title: "توصيل داخل اليمن" },
            { icon: <CreditCard className="h-5 w-5" />, title: "دفع آمن عبر تحويل بنكي" },
            { icon: <LayoutGrid className="h-5 w-5" />, title: "تشكيلة واسعة من الأدوات المكتبية والقرطاسية والكتب" },
          ]}
        />
      </Section>

      <Section className="mb-16">
        <NewsletterSection
          title="اشترك في نشرتنا"
          description="تابع أحدث المنتجات والعروض"
          onSubmit={() => {
            // No newsletter collection/service exists yet — intentionally a no-op
            // until that capability is approved and built.
          }}
        />
      </Section>
    </Container>
  );
}
