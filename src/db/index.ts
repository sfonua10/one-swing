import * as schema from './schema.ts'

let _db: ReturnType<typeof import('drizzle-orm/neon-http').drizzle> | null =
  null

export function getDb() {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL is not set. Connect a Neon database to enable orders.',
      )
    }
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { neon } = require('@neondatabase/serverless')
    const { drizzle } = require('drizzle-orm/neon-http')
    const sql = neon(process.env.DATABASE_URL)
    _db = drizzle(sql, { schema })
  }
  return _db!
}

// Re-export for backwards compat — lazy, only errors when actually used
export const db = new Proxy({} as ReturnType<typeof getDb>, {
  get(_target, prop) {
    return (getDb() as any)[prop]
  },
})
