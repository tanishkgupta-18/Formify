import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema.js'; // Import your schema here
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL_CONFIG);
export const db = drizzle(sql,{schema});
//original code
// export const db = drizzle({ client: sql });