const { serial, text, varchar, timestamp } = require("drizzle-orm/pg-core");
const { pgTable } = require("drizzle-orm/pg-core");

export const JsonForms = pgTable("jsonforms", {    
    id: serial("id").primaryKey(),
    jsonform: text("jsonform").notNull(),
    createdBy: varchar("createdBy", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(), 
});
