import { useStore } from '@tanstack/react-store'
import {
  cartStore,
  removeFromCart,
  updateQuantity,
  toggleCart,
  getCartTotal,
  getCartItemCount,
} from '#/lib/cart-store'
import { PRODUCTS } from '#/lib/products'
import { formatPrice } from '#/lib/products'

export default function CartDrawer() {
  const { items, isOpen } = useStore(cartStore, (s) => s)
  const total = getCartTotal(items)
  const count = getCartItemCount(items)

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
        onClick={() => toggleCart(false)}
      />

      {/* Drawer */}
      <div className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-os-gray-200 px-6 py-5">
          <h2 className="font-heading text-lg uppercase tracking-wider text-os-black">
            Cart ({count})
          </h2>
          <button
            onClick={() => toggleCart(false)}
            className="p-1 text-os-slate transition-colors hover:text-os-black"
            aria-label="Close cart"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-os-slate">Your cart is empty</p>
              <a
                href="/shop"
                className="btn-primary mt-6 inline-block !px-8 !py-3 text-sm"
                onClick={() => toggleCart(false)}
              >
                Shop Now
              </a>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => {
                const product = PRODUCTS[item.slug]
                return (
                  <li
                    key={item.slug}
                    className="flex gap-4 border-b border-os-gray-200 pb-6 last:border-0"
                  >
                    {/* Thumbnail */}
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-20 w-20 flex-shrink-0 bg-os-gray-100 object-cover"
                    />

                    {/* Details */}
                    <div className="flex flex-1 flex-col">
                      <h3 className="font-heading text-sm uppercase tracking-wider text-os-black">
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-os-black">
                        {formatPrice(product.priceCents)}
                      </p>

                      <div className="mt-auto flex items-center justify-between pt-3">
                        {/* Quantity controls */}
                        <div className="flex items-center border border-os-gray-200">
                          <button
                            onClick={() =>
                              updateQuantity(item.slug, item.quantity - 1)
                            }
                            className="px-3 py-1 text-sm text-os-slate transition-colors hover:text-os-black"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="min-w-[2rem] px-1 text-center text-sm font-medium text-os-black">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.slug, item.quantity + 1)
                            }
                            className="px-3 py-1 text-sm text-os-slate transition-colors hover:text-os-black"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeFromCart(item.slug)}
                          className="text-xs text-os-slate underline transition-colors hover:text-red-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-os-gray-200 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-heading text-sm uppercase tracking-wider text-os-slate">
                Subtotal
              </span>
              <span className="font-heading text-xl text-os-black">
                {formatPrice(total)}
              </span>
            </div>
            <a
              href="/checkout"
              className="btn-primary block w-full text-center"
              onClick={() => toggleCart(false)}
            >
              Checkout
            </a>
            <button
              onClick={() => toggleCart(false)}
              className="mt-3 block w-full py-2 text-center text-sm text-os-slate underline transition-colors hover:text-os-black"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
