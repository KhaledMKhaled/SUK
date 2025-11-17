import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq, sql, max } from "drizzle-orm";
import {
  seasons, categories, types, fabrics, colors, styles, printTypes, placements,
  suppliers, factories, sizes, mappingTokens, products,
  type Season, type InsertSeason,
  type Category, type InsertCategory,
  type Type, type InsertType,
  type Fabric, type InsertFabric,
  type Color, type InsertColor,
  type Style, type InsertStyle,
  type PrintType, type InsertPrintType,
  type Placement, type InsertPlacement,
  type Supplier, type InsertSupplier,
  type Factory, type InsertFactory,
  type Size, type InsertSize,
  type MappingToken, type InsertMappingToken,
  type Product, type InsertProduct, type ProductWithDetails
} from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

const connection = neon(process.env.DATABASE_URL);
const db = drizzle(connection);

export interface IStorage {
  getSeasons(): Promise<Season[]>;
  getSeason(id: string): Promise<Season | undefined>;
  createSeason(data: InsertSeason): Promise<Season>;
  updateSeason(id: string, data: InsertSeason): Promise<Season | undefined>;
  deleteSeason(id: string): Promise<boolean>;

  getCategories(): Promise<Category[]>;
  getCategory(id: string): Promise<Category | undefined>;
  createCategory(data: InsertCategory): Promise<Category>;
  updateCategory(id: string, data: InsertCategory): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;

  getTypes(): Promise<Type[]>;
  getType(id: string): Promise<Type | undefined>;
  createType(data: InsertType): Promise<Type>;
  updateType(id: string, data: InsertType): Promise<Type | undefined>;
  deleteType(id: string): Promise<boolean>;

  getFabrics(): Promise<Fabric[]>;
  getFabric(id: string): Promise<Fabric | undefined>;
  createFabric(data: InsertFabric): Promise<Fabric>;
  updateFabric(id: string, data: InsertFabric): Promise<Fabric | undefined>;
  deleteFabric(id: string): Promise<boolean>;

  getColors(): Promise<Color[]>;
  getColor(id: string): Promise<Color | undefined>;
  createColor(data: InsertColor): Promise<Color>;
  updateColor(id: string, data: InsertColor): Promise<Color | undefined>;
  deleteColor(id: string): Promise<boolean>;

  getStyles(): Promise<Style[]>;
  getStyle(id: string): Promise<Style | undefined>;
  createStyle(data: InsertStyle): Promise<Style>;
  updateStyle(id: string, data: InsertStyle): Promise<Style | undefined>;
  deleteStyle(id: string): Promise<boolean>;

  getPrintTypes(): Promise<PrintType[]>;
  getPrintType(id: string): Promise<PrintType | undefined>;
  createPrintType(data: InsertPrintType): Promise<PrintType>;
  updatePrintType(id: string, data: InsertPrintType): Promise<PrintType | undefined>;
  deletePrintType(id: string): Promise<boolean>;

  getPlacements(): Promise<Placement[]>;
  getPlacement(id: string): Promise<Placement | undefined>;
  createPlacement(data: InsertPlacement): Promise<Placement>;
  updatePlacement(id: string, data: InsertPlacement): Promise<Placement | undefined>;
  deletePlacement(id: string): Promise<boolean>;

  getSuppliers(): Promise<Supplier[]>;
  getSupplier(id: string): Promise<Supplier | undefined>;
  createSupplier(data: InsertSupplier): Promise<Supplier>;
  updateSupplier(id: string, data: InsertSupplier): Promise<Supplier | undefined>;
  deleteSupplier(id: string): Promise<boolean>;

  getFactories(): Promise<Factory[]>;
  getFactory(id: string): Promise<Factory | undefined>;
  createFactory(data: InsertFactory): Promise<Factory>;
  updateFactory(id: string, data: InsertFactory): Promise<Factory | undefined>;
  deleteFactory(id: string): Promise<boolean>;

  getSizes(): Promise<Size[]>;
  getSize(id: string): Promise<Size | undefined>;
  createSize(data: InsertSize): Promise<Size>;
  updateSize(id: string, data: InsertSize): Promise<Size | undefined>;
  deleteSize(id: string): Promise<boolean>;

  getMappingTokens(): Promise<MappingToken[]>;
  getMappingToken(id: string): Promise<MappingToken | undefined>;
  createMappingToken(data: InsertMappingToken): Promise<MappingToken>;
  updateMappingToken(id: string, data: InsertMappingToken): Promise<MappingToken | undefined>;
  deleteMappingToken(id: string): Promise<boolean>;

  getProducts(): Promise<ProductWithDetails[]>;
  getProduct(id: string): Promise<ProductWithDetails | undefined>;
  createProduct(data: InsertProduct): Promise<Product>;
  updateProduct(id: string, data: InsertProduct): Promise<Product | undefined>;
  deleteProduct(id: string): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  private async createWithNumericCode<T>(
    table: any,
    data: any
  ): Promise<T> {
    return await db.transaction(async (tx) => {
      const maxResult = await tx.select({ value: max(table.numericCode) }).from(table);
      const maxCode = maxResult[0]?.value || 0;
      const nextCode = maxCode + 1;
      
      if (nextCode > 1000) {
        throw new Error(`Cannot create more than 1000 items for this master data type. Current max: ${maxCode}`);
      }
      
      const result = await tx.insert(table).values({
        ...data,
        numericCode: nextCode,
      }).returning();
      
      return result[0] as T;
    });
  }

  async getSeasons(): Promise<Season[]> {
    const result = await db.select().from(seasons);
    return result || [];
  }

  async getSeason(id: string): Promise<Season | undefined> {
    const result = await db.select().from(seasons).where(eq(seasons.id, id));
    return result[0];
  }

  async createSeason(data: InsertSeason): Promise<Season> {
    return await this.createWithNumericCode<Season>(seasons, data);
  }

  async updateSeason(id: string, data: InsertSeason): Promise<Season | undefined> {
    const existing = await this.getSeason(id);
    if (!existing) return undefined;
    
    const result = await db.update(seasons)
      .set({ ...data, numericCode: existing.numericCode })
      .where(eq(seasons.id, id))
      .returning();
    
    return result[0];
  }

  async deleteSeason(id: string): Promise<boolean> {
    const result = await db.delete(seasons).where(eq(seasons.id, id)).returning();
    return result.length > 0;
  }

  async getCategories(): Promise<Category[]> {
    const result = await db.select().from(categories);
    return result || [];
  }

  async getCategory(id: string): Promise<Category | undefined> {
    const result = await db.select().from(categories).where(eq(categories.id, id));
    return result[0];
  }

  async createCategory(data: InsertCategory): Promise<Category> {
    return await this.createWithNumericCode<Category>(categories, data);
  }

  async updateCategory(id: string, data: InsertCategory): Promise<Category | undefined> {
    const existing = await this.getCategory(id);
    if (!existing) return undefined;
    
    const result = await db.update(categories)
      .set({ ...data, numericCode: existing.numericCode })
      .where(eq(categories.id, id))
      .returning();
    
    return result[0];
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await db.delete(categories).where(eq(categories.id, id)).returning();
    return result.length > 0;
  }

  async getTypes(): Promise<Type[]> {
    const result = await db.select().from(types);
    return result || [];
  }

  async getType(id: string): Promise<Type | undefined> {
    const result = await db.select().from(types).where(eq(types.id, id));
    return result[0];
  }

  async createType(data: InsertType): Promise<Type> {
    return await this.createWithNumericCode<Type>(types, data);
  }

  async updateType(id: string, data: InsertType): Promise<Type | undefined> {
    const existing = await this.getType(id);
    if (!existing) return undefined;
    
    const result = await db.update(types)
      .set({ ...data, numericCode: existing.numericCode })
      .where(eq(types.id, id))
      .returning();
    
    return result[0];
  }

  async deleteType(id: string): Promise<boolean> {
    const result = await db.delete(types).where(eq(types.id, id)).returning();
    return result.length > 0;
  }

  async getFabrics(): Promise<Fabric[]> {
    const result = await db.select().from(fabrics);
    return result || [];
  }

  async getFabric(id: string): Promise<Fabric | undefined> {
    const result = await db.select().from(fabrics).where(eq(fabrics.id, id));
    return result[0];
  }

  async createFabric(data: InsertFabric): Promise<Fabric> {
    return await this.createWithNumericCode<Fabric>(fabrics, data);
  }

  async updateFabric(id: string, data: InsertFabric): Promise<Fabric | undefined> {
    const existing = await this.getFabric(id);
    if (!existing) return undefined;
    
    const result = await db.update(fabrics)
      .set({ ...data, numericCode: existing.numericCode })
      .where(eq(fabrics.id, id))
      .returning();
    
    return result[0];
  }

  async deleteFabric(id: string): Promise<boolean> {
    const result = await db.delete(fabrics).where(eq(fabrics.id, id)).returning();
    return result.length > 0;
  }

  async getColors(): Promise<Color[]> {
    const result = await db.select().from(colors);
    return result || [];
  }

  async getColor(id: string): Promise<Color | undefined> {
    const result = await db.select().from(colors).where(eq(colors.id, id));
    return result[0];
  }

  async createColor(data: InsertColor): Promise<Color> {
    return await this.createWithNumericCode<Color>(colors, data);
  }

  async updateColor(id: string, data: InsertColor): Promise<Color | undefined> {
    const existing = await this.getColor(id);
    if (!existing) return undefined;
    
    const result = await db.update(colors)
      .set({ ...data, numericCode: existing.numericCode })
      .where(eq(colors.id, id))
      .returning();
    
    return result[0];
  }

  async deleteColor(id: string): Promise<boolean> {
    const result = await db.delete(colors).where(eq(colors.id, id)).returning();
    return result.length > 0;
  }

  async getStyles(): Promise<Style[]> {
    const result = await db.select().from(styles);
    return result || [];
  }

  async getStyle(id: string): Promise<Style | undefined> {
    const result = await db.select().from(styles).where(eq(styles.id, id));
    return result[0];
  }

  async createStyle(data: InsertStyle): Promise<Style> {
    return await this.createWithNumericCode<Style>(styles, data);
  }

  async updateStyle(id: string, data: InsertStyle): Promise<Style | undefined> {
    const existing = await this.getStyle(id);
    if (!existing) return undefined;
    
    const result = await db.update(styles)
      .set({ ...data, numericCode: existing.numericCode })
      .where(eq(styles.id, id))
      .returning();
    
    return result[0];
  }

  async deleteStyle(id: string): Promise<boolean> {
    const result = await db.delete(styles).where(eq(styles.id, id)).returning();
    return result.length > 0;
  }

  async getPrintTypes(): Promise<PrintType[]> {
    const result = await db.select().from(printTypes);
    return result || [];
  }

  async getPrintType(id: string): Promise<PrintType | undefined> {
    const result = await db.select().from(printTypes).where(eq(printTypes.id, id));
    return result[0];
  }

  async createPrintType(data: InsertPrintType): Promise<PrintType> {
    return await this.createWithNumericCode<PrintType>(printTypes, data);
  }

  async updatePrintType(id: string, data: InsertPrintType): Promise<PrintType | undefined> {
    const existing = await this.getPrintType(id);
    if (!existing) return undefined;
    
    const result = await db.update(printTypes)
      .set({ ...data, numericCode: existing.numericCode })
      .where(eq(printTypes.id, id))
      .returning();
    
    return result[0];
  }

  async deletePrintType(id: string): Promise<boolean> {
    const result = await db.delete(printTypes).where(eq(printTypes.id, id)).returning();
    return result.length > 0;
  }

  async getPlacements(): Promise<Placement[]> {
    const result = await db.select().from(placements);
    return result || [];
  }

  async getPlacement(id: string): Promise<Placement | undefined> {
    const result = await db.select().from(placements).where(eq(placements.id, id));
    return result[0];
  }

  async createPlacement(data: InsertPlacement): Promise<Placement> {
    return await this.createWithNumericCode<Placement>(placements, data);
  }

  async updatePlacement(id: string, data: InsertPlacement): Promise<Placement | undefined> {
    const existing = await this.getPlacement(id);
    if (!existing) return undefined;
    
    const result = await db.update(placements)
      .set({ ...data, numericCode: existing.numericCode })
      .where(eq(placements.id, id))
      .returning();
    
    return result[0];
  }

  async deletePlacement(id: string): Promise<boolean> {
    const result = await db.delete(placements).where(eq(placements.id, id)).returning();
    return result.length > 0;
  }

  async getSuppliers(): Promise<Supplier[]> {
    const result = await db.select().from(suppliers);
    return result || [];
  }

  async getSupplier(id: string): Promise<Supplier | undefined> {
    const result = await db.select().from(suppliers).where(eq(suppliers.id, id));
    return result[0];
  }

  async createSupplier(data: InsertSupplier): Promise<Supplier> {
    return await this.createWithNumericCode<Supplier>(suppliers, data);
  }

  async updateSupplier(id: string, data: InsertSupplier): Promise<Supplier | undefined> {
    const existing = await this.getSupplier(id);
    if (!existing) return undefined;
    
    const result = await db.update(suppliers)
      .set({ ...data, numericCode: existing.numericCode })
      .where(eq(suppliers.id, id))
      .returning();
    
    return result[0];
  }

  async deleteSupplier(id: string): Promise<boolean> {
    const result = await db.delete(suppliers).where(eq(suppliers.id, id)).returning();
    return result.length > 0;
  }

  async getFactories(): Promise<Factory[]> {
    const result = await db.select().from(factories);
    return result || [];
  }

  async getFactory(id: string): Promise<Factory | undefined> {
    const result = await db.select().from(factories).where(eq(factories.id, id));
    return result[0];
  }

  async createFactory(data: InsertFactory): Promise<Factory> {
    return await this.createWithNumericCode<Factory>(factories, data);
  }

  async updateFactory(id: string, data: InsertFactory): Promise<Factory | undefined> {
    const existing = await this.getFactory(id);
    if (!existing) return undefined;
    
    const result = await db.update(factories)
      .set({ ...data, numericCode: existing.numericCode })
      .where(eq(factories.id, id))
      .returning();
    
    return result[0];
  }

  async deleteFactory(id: string): Promise<boolean> {
    const result = await db.delete(factories).where(eq(factories.id, id)).returning();
    return result.length > 0;
  }

  async getSizes(): Promise<Size[]> {
    const result = await db.select().from(sizes);
    return result || [];
  }

  async getSize(id: string): Promise<Size | undefined> {
    const result = await db.select().from(sizes).where(eq(sizes.id, id));
    return result[0];
  }

  async createSize(data: InsertSize): Promise<Size> {
    return await this.createWithNumericCode<Size>(sizes, data);
  }

  async updateSize(id: string, data: InsertSize): Promise<Size | undefined> {
    const existing = await this.getSize(id);
    if (!existing) return undefined;
    
    const result = await db.update(sizes)
      .set({ ...data, numericCode: existing.numericCode })
      .where(eq(sizes.id, id))
      .returning();
    
    return result[0];
  }

  async deleteSize(id: string): Promise<boolean> {
    const result = await db.delete(sizes).where(eq(sizes.id, id)).returning();
    return result.length > 0;
  }

  async getMappingTokens(): Promise<MappingToken[]> {
    const result = await db.select().from(mappingTokens);
    return result || [];
  }

  async getMappingToken(id: string): Promise<MappingToken | undefined> {
    const result = await db.select().from(mappingTokens).where(eq(mappingTokens.id, id));
    return result[0];
  }

  async createMappingToken(data: InsertMappingToken): Promise<MappingToken> {
    const result = await db.insert(mappingTokens).values(data).returning();
    return result[0];
  }

  async updateMappingToken(id: string, data: InsertMappingToken): Promise<MappingToken | undefined> {
    const existing = await this.getMappingToken(id);
    if (!existing) return undefined;
    
    const result = await db.update(mappingTokens)
      .set(data)
      .where(eq(mappingTokens.id, id))
      .returning();
    
    return result[0];
  }

  async deleteMappingToken(id: string): Promise<boolean> {
    const result = await db.delete(mappingTokens).where(eq(mappingTokens.id, id)).returning();
    return result.length > 0;
  }

  async getProducts(): Promise<ProductWithDetails[]> {
    const allProducts = await db.select().from(products) || [];
    
    const productsWithDetails: ProductWithDetails[] = await Promise.all(
      allProducts.map(async (product) => {
        const [
          season,
          category,
          type,
          fabric,
          color,
          style,
          printType,
          placement,
          supplier,
          factory,
          size,
        ] = await Promise.all([
          this.getSeason(product.seasonId),
          this.getCategory(product.categoryId),
          this.getType(product.typeId),
          this.getFabric(product.fabricId),
          this.getColor(product.colorId),
          this.getStyle(product.styleId),
          this.getPrintType(product.printTypeId),
          this.getPlacement(product.placementId),
          this.getSupplier(product.supplierId),
          this.getFactory(product.factoryId),
          this.getSize(product.sizeId),
        ]);

        return {
          ...product,
          season,
          category,
          type,
          fabric,
          color,
          style,
          printType,
          placement,
          supplier,
          factory,
          size,
        };
      })
    );

    return productsWithDetails;
  }

  async getProduct(id: string): Promise<ProductWithDetails | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id));
    const product = result[0];
    
    if (!product) return undefined;

    const [
      season,
      category,
      type,
      fabric,
      color,
      style,
      printType,
      placement,
      supplier,
      factory,
      size,
    ] = await Promise.all([
      this.getSeason(product.seasonId),
      this.getCategory(product.categoryId),
      this.getType(product.typeId),
      this.getFabric(product.fabricId),
      this.getColor(product.colorId),
      this.getStyle(product.styleId),
      this.getPrintType(product.printTypeId),
      this.getPlacement(product.placementId),
      this.getSupplier(product.supplierId),
      this.getFactory(product.factoryId),
      this.getSize(product.sizeId),
    ]);

    return {
      ...product,
      season,
      category,
      type,
      fabric,
      color,
      style,
      printType,
      placement,
      supplier,
      factory,
      size,
    };
  }

  async createProduct(data: InsertProduct): Promise<Product> {
    const [
      season,
      category,
      type,
      fabric,
      color,
      style,
      printType,
      placement,
      supplier,
      factory,
      size,
    ] = await Promise.all([
      this.getSeason(data.seasonId),
      this.getCategory(data.categoryId),
      this.getType(data.typeId),
      this.getFabric(data.fabricId),
      this.getColor(data.colorId),
      this.getStyle(data.styleId),
      this.getPrintType(data.printTypeId),
      this.getPlacement(data.placementId),
      this.getSupplier(data.supplierId),
      this.getFactory(data.factoryId),
      this.getSize(data.sizeId),
    ]);

    if (!season || !category || !type || !fabric || !color || !style || 
        !printType || !placement || !supplier || !factory || !size) {
      throw new Error("One or more related master data not found");
    }

    const masterDesignCode = [
      season.code,
      category.code,
      type.code,
      data.designNo,
      fabric.code,
      color.code,
    ].join("-");

    const skuCode = [
      season.code,
      category.code,
      type.code,
      data.designNo,
      fabric.code,
      color.code,
      style.code,
      printType.code,
      placement.code,
      supplier.code,
      factory.code,
      size.code,
    ].join("-");

    const designNoNumeric = parseInt(data.designNo) || 0;

    const numericCodes = [
      season.numericCode,
      category.numericCode,
      type.numericCode,
      designNoNumeric,
      fabric.numericCode,
      color.numericCode,
      style.numericCode,
      printType.numericCode,
      placement.numericCode,
      supplier.numericCode,
      factory.numericCode,
      size.numericCode,
    ];

    const skuCodedSegmented = numericCodes.join("-");
    const skuCodedCompact = numericCodes.map(n => n.toString().padStart(3, "0")).join("");

    const result = await db.insert(products).values({
      ...data,
      masterDesignCode,
      skuCode,
      skuCodedSegmented,
      skuCodedCompact,
    }).returning();

    return result[0];
  }

  async updateProduct(id: string, data: InsertProduct): Promise<Product | undefined> {
    const existing = await this.getProduct(id);
    if (!existing) return undefined;

    const [
      season,
      category,
      type,
      fabric,
      color,
      style,
      printType,
      placement,
      supplier,
      factory,
      size,
    ] = await Promise.all([
      this.getSeason(data.seasonId),
      this.getCategory(data.categoryId),
      this.getType(data.typeId),
      this.getFabric(data.fabricId),
      this.getColor(data.colorId),
      this.getStyle(data.styleId),
      this.getPrintType(data.printTypeId),
      this.getPlacement(data.placementId),
      this.getSupplier(data.supplierId),
      this.getFactory(data.factoryId),
      this.getSize(data.sizeId),
    ]);

    if (!season || !category || !type || !fabric || !color || !style || 
        !printType || !placement || !supplier || !factory || !size) {
      throw new Error("One or more related master data not found");
    }

    const masterDesignCode = [
      season.code,
      category.code,
      type.code,
      data.designNo,
      fabric.code,
      color.code,
    ].join("-");

    const skuCode = [
      season.code,
      category.code,
      type.code,
      data.designNo,
      fabric.code,
      color.code,
      style.code,
      printType.code,
      placement.code,
      supplier.code,
      factory.code,
      size.code,
    ].join("-");

    const designNoNumeric = parseInt(data.designNo) || 0;

    const numericCodes = [
      season.numericCode,
      category.numericCode,
      type.numericCode,
      designNoNumeric,
      fabric.numericCode,
      color.numericCode,
      style.numericCode,
      printType.numericCode,
      placement.numericCode,
      supplier.numericCode,
      factory.numericCode,
      size.numericCode,
    ];

    const skuCodedSegmented = numericCodes.join("-");
    const skuCodedCompact = numericCodes.map(n => n.toString().padStart(3, "0")).join("");

    const result = await db.update(products)
      .set({
        ...data,
        masterDesignCode,
        skuCode,
        skuCodedSegmented,
        skuCodedCompact,
      })
      .where(eq(products.id, id))
      .returning();

    return result[0];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
