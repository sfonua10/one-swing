import { createServerFn } from '@tanstack/react-start'
import { db } from '#/db/index'
import { orders, orderItems, enrollments } from '#/db/schema'
import { eq } from 'drizzle-orm'

export const getOrderById = createServerFn({
  method: 'GET',
})
  .inputValidator((data: { orderId: string }) => data)
  .handler(async ({ data }) => {
    if (!data.orderId) return null

    const order = await db.query.orders.findFirst({
      where: eq(orders.id, data.orderId),
    })

    if (!order) return null

    const items = await db
      .select()
      .from(orderItems)
      .where(eq(orderItems.orderId, data.orderId))

    const enrollment = await db
      .select()
      .from(enrollments)
      .where(eq(enrollments.orderId, data.orderId))

    return {
      ...order,
      items,
      enrollment: enrollment[0] ?? null,
    }
  })
