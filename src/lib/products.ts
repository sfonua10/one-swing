export const PRODUCTS = {
  trainer: {
    slug: 'trainer' as const,
    name: 'OneSwing Trainer',
    priceCents: 29999,
    originalPriceCents: 49999,
    image:
      'https://one-swing.com/wp-content/uploads/2023/12/KOLF-ProductShoot-1-768x768.jpg',
    description:
      'Wall-mounted golf swing training aid. Attaches to any wall. Build muscle memory with just 5 minutes a day.',
    badge: 'SALE' as const,
    type: 'physical' as const,
  },
  'academy-standard': {
    slug: 'academy-standard' as const,
    name: 'One Swing Academy',
    priceCents: 59900,
    originalPriceCents: null,
    image: 'https://one-swing.com/wp-content/uploads/2024/01/1.png',
    description:
      'Professional instruction with Gipper Finau, OneSwing Trainer device, 3D swing analysis, weekly practices, and branded merchandise.',
    badge: null,
    type: 'academy' as const,
    tier: 'standard' as const,
  },
  'academy-hs-college': {
    slug: 'academy-hs-college' as const,
    name: 'One Swing HS/College Academy',
    priceCents: 79900,
    originalPriceCents: null,
    image: 'https://one-swing.com/wp-content/uploads/2024/01/2.png',
    description:
      'Advanced academy program designed for high school and college golfers looking to take their game to the next level.',
    badge: null,
    type: 'academy' as const,
    tier: 'hs-college' as const,
  },
} as const

export type ProductSlug = keyof typeof PRODUCTS
export type Product = (typeof PRODUCTS)[ProductSlug]

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function getProduct(slug: string) {
  return PRODUCTS[slug as ProductSlug] ?? null
}

export const PRODUCT_LIST = Object.values(PRODUCTS)
