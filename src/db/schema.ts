import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const coffeeTable = sqliteTable("coffee_table", {
  id: int().primaryKey({ autoIncrement: true }),
  verificationid: text().notNull().unique(),
  department: text().notNull(),
  quantity: int().notNull(),
  cost: int().notNull(),
});
