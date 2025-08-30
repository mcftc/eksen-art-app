import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import postgres from 'postgres'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env.local' })

const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 })
const db = drizzle(migrationClient)

async function main() {
  console.log('Running migrations...')
  
  await migrate(db, {
    migrationsFolder: './lib/db/migrations',
  })
  
  console.log('Migrations completed!')
  process.exit(0)
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})