import { randomUUID } from "crypto";
import type {
  Season, InsertSeason,
  Category, InsertCategory,
  Type, InsertType,
  Fabric, InsertFabric,
  Color, InsertColor,
  Style, InsertStyle,
  PrintType, InsertPrintType,
  Placement, InsertPlacement,
  Supplier, InsertSupplier,
  Factory, InsertFactory,
  Size, InsertSize,
  MappingToken, InsertMappingToken,
  Product, InsertProduct, ProductWithDetails
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private seasons: Map<string, Season> = new Map();
  private categories: Map<string, Category> = new Map();
  private types: Map<string, Type> = new Map();
  private fabrics: Map<string, Fabric> = new Map();
  private colors: Map<string, Color> = new Map();
  private styles: Map<string, Style> = new Map();
  private printTypes: Map<string, PrintType> = new Map();
  private placements: Map<string, Placement> = new Map();
  private suppliers: Map<string, Supplier> = new Map();
  private factories: Map<string, Factory> = new Map();
  private sizes: Map<string, Size> = new Map();
  private mappingTokens: Map<string, MappingToken> = new Map();
  private products: Map<string, Product> = new Map();

  constructor() {}

  async getSeasons(): Promise<Season[]> {
    return Array.from(this.seasons.values());
  }

  async getSeason(id: string): Promise<Season | undefined> {
    return this.seasons.get(id);
  }

  async createSeason(data: InsertSeason): Promise<Season> {
    const id = randomUUID();
    const season: Season = { id, ...data };
    this.seasons.set(id, season);
    return season;
  }

  async updateSeason(id: string, data: InsertSeason): Promise<Season | undefined> {
    if (!this.seasons.has(id)) return undefined;
    const season: Season = { id, ...data };
    this.seasons.set(id, season);
    return season;
  }

  async deleteSeason(id: string): Promise<boolean> {
    return this.seasons.delete(id);
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategory(id: string): Promise<Category | undefined> {
    return this.categories.get(id);
  }

  async createCategory(data: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const category: Category = { id, ...data };
    this.categories.set(id, category);
    return category;
  }

  async updateCategory(id: string, data: InsertCategory): Promise<Category | undefined> {
    if (!this.categories.has(id)) return undefined;
    const category: Category = { id, ...data };
    this.categories.set(id, category);
    return category;
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.categories.delete(id);
  }

  async getTypes(): Promise<Type[]> {
    return Array.from(this.types.values());
  }

  async getType(id: string): Promise<Type | undefined> {
    return this.types.get(id);
  }

  async createType(data: InsertType): Promise<Type> {
    const id = randomUUID();
    const type: Type = { id, ...data };
    this.types.set(id, type);
    return type;
  }

  async updateType(id: string, data: InsertType): Promise<Type | undefined> {
    if (!this.types.has(id)) return undefined;
    const type: Type = { id, ...data };
    this.types.set(id, type);
    return type;
  }

  async deleteType(id: string): Promise<boolean> {
    return this.types.delete(id);
  }

  async getFabrics(): Promise<Fabric[]> {
    return Array.from(this.fabrics.values());
  }

  async getFabric(id: string): Promise<Fabric | undefined> {
    return this.fabrics.get(id);
  }

  async createFabric(data: InsertFabric): Promise<Fabric> {
    const id = randomUUID();
    const fabric: Fabric = { id, ...data };
    this.fabrics.set(id, fabric);
    return fabric;
  }

  async updateFabric(id: string, data: InsertFabric): Promise<Fabric | undefined> {
    if (!this.fabrics.has(id)) return undefined;
    const fabric: Fabric = { id, ...data };
    this.fabrics.set(id, fabric);
    return fabric;
  }

  async deleteFabric(id: string): Promise<boolean> {
    return this.fabrics.delete(id);
  }

  async getColors(): Promise<Color[]> {
    return Array.from(this.colors.values());
  }

  async getColor(id: string): Promise<Color | undefined> {
    return this.colors.get(id);
  }

  async createColor(data: InsertColor): Promise<Color> {
    const id = randomUUID();
    const color: Color = { id, ...data };
    this.colors.set(id, color);
    return color;
  }

  async updateColor(id: string, data: InsertColor): Promise<Color | undefined> {
    if (!this.colors.has(id)) return undefined;
    const color: Color = { id, ...data };
    this.colors.set(id, color);
    return color;
  }

  async deleteColor(id: string): Promise<boolean> {
    return this.colors.delete(id);
  }

  async getStyles(): Promise<Style[]> {
    return Array.from(this.styles.values());
  }

  async getStyle(id: string): Promise<Style | undefined> {
    return this.styles.get(id);
  }

  async createStyle(data: InsertStyle): Promise<Style> {
    const id = randomUUID();
    const style: Style = { id, ...data };
    this.styles.set(id, style);
    return style;
  }

  async updateStyle(id: string, data: InsertStyle): Promise<Style | undefined> {
    if (!this.styles.has(id)) return undefined;
    const style: Style = { id, ...data };
    this.styles.set(id, style);
    return style;
  }

  async deleteStyle(id: string): Promise<boolean> {
    return this.styles.delete(id);
  }

  async getPrintTypes(): Promise<PrintType[]> {
    return Array.from(this.printTypes.values());
  }

  async getPrintType(id: string): Promise<PrintType | undefined> {
    return this.printTypes.get(id);
  }

  async createPrintType(data: InsertPrintType): Promise<PrintType> {
    const id = randomUUID();
    const printType: PrintType = { id, ...data };
    this.printTypes.set(id, printType);
    return printType;
  }

  async updatePrintType(id: string, data: InsertPrintType): Promise<PrintType | undefined> {
    if (!this.printTypes.has(id)) return undefined;
    const printType: PrintType = { id, ...data };
    this.printTypes.set(id, printType);
    return printType;
  }

  async deletePrintType(id: string): Promise<boolean> {
    return this.printTypes.delete(id);
  }

  async getPlacements(): Promise<Placement[]> {
    return Array.from(this.placements.values());
  }

  async getPlacement(id: string): Promise<Placement | undefined> {
    return this.placements.get(id);
  }

  async createPlacement(data: InsertPlacement): Promise<Placement> {
    const id = randomUUID();
    const placement: Placement = { id, ...data };
    this.placements.set(id, placement);
    return placement;
  }

  async updatePlacement(id: string, data: InsertPlacement): Promise<Placement | undefined> {
    if (!this.placements.has(id)) return undefined;
    const placement: Placement = { id, ...data };
    this.placements.set(id, placement);
    return placement;
  }

  async deletePlacement(id: string): Promise<boolean> {
    return this.placements.delete(id);
  }

  async getSuppliers(): Promise<Supplier[]> {
    return Array.from(this.suppliers.values());
  }

  async getSupplier(id: string): Promise<Supplier | undefined> {
    return this.suppliers.get(id);
  }

  async createSupplier(data: InsertSupplier): Promise<Supplier> {
    const id = randomUUID();
    const supplier: Supplier = { id, ...data };
    this.suppliers.set(id, supplier);
    return supplier;
  }

  async updateSupplier(id: string, data: InsertSupplier): Promise<Supplier | undefined> {
    if (!this.suppliers.has(id)) return undefined;
    const supplier: Supplier = { id, ...data };
    this.suppliers.set(id, supplier);
    return supplier;
  }

  async deleteSupplier(id: string): Promise<boolean> {
    return this.suppliers.delete(id);
  }

  async getFactories(): Promise<Factory[]> {
    return Array.from(this.factories.values());
  }

  async getFactory(id: string): Promise<Factory | undefined> {
    return this.factories.get(id);
  }

  async createFactory(data: InsertFactory): Promise<Factory> {
    const id = randomUUID();
    const factory: Factory = { id, ...data };
    this.factories.set(id, factory);
    return factory;
  }

  async updateFactory(id: string, data: InsertFactory): Promise<Factory | undefined> {
    if (!this.factories.has(id)) return undefined;
    const factory: Factory = { id, ...data };
    this.factories.set(id, factory);
    return factory;
  }

  async deleteFactory(id: string): Promise<boolean> {
    return this.factories.delete(id);
  }

  async getSizes(): Promise<Size[]> {
    return Array.from(this.sizes.values());
  }

  async getSize(id: string): Promise<Size | undefined> {
    return this.sizes.get(id);
  }

  async createSize(data: InsertSize): Promise<Size> {
    const id = randomUUID();
    const size: Size = { id, ...data };
    this.sizes.set(id, size);
    return size;
  }

  async updateSize(id: string, data: InsertSize): Promise<Size | undefined> {
    if (!this.sizes.has(id)) return undefined;
    const size: Size = { id, ...data };
    this.sizes.set(id, size);
    return size;
  }

  async deleteSize(id: string): Promise<boolean> {
    return this.sizes.delete(id);
  }

  async getMappingTokens(): Promise<MappingToken[]> {
    return Array.from(this.mappingTokens.values());
  }

  async getMappingToken(id: string): Promise<MappingToken | undefined> {
    return this.mappingTokens.get(id);
  }

  async createMappingToken(data: InsertMappingToken): Promise<MappingToken> {
    const id = randomUUID();
    const token: MappingToken = { id, ...data };
    this.mappingTokens.set(id, token);
    return token;
  }

  async updateMappingToken(id: string, data: InsertMappingToken): Promise<MappingToken | undefined> {
    if (!this.mappingTokens.has(id)) return undefined;
    const token: MappingToken = { id, ...data };
    this.mappingTokens.set(id, token);
    return token;
  }

  async deleteMappingToken(id: string): Promise<boolean> {
    return this.mappingTokens.delete(id);
  }

  async getProducts(): Promise<ProductWithDetails[]> {
    const products = Array.from(this.products.values());
    
    return products.map(product => ({
      ...product,
      season: this.seasons.get(product.seasonId),
      category: this.categories.get(product.categoryId),
      type: this.types.get(product.typeId),
      fabric: this.fabrics.get(product.fabricId),
      color: this.colors.get(product.colorId),
      style: this.styles.get(product.styleId),
      printType: this.printTypes.get(product.printTypeId),
      placement: this.placements.get(product.placementId),
      supplier: this.suppliers.get(product.supplierId),
      factory: this.factories.get(product.factoryId),
      size: this.sizes.get(product.sizeId),
    }));
  }

  async getProduct(id: string): Promise<ProductWithDetails | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    return {
      ...product,
      season: this.seasons.get(product.seasonId),
      category: this.categories.get(product.categoryId),
      type: this.types.get(product.typeId),
      fabric: this.fabrics.get(product.fabricId),
      color: this.colors.get(product.colorId),
      style: this.styles.get(product.styleId),
      printType: this.printTypes.get(product.printTypeId),
      placement: this.placements.get(product.placementId),
      supplier: this.suppliers.get(product.supplierId),
      factory: this.factories.get(product.factoryId),
      size: this.sizes.get(product.sizeId),
    };
  }

  async createProduct(data: InsertProduct): Promise<Product> {
    const id = randomUUID();
    
    const season = this.seasons.get(data.seasonId);
    const category = this.categories.get(data.categoryId);
    const type = this.types.get(data.typeId);
    const fabric = this.fabrics.get(data.fabricId);
    const color = this.colors.get(data.colorId);
    const style = this.styles.get(data.styleId);
    const printType = this.printTypes.get(data.printTypeId);
    const placement = this.placements.get(data.placementId);
    const supplier = this.suppliers.get(data.supplierId);
    const factory = this.factories.get(data.factoryId);
    const size = this.sizes.get(data.sizeId);

    const masterDesignCode = `${season?.code}-${category?.code}-${type?.code}-${data.designNo}`;
    
    const skuCode = [
      season?.code,
      category?.code,
      type?.code,
      data.designNo,
      fabric?.code,
      color?.code,
      style?.code,
      printType?.code,
      placement?.code,
      supplier?.code,
      factory?.code,
      size?.code,
    ].join("-");

    const tokens = [
      season?.code,
      category?.code,
      type?.code,
      data.designNo,
      fabric?.code,
      color?.code,
      style?.code,
      printType?.code,
      placement?.code,
      supplier?.code,
      factory?.code,
      size?.code,
    ];

    const numericCodes: number[] = [];
    for (const token of tokens) {
      if (!token) continue;
      const mapping = Array.from(this.mappingTokens.values()).find(m => m.token === token);
      if (mapping) {
        numericCodes.push(mapping.numericCode);
      }
    }

    const skuCodedSegmented = numericCodes.join("-");
    const skuCodedCompact = numericCodes.join("");

    const product: Product = {
      id,
      ...data,
      masterDesignCode,
      skuCode,
      skuCodedSegmented,
      skuCodedCompact,
    };

    this.products.set(id, product);
    return product;
  }

  async updateProduct(id: string, data: InsertProduct): Promise<Product | undefined> {
    if (!this.products.has(id)) return undefined;

    const season = this.seasons.get(data.seasonId);
    const category = this.categories.get(data.categoryId);
    const type = this.types.get(data.typeId);
    const fabric = this.fabrics.get(data.fabricId);
    const color = this.colors.get(data.colorId);
    const style = this.styles.get(data.styleId);
    const printType = this.printTypes.get(data.printTypeId);
    const placement = this.placements.get(data.placementId);
    const supplier = this.suppliers.get(data.supplierId);
    const factory = this.factories.get(data.factoryId);
    const size = this.sizes.get(data.sizeId);

    const masterDesignCode = `${season?.code}-${category?.code}-${type?.code}-${data.designNo}`;
    
    const skuCode = [
      season?.code,
      category?.code,
      type?.code,
      data.designNo,
      fabric?.code,
      color?.code,
      style?.code,
      printType?.code,
      placement?.code,
      supplier?.code,
      factory?.code,
      size?.code,
    ].join("-");

    const tokens = [
      season?.code,
      category?.code,
      type?.code,
      data.designNo,
      fabric?.code,
      color?.code,
      style?.code,
      printType?.code,
      placement?.code,
      supplier?.code,
      factory?.code,
      size?.code,
    ];

    const numericCodes: number[] = [];
    for (const token of tokens) {
      if (!token) continue;
      const mapping = Array.from(this.mappingTokens.values()).find(m => m.token === token);
      if (mapping) {
        numericCodes.push(mapping.numericCode);
      }
    }

    const skuCodedSegmented = numericCodes.join("-");
    const skuCodedCompact = numericCodes.join("");

    const product: Product = {
      id,
      ...data,
      masterDesignCode,
      skuCode,
      skuCodedSegmented,
      skuCodedCompact,
    };

    this.products.set(id, product);
    return product;
  }

  async deleteProduct(id: string): Promise<boolean> {
    return this.products.delete(id);
  }
}

export const storage = new MemStorage();
