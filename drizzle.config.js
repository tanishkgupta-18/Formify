import { defineConfig } from "drizzle-kit";
 
export default defineConfig({
  schema: "./configs/schema.js",
  out: "./drizzle",
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_y1GT4wlSKCJe@ep-soft-wave-a5i3eh4p-pooler.us-east-2.aws.neon.tech/AIFormBuilder?sslmode=require',
  }
});
