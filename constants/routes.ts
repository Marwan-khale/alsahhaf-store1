// Route path constants.
// Matches the approved Sitemap documented in the project design document.
// Dynamic segments use the Next.js App Router bracket notation as documented.

export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  CATEGORY: "/category/[slug]",
  SUBCATEGORY: "/category/[slug]/[subcategory-slug]",
  PRODUCT: "/product/[slug]",
  CART: "/cart",
  CHECKOUT: "/checkout",
  WISHLIST: "/wishlist",
  COMPARE: "/compare",
  OFFERS: "/offers",
  BEST_SELLERS: "/best-sellers",
  NEW_ARRIVALS: "/new-arrivals",

  ACCOUNT: "/account",
  ACCOUNT_ORDERS: "/account/orders",
  ACCOUNT_PROFILE: "/account/profile",
  ACCOUNT_ADDRESSES: "/account/addresses",
  ACCOUNT_COUPONS: "/account/coupons",

  AUTH_LOGIN: "/auth/login",
  AUTH_REGISTER: "/auth/register",
  AUTH_FORGOT_PASSWORD: "/auth/forgot-password",

  ABOUT: "/about",
  CONTACT: "/contact",
  FAQ: "/faq",

  ADMIN: "/admin",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_CATEGORIES: "/admin/categories",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_CUSTOMERS: "/admin/customers",
  ADMIN_COUPONS: "/admin/coupons",
  ADMIN_REVIEWS: "/admin/reviews",
  ADMIN_SETTINGS: "/admin/settings",
} as const;
