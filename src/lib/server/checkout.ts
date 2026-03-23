import { createServerFn } from '@tanstack/react-start'
import { db } from '#/db/index'
import { orders, orderItems, enrollments } from '#/db/schema'
import { PRODUCTS, type ProductSlug } from '#/lib/products'

export const placeOrder = createServerFn({
  method: 'POST',
})
  .inputValidator(
    (data: {
      items: Array<{ slug: string; quantity: number }>
      name: string
      email: string
    }) => data,
  )
  .handler(async ({ data }) => {
    if (!process.env.DATABASE_URL) {
      throw new Error('Orders are not available yet. Database coming soon!')
    }

    // Validate items and compute total server-side
    const validatedItems = data.items
      .map((item) => {
        const product = PRODUCTS[item.slug as ProductSlug]
        if (!product) return null
        return {
          slug: item.slug as ProductSlug,
          quantity: Math.max(1, Math.floor(item.quantity)),
          product,
        }
      })
      .filter(Boolean) as Array<{
      slug: ProductSlug
      quantity: number
      product: (typeof PRODUCTS)[ProductSlug]
    }>

    if (validatedItems.length === 0) {
      throw new Error('No valid items in order')
    }

    const totalCents = validatedItems.reduce(
      (sum, item) => sum + item.product.priceCents * item.quantity,
      0,
    )

    // Insert order
    const [order] = await db
      .insert(orders)
      .values({
        name: data.name,
        email: data.email,
        status: 'completed',
        totalCents,
      })
      .returning({ id: orders.id })

    // Insert order items
    await db.insert(orderItems).values(
      validatedItems.map((item) => ({
        orderId: order.id,
        productSlug: item.slug,
        productName: item.product.name,
        priceCents: item.product.priceCents,
        quantity: item.quantity,
      })),
    )

    return { orderId: order.id }
  })

export const placeAcademyOrder = createServerFn({
  method: 'POST',
})
  .inputValidator(
    (data: {
      tier: 'standard' | 'hs-college'
      studentName: string
      email: string
      phone?: string
      shirtSize: string
      hoodieSize: string
    }) => data,
  )
  .handler(async ({ data }) => {
    if (!process.env.DATABASE_URL) {
      throw new Error('Enrollment is not available yet. Database coming soon!')
    }

    const slug: ProductSlug =
      data.tier === 'standard' ? 'academy-standard' : 'academy-hs-college'
    const product = PRODUCTS[slug]

    // Insert order
    const [order] = await db
      .insert(orders)
      .values({
        name: data.studentName,
        email: data.email,
        status: 'completed',
        totalCents: product.priceCents,
      })
      .returning({ id: orders.id })

    // Insert order item
    await db.insert(orderItems).values({
      orderId: order.id,
      productSlug: slug,
      productName: product.name,
      priceCents: product.priceCents,
      quantity: 1,
    })

    // Insert enrollment
    await db.insert(enrollments).values({
      orderId: order.id,
      tier: data.tier,
      studentName: data.studentName,
      email: data.email,
      phone: data.phone ?? null,
      shirtSize: data.shirtSize,
      hoodieSize: data.hoodieSize,
    })

    return { orderId: order.id }
  })
