import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import { getOrderById } from '#/lib/server/orders'
import { formatPrice } from '#/lib/products'
import { clearCart } from '#/lib/cart-store'

export const Route = createFileRoute('/order/success')({
  validateSearch: (search) => ({
    id: (search as { id?: string }).id ?? '',
  }),
  loaderDeps: ({ search: { id } }) => ({ id }),
  loader: async ({ deps: { id } }) => {
    if (!id) return null
    return getOrderById({ data: { orderId: id } })
  },
  component: OrderSuccess,
  head: () => ({
    meta: [{ title: 'Order Confirmed | OneSwing' }],
  }),
})

function OrderSuccess() {
  const order = Route.useLoaderData()

  // Clear cart on mount
  useEffect(() => {
    clearCart()
  }, [])

  if (!order) {
    return (
      <>
        <section className="bg-os-black pb-16 pt-32">
          <div className="section-wrap">
            <h1
              className="font-display leading-[0.92] tracking-tight text-white"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              ORDER NOT FOUND
            </h1>
          </div>
        </section>
        <section className="bg-white py-20 text-center">
          <p className="mb-8 text-os-slate">
            We couldn't find that order. Please check your email for
            confirmation.
          </p>
          <a href="/" className="btn-primary">
            Go Home
          </a>
        </section>
      </>
    )
  }

  const isAcademy = order.enrollment !== null

  return (
    <>
      {/* Hero */}
      <section className="bg-os-black pb-16 pt-32">
        <div className="section-wrap">
          <span className="kicker mb-4">Order Confirmed</span>
          <h1
            className="font-display leading-[0.92] tracking-tight text-white"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            THANK YOU
            <br />
            <span className="text-os-green">FOR YOUR ORDER</span>
          </h1>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24">
        <div className="section-wrap-sm">
          {/* Confirmation box */}
          <div className="border-2 border-os-green bg-os-gray-50 p-8 md:p-12">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center bg-os-green">
                <svg
                  className="h-6 w-6 text-os-black"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div>
                <p className="font-heading text-sm uppercase tracking-wider text-os-green">
                  Order #{order.id.slice(0, 8)}
                </p>
                <p className="text-sm text-os-slate">{order.email}</p>
              </div>
            </div>

            {/* Items */}
            <h3 className="mb-4 font-heading text-sm uppercase tracking-wider text-os-black">
              Items
            </h3>
            <ul className="mb-6 space-y-3">
              {order.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b border-os-gray-200 pb-3 last:border-0"
                >
                  <div>
                    <p className="font-medium text-os-black">
                      {item.productName}
                    </p>
                    <p className="text-sm text-os-slate">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium text-os-black">
                    {formatPrice(item.priceCents * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-os-black/20 pt-4">
              <span className="font-heading text-sm uppercase tracking-wider text-os-slate">
                Total
              </span>
              <span className="font-heading text-2xl text-os-black">
                {formatPrice(order.totalCents)}
              </span>
            </div>
          </div>

          {/* Academy enrollment details */}
          {isAcademy && order.enrollment && (
            <div className="mt-8 border border-os-gray-200 bg-white p-8">
              <h3 className="mb-4 font-heading text-sm uppercase tracking-wider text-os-green">
                Academy Enrollment Details
              </h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="text-os-slate">Student</dt>
                  <dd className="font-medium text-os-black">
                    {order.enrollment.studentName}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-os-slate">Program</dt>
                  <dd className="font-medium text-os-black">
                    {order.enrollment.tier === 'standard'
                      ? 'Standard Academy'
                      : 'HS/College Academy'}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-os-slate">Shirt Size</dt>
                  <dd className="font-medium text-os-black">
                    {order.enrollment.shirtSize}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-os-slate">Hoodie Size</dt>
                  <dd className="font-medium text-os-black">
                    {order.enrollment.hoodieSize}
                  </dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-os-gray-200 pt-6">
                <h4 className="mb-2 font-heading text-sm uppercase tracking-wider text-os-black">
                  Next Steps
                </h4>
                <ul className="space-y-2 text-sm text-os-slate">
                  <li>
                    You'll receive a confirmation email at{' '}
                    <strong className="text-os-black">
                      {order.enrollment.email}
                    </strong>
                  </li>
                  <li>
                    Our team will reach out with your practice schedule and
                    location details.
                  </li>
                  <li>
                    Location: 452 W Center St Suite 106, Pleasant Grove, UT
                    84062
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-10 text-center">
            <a href="/shop" className="btn-primary">
              Continue Shopping
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
