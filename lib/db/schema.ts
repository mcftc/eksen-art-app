import { pgTable, uuid, varchar, text, jsonb, integer, boolean, timestamp, date, inet } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

// Stand Types Table
export const standTypes = pgTable('stand_types', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
  nameTr: varchar('name_tr', { length: 200 }).notNull(),
  nameEn: varchar('name_en', { length: 200 }),
  descriptionTr: text('description_tr'),
  descriptionEn: text('description_en'),
  features: jsonb('features'),
  materials: jsonb('materials'),
  sizes: jsonb('sizes'),
  leadTime: varchar('lead_time', { length: 100 }),
  idealFor: text('ideal_for'),
  images: jsonb('images'),
  orderIndex: integer('order_index').default(0),
  isActive: boolean('is_active').default(true),
  metaTitle: varchar('meta_title', { length: 200 }),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// Services Table
export const services = pgTable('services', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 100 }).unique().notNull(),
  nameTr: varchar('name_tr', { length: 200 }).notNull(),
  nameEn: varchar('name_en', { length: 200 }),
  descriptionTr: text('description_tr'),
  descriptionEn: text('description_en'),
  icon: varchar('icon', { length: 50 }),
  features: jsonb('features'),
  orderIndex: integer('order_index').default(0),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// Projects Table
export const projects = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: varchar('slug', { length: 200 }).unique().notNull(),
  title: varchar('title', { length: 300 }).notNull(),
  clientName: varchar('client_name', { length: 200 }),
  standTypeId: uuid('stand_type_id').references(() => standTypes.id),
  location: varchar('location', { length: 200 }),
  eventName: varchar('event_name', { length: 300 }),
  eventDate: date('event_date'),
  sizeSqm: integer('size_sqm'),
  description: text('description'),
  features: jsonb('features'),
  images: jsonb('images'),
  isFeatured: boolean('is_featured').default(false),
  isActive: boolean('is_active').default(true),
  viewCount: integer('view_count').default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
})

// Quote Requests Table
export const quoteRequests = pgTable('quote_requests', {
  id: uuid('id').primaryKey().defaultRandom(),
  companyName: varchar('company_name', { length: 300 }),
  contactName: varchar('contact_name', { length: 200 }).notNull(),
  email: varchar('email', { length: 200 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  standType: varchar('stand_type', { length: 50 }),
  eventName: varchar('event_name', { length: 300 }),
  eventDate: date('event_date'),
  location: varchar('location', { length: 200 }),
  sizeSqm: integer('size_sqm'),
  budgetRange: varchar('budget_range', { length: 50 }),
  message: text('message'),
  status: varchar('status', { length: 50 }).default('new'),
  source: varchar('source', { length: 100 }),
  ipAddress: inet('ip_address'),
  userAgent: text('user_agent'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// Contact Messages Table
export const contactMessages = pgTable('contact_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 200 }).notNull(),
  email: varchar('email', { length: 200 }).notNull(),
  phone: varchar('phone', { length: 50 }),
  subject: varchar('subject', { length: 300 }),
  message: text('message').notNull(),
  status: varchar('status', { length: 50 }).default('unread'),
  ipAddress: inet('ip_address'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
})

// Type exports for TypeScript
export type StandType = typeof standTypes.$inferSelect
export type NewStandType = typeof standTypes.$inferInsert

export type Service = typeof services.$inferSelect
export type NewService = typeof services.$inferInsert

export type Project = typeof projects.$inferSelect
export type NewProject = typeof projects.$inferInsert

export type QuoteRequest = typeof quoteRequests.$inferSelect
export type NewQuoteRequest = typeof quoteRequests.$inferInsert

export type ContactMessage = typeof contactMessages.$inferSelect
export type NewContactMessage = typeof contactMessages.$inferInsert