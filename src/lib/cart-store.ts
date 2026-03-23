import { Store } from '@tanstack/store'
import { PRODUCTS, type ProductSlug } from './products'

export interface CartItem {
  slug: ProductSlug
  quantity: number
}

export interface CartState {
  items: CartItem[]
  isOpen: boolean
}

function getInitialState(): CartState {
  if (typeof window === 'undefined') return { items: [], isOpen: false }
  try {
    const saved = localStorage.getItem('os-cart')
    if (saved) {
      const parsed = JSON.parse(saved)
      return { items: parsed.items || [], isOpen: false }
    }
  } catch {
    // ignore parse errors
  }
  return { items: [], isOpen: false }
}

export const cartStore = new Store<CartState>(getInitialState())

// Persist to localStorage on change
if (typeof window !== 'undefined') {
  cartStore.subscribe(() => {
    try {
      localStorage.setItem(
        'os-cart',
        JSON.stringify({ items: cartStore.state.items }),
      )
    } catch {
      // ignore storage errors
    }
  })
}

export function addToCart(slug: ProductSlug) {
  cartStore.setState((prev) => {
    const existing = prev.items.find((i) => i.slug === slug)
    if (existing) {
      return {
        ...prev,
        isOpen: true,
        items: prev.items.map((i) =>
          i.slug === slug ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      }
    }
    return {
      ...prev,
      isOpen: true,
      items: [...prev.items, { slug, quantity: 1 }],
    }
  })
}

export function removeFromCart(slug: ProductSlug) {
  cartStore.setState((prev) => ({
    ...prev,
    items: prev.items.filter((i) => i.slug !== slug),
  }))
}

export function updateQuantity(slug: ProductSlug, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(slug)
    return
  }
  cartStore.setState((prev) => ({
    ...prev,
    items: prev.items.map((i) =>
      i.slug === slug ? { ...i, quantity } : i,
    ),
  }))
}

export function clearCart() {
  cartStore.setState((prev) => ({ ...prev, items: [], isOpen: false }))
}

export function toggleCart(open?: boolean) {
  cartStore.setState((prev) => ({
    ...prev,
    isOpen: open ?? !prev.isOpen,
  }))
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => {
    const product = PRODUCTS[item.slug]
    return sum + product.priceCents * item.quantity
  }, 0)
}

export function getCartItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0)
}
