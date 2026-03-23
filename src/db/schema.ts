import { sql } from 'drizzle-orm'
import {
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

export const todos = pgTable('todos', {
  id: serial().primaryKey(),
  title: text().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})

export const orders = pgTable('orders', {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text().notNull(),
  name: text().notNull(),
  status: text().notNull().default('pending'),
  totalCents: integer('total_cents').notNull(),
  paymentProvider: text('payment_provider'),
  paymentId: text('payment_id'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
})

export const orderItems = pgTable('order_items', {
  id: serial().primaryKey(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id),
  productSlug: text('product_slug').notNull(),
  productName: text('product_name').notNull(),
  priceCents: integer('price_cents').notNull(),
  quantity: integer().notNull().default(1),
})

export const enrollments = pgTable('enrollments', {
  id: serial().primaryKey(),
  orderId: uuid('order_id')
    .notNull()
    .references(() => orders.id),
  tier: text().notNull(),
  studentName: text('student_name').notNull(),
  email: text().notNull(),
  phone: text(),
  shirtSize: text('shirt_size').notNull(),
  hoodieSize: text('hoodie_size').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
})
