import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useStore } from '@tanstack/react-store'
import {
  cartStore,
  clearCart,
  getCartTotal,
  removeFromCart,
  updateQuantity,
} from '#/lib/cart-store'
import { PRODUCTS, formatPrice } from '#/lib/products'
import { placeOrder } from '#/lib/server/checkout'

export const Route = createFileRoute('/checkout')({
  component: Checkout,
  head: () => ({
    meta: [{ title: 'Checkout | OneSwing' }],
  }),
})

function Checkout() {
  const { items } = useStore(cartStore, (s) => s)
  const total = getCartTotal(items)
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (items.length === 0) {
    return (
      <>
        <section className="bg-os-black pb-16 pt-32">
          <div className="section-wrap">
            <span className="kicker mb-4">Checkout</span>
            <h1
              className="font-display leading-[0.92] tracking-tight text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              YOUR CART IS EMPTY
            </h1>
          </div>
        </section>
        <section className="bg-white py-20 text-center">
          <p className="mb-8 text-os-slate">
            Add some items to your cart before checking out.
          </p>
          <a href="/shop" className="btn-primary">
            Shop Now
          </a>
        </section>
      </>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please fill in your name and email.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const result = await placeOrder({
        data: {
          items: items.map((i) => ({ slug: i.slug, quantity: i.quantity })),
          name: name.trim(),
          email: email.trim(),
        },
      })
      clearCart()
      navigate({ to: '/order/success', search: { id: result.orderId } })
    } catch (err) {
      setError('Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  return (
    <>
      <section className="bg-os-black pb-16 pt-32">
        <div className="section-wrap">
          <span className="kicker mb-4">Checkout</span>
          <h1
            className="font-display leading-[0.92] tracking-tight text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            COMPLETE YOUR ORDER
          </h1>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="section-wrap">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Order form */}
            <form onSubmit={handleSubmit} className="md:col-span-3">
              <h2 className="mb-6 font-heading text-lg uppercase tracking-wider text-os-black">
                Your Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-medium text-os-slate"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-os-gray-200 px-4 py-3 text-os-black outline-none transition-colors focus:border-os-green"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-medium text-os-slate"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-os-gray-200 px-4 py-3 text-os-black outline-none transition-colors focus:border-os-green"
                  />
                </div>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-500">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary mt-8 w-full text-center disabled:opacity-50"
              >
                {submitting ? 'Processing...' : `Place Order — ${formatPrice(total)}`}
              </button>

              <p className="mt-3 text-center text-xs text-os-slate">
                Payment processing will be available soon. Orders are currently
                recorded for fulfillment.
              </p>
            </form>

            {/* Order summary */}
            <div className="md:col-span-2">
              <h2 className="mb-6 font-heading text-lg uppercase tracking-wider text-os-black">
                Order Summary
              </h2>

              <div className="border border-os-gray-200 bg-os-gray-50 p-6">
                <ul className="space-y-4">
                  {items.map((item) => {
                    const product = PRODUCTS[item.slug]
                    return (
                      <li
                        key={item.slug}
                        className="flex items-start justify-between gap-4"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-os-black">
                            {product.name}
                          </p>
                          <div className="mt-1 flex items-center gap-3">
                            <div className="flex items-center border border-os-gray-200 bg-white">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.slug, item.quantity - 1)
                                }
                                className="px-2 py-0.5 text-xs text-os-slate hover:text-os-black"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs">{item.quantity}</span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.slug, item.quantity + 1)
                                }
                                className="px-2 py-0.5 text-xs text-os-slate hover:text-os-black"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeFromCart(item.slug)}
                              className="text-xs text-os-slate underline hover:text-red-500"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <p className="text-sm font-medium text-os-black">
                          {formatPrice(product.priceCents * item.quantity)}
                        </p>
                      </li>
                    )
                  })}
                </ul>

                <div className="mt-6 border-t border-os-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-sm uppercase tracking-wider text-os-slate">
                      Total
                    </span>
                    <span className="font-heading text-xl text-os-black">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
