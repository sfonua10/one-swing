import { createFileRoute } from '@tanstack/react-router'
import { PRODUCT_LIST, formatPrice } from '#/lib/products'
import { addToCart } from '#/lib/cart-store'
import type { ProductSlug } from '#/lib/products'

export const Route = createFileRoute('/shop')({
  component: Shop,
  head: () => ({
    meta: [{ title: 'Shop | OneSwing' }],
  }),
})

function Shop() {
  return (
    <>
      {/* Hero */}
      <section className="bg-os-black pb-16 pt-32">
        <div className="section-wrap">
          <span className="kicker mb-4">Shop</span>
          <h1
            className="font-display leading-[0.92] tracking-tight text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            GEAR UP FOR
            <br />
            <span className="text-os-green">BETTER GOLF</span>
          </h1>
        </div>
      </section>

      {/* Products */}
      <section className="bg-white py-16 md:py-24">
        <div className="section-wrap">
          <div className="grid gap-8 md:grid-cols-3">
            {PRODUCT_LIST.map((product) => (
              <div
                key={product.slug}
                className="group border border-os-gray-200 transition-colors duration-300 hover:border-os-green/40"
              >
                <div className="relative aspect-square overflow-hidden bg-os-gray-100">
                  {product.badge && (
                    <span className="absolute left-4 top-4 z-10 bg-os-green px-3 py-1 font-heading text-xs font-semibold uppercase tracking-wider text-os-black">
                      {product.badge}
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-heading text-lg uppercase tracking-wider text-os-black">
                    {product.name}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-os-slate">
                    {product.description}
                  </p>
                  <div className="mb-6 flex items-baseline gap-3">
                    <span className="font-heading text-2xl text-os-black">
                      {formatPrice(product.priceCents)}
                    </span>
                    {product.originalPriceCents && (
                      <span className="text-sm text-os-gray-300 line-through">
                        {formatPrice(product.originalPriceCents)}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => addToCart(product.slug as ProductSlug)}
                    className="btn-primary w-full text-center"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
