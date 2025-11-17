import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Season Model
export const seasons = pgTable("seasons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code", { length: 10 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  numericCode: integer("numeric_code").notNull().unique(),
});

export const insertSeasonSchema = createInsertSchema(seasons).omit({ id: true, numericCode: true });
export type InsertSeason = z.infer<typeof insertSeasonSchema>;
export type Season = typeof seasons.$inferSelect;

// Category Model
export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code", { length: 10 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  numericCode: integer("numeric_code").notNull().unique(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true, numericCode: true });
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

// Type Model
export const types = pgTable("types", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code", { length: 10 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  categoryId: varchar("category_id"),
  numericCode: integer("numeric_code").notNull().unique(),
});

export const insertTypeSchema = createInsertSchema(types).omit({ id: true, numericCode: true });
export type InsertType = z.infer<typeof insertTypeSchema>;
export type Type = typeof types.$inferSelect;

// Fabric Model
export const fabrics = pgTable("fabrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code", { length: 10 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  numericCode: integer("numeric_code").notNull().unique(),
});

export const insertFabricSchema = createInsertSchema(fabrics).omit({ id: true, numericCode: true });
export type InsertFabric = z.infer<typeof insertFabricSchema>;
export type Fabric = typeof fabrics.$inferSelect;

// Color Model
export const colors = pgTable("colors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code", { length: 10 }).notNull().unique(),
  hexValue: varchar("hex_value", { length: 7 }),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  numericCode: integer("numeric_code").notNull().unique(),
});

export const insertColorSchema = createInsertSchema(colors).omit({ id: true, numericCode: true });
export type InsertColor = z.infer<typeof insertColorSchema>;
export type Color = typeof colors.$inferSelect;

// Style Model
export const styles = pgTable("styles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code", { length: 10 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  numericCode: integer("numeric_code").notNull().unique(),
});

export const insertStyleSchema = createInsertSchema(styles).omit({ id: true, numericCode: true });
export type InsertStyle = z.infer<typeof insertStyleSchema>;
export type Style = typeof styles.$inferSelect;

// PrintType Model
export const printTypes = pgTable("print_types", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code", { length: 10 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  numericCode: integer("numeric_code").notNull().unique(),
});

export const insertPrintTypeSchema = createInsertSchema(printTypes).omit({ id: true, numericCode: true });
export type InsertPrintType = z.infer<typeof insertPrintTypeSchema>;
export type PrintType = typeof printTypes.$inferSelect;

// Placement Model
export const placements = pgTable("placements", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code", { length: 10 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  numericCode: integer("numeric_code").notNull().unique(),
});

export const insertPlacementSchema = createInsertSchema(placements).omit({ id: true, numericCode: true });
export type InsertPlacement = z.infer<typeof insertPlacementSchema>;
export type Placement = typeof placements.$inferSelect;

// Supplier Model
export const suppliers = pgTable("suppliers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code", { length: 10 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  numericCode: integer("numeric_code").notNull().unique(),
});

export const insertSupplierSchema = createInsertSchema(suppliers).omit({ id: true, numericCode: true });
export type InsertSupplier = z.infer<typeof insertSupplierSchema>;
export type Supplier = typeof suppliers.$inferSelect;

// Factory Model
export const factories = pgTable("factories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code", { length: 10 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  numericCode: integer("numeric_code").notNull().unique(),
});

export const insertFactorySchema = createInsertSchema(factories).omit({ id: true, numericCode: true });
export type InsertFactory = z.infer<typeof insertFactorySchema>;
export type Factory = typeof factories.$inferSelect;

// Size Model
export const sizes = pgTable("sizes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  code: varchar("code", { length: 10 }).notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en"),
  numericCode: integer("numeric_code").notNull().unique(),
});

export const insertSizeSchema = createInsertSchema(sizes).omit({ id: true, numericCode: true });
export type InsertSize = z.infer<typeof insertSizeSchema>;
export type Size = typeof sizes.$inferSelect;

// MappingToken Model - Maps text codes to numeric codes
export const mappingTokens = pgTable("mapping_tokens", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  token: varchar("token", { length: 50 }).notNull().unique(),
  numericCode: integer("numeric_code").notNull(),
  descriptionAr: text("description_ar").notNull(),
  descriptionEn: text("description_en"),
});

export const insertMappingTokenSchema = createInsertSchema(mappingTokens).omit({ id: true });
export type InsertMappingToken = z.infer<typeof insertMappingTokenSchema>;
export type MappingToken = typeof mappingTokens.$inferSelect;

// Product Model - Main model that references all master data
export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  seasonId: varchar("season_id").notNull(),
  categoryId: varchar("category_id").notNull(),
  typeId: varchar("type_id").notNull(),
  designNo: varchar("design_no", { length: 20 }).notNull(),
  fabricId: varchar("fabric_id").notNull(),
  colorId: varchar("color_id").notNull(),
  styleId: varchar("style_id").notNull(),
  printTypeId: varchar("print_type_id").notNull(),
  placementId: varchar("placement_id").notNull(),
  supplierId: varchar("supplier_id").notNull(),
  factoryId: varchar("factory_id").notNull(),
  sizeId: varchar("size_id").notNull(),
  productNameAr: text("product_name_ar").notNull(),
  productNameEn: text("product_name_en"),
  masterDesignCode: text("master_design_code").notNull(),
  skuCode: text("sku_code").notNull(),
  skuCodedSegmented: text("sku_coded_segmented").notNull(),
  skuCodedCompact: text("sku_coded_compact").notNull(),
  notes: text("notes"),
});

export const insertProductSchema = createInsertSchema(products).omit({ 
  id: true,
  masterDesignCode: true,
  skuCode: true,
  skuCodedSegmented: true,
  skuCodedCompact: true,
});
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;

// Extended Product type with all related data for display purposes
export interface ProductWithDetails extends Product {
  season?: Season;
  category?: Category;
  type?: Type;
  fabric?: Fabric;
  color?: Color;
  style?: Style;
  printType?: PrintType;
  placement?: Placement;
  supplier?: Supplier;
  factory?: Factory;
  size?: Size;
}
