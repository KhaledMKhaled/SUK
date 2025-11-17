import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateCSV } from "./csv-utils";
import {
  insertSeasonSchema,
  insertCategorySchema,
  insertTypeSchema,
  insertFabricSchema,
  insertColorSchema,
  insertStyleSchema,
  insertPrintTypeSchema,
  insertPlacementSchema,
  insertSupplierSchema,
  insertFactorySchema,
  insertSizeSchema,
  insertMappingTokenSchema,
  insertProductSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Seasons endpoints
  app.get("/api/seasons", async (req, res) => {
    const seasons = await storage.getSeasons();
    res.json(seasons);
  });

  app.get("/api/seasons/:id", async (req, res) => {
    const season = await storage.getSeason(req.params.id);
    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }
    res.json(season);
  });

  app.post("/api/seasons", async (req, res) => {
    try {
      const data = insertSeasonSchema.parse(req.body);
      const season = await storage.createSeason(data);
      res.status(201).json(season);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/seasons/:id", async (req, res) => {
    try {
      const data = insertSeasonSchema.parse(req.body);
      const season = await storage.updateSeason(req.params.id, data);
      if (!season) {
        return res.status(404).json({ message: "Season not found" });
      }
      res.json(season);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/seasons/:id", async (req, res) => {
    const deleted = await storage.deleteSeason(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Season not found" });
    }
    res.status(204).send();
  });

  // Categories endpoints
  app.get("/api/categories", async (req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get("/api/categories/:id", async (req, res) => {
    const category = await storage.getCategory(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.json(category);
  });

  app.post("/api/categories", async (req, res) => {
    try {
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(data);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/categories/:id", async (req, res) => {
    try {
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.updateCategory(req.params.id, data);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/categories/:id", async (req, res) => {
    const deleted = await storage.deleteCategory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(204).send();
  });

  // Types endpoints
  app.get("/api/types", async (req, res) => {
    const types = await storage.getTypes();
    res.json(types);
  });

  app.get("/api/types/:id", async (req, res) => {
    const type = await storage.getType(req.params.id);
    if (!type) {
      return res.status(404).json({ message: "Type not found" });
    }
    res.json(type);
  });

  app.post("/api/types", async (req, res) => {
    try {
      const data = insertTypeSchema.parse(req.body);
      const type = await storage.createType(data);
      res.status(201).json(type);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/types/:id", async (req, res) => {
    try {
      const data = insertTypeSchema.parse(req.body);
      const type = await storage.updateType(req.params.id, data);
      if (!type) {
        return res.status(404).json({ message: "Type not found" });
      }
      res.json(type);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/types/:id", async (req, res) => {
    const deleted = await storage.deleteType(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Type not found" });
    }
    res.status(204).send();
  });

  // Fabrics endpoints
  app.get("/api/fabrics", async (req, res) => {
    const fabrics = await storage.getFabrics();
    res.json(fabrics);
  });

  app.get("/api/fabrics/:id", async (req, res) => {
    const fabric = await storage.getFabric(req.params.id);
    if (!fabric) {
      return res.status(404).json({ message: "Fabric not found" });
    }
    res.json(fabric);
  });

  app.post("/api/fabrics", async (req, res) => {
    try {
      const data = insertFabricSchema.parse(req.body);
      const fabric = await storage.createFabric(data);
      res.status(201).json(fabric);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/fabrics/:id", async (req, res) => {
    try {
      const data = insertFabricSchema.parse(req.body);
      const fabric = await storage.updateFabric(req.params.id, data);
      if (!fabric) {
        return res.status(404).json({ message: "Fabric not found" });
      }
      res.json(fabric);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/fabrics/:id", async (req, res) => {
    const deleted = await storage.deleteFabric(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Fabric not found" });
    }
    res.status(204).send();
  });

  // Colors endpoints
  app.get("/api/colors", async (req, res) => {
    const colors = await storage.getColors();
    res.json(colors);
  });

  app.get("/api/colors/:id", async (req, res) => {
    const color = await storage.getColor(req.params.id);
    if (!color) {
      return res.status(404).json({ message: "Color not found" });
    }
    res.json(color);
  });

  app.post("/api/colors", async (req, res) => {
    try {
      const data = insertColorSchema.parse(req.body);
      const color = await storage.createColor(data);
      res.status(201).json(color);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/colors/:id", async (req, res) => {
    try {
      const data = insertColorSchema.parse(req.body);
      const color = await storage.updateColor(req.params.id, data);
      if (!color) {
        return res.status(404).json({ message: "Color not found" });
      }
      res.json(color);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/colors/:id", async (req, res) => {
    const deleted = await storage.deleteColor(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Color not found" });
    }
    res.status(204).send();
  });

  // Styles endpoints
  app.get("/api/styles", async (req, res) => {
    const styles = await storage.getStyles();
    res.json(styles);
  });

  app.get("/api/styles/:id", async (req, res) => {
    const style = await storage.getStyle(req.params.id);
    if (!style) {
      return res.status(404).json({ message: "Style not found" });
    }
    res.json(style);
  });

  app.post("/api/styles", async (req, res) => {
    try {
      const data = insertStyleSchema.parse(req.body);
      const style = await storage.createStyle(data);
      res.status(201).json(style);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/styles/:id", async (req, res) => {
    try {
      const data = insertStyleSchema.parse(req.body);
      const style = await storage.updateStyle(req.params.id, data);
      if (!style) {
        return res.status(404).json({ message: "Style not found" });
      }
      res.json(style);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/styles/:id", async (req, res) => {
    const deleted = await storage.deleteStyle(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Style not found" });
    }
    res.status(204).send();
  });

  // Print Types endpoints
  app.get("/api/print-types", async (req, res) => {
    const printTypes = await storage.getPrintTypes();
    res.json(printTypes);
  });

  app.get("/api/print-types/:id", async (req, res) => {
    const printType = await storage.getPrintType(req.params.id);
    if (!printType) {
      return res.status(404).json({ message: "Print type not found" });
    }
    res.json(printType);
  });

  app.post("/api/print-types", async (req, res) => {
    try {
      const data = insertPrintTypeSchema.parse(req.body);
      const printType = await storage.createPrintType(data);
      res.status(201).json(printType);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/print-types/:id", async (req, res) => {
    try {
      const data = insertPrintTypeSchema.parse(req.body);
      const printType = await storage.updatePrintType(req.params.id, data);
      if (!printType) {
        return res.status(404).json({ message: "Print type not found" });
      }
      res.json(printType);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/print-types/:id", async (req, res) => {
    const deleted = await storage.deletePrintType(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Print type not found" });
    }
    res.status(204).send();
  });

  // Placements endpoints
  app.get("/api/placements", async (req, res) => {
    const placements = await storage.getPlacements();
    res.json(placements);
  });

  app.get("/api/placements/:id", async (req, res) => {
    const placement = await storage.getPlacement(req.params.id);
    if (!placement) {
      return res.status(404).json({ message: "Placement not found" });
    }
    res.json(placement);
  });

  app.post("/api/placements", async (req, res) => {
    try {
      const data = insertPlacementSchema.parse(req.body);
      const placement = await storage.createPlacement(data);
      res.status(201).json(placement);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/placements/:id", async (req, res) => {
    try {
      const data = insertPlacementSchema.parse(req.body);
      const placement = await storage.updatePlacement(req.params.id, data);
      if (!placement) {
        return res.status(404).json({ message: "Placement not found" });
      }
      res.json(placement);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/placements/:id", async (req, res) => {
    const deleted = await storage.deletePlacement(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Placement not found" });
    }
    res.status(204).send();
  });

  // Suppliers endpoints
  app.get("/api/suppliers", async (req, res) => {
    const suppliers = await storage.getSuppliers();
    res.json(suppliers);
  });

  app.get("/api/suppliers/:id", async (req, res) => {
    const supplier = await storage.getSupplier(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.json(supplier);
  });

  app.post("/api/suppliers", async (req, res) => {
    try {
      const data = insertSupplierSchema.parse(req.body);
      const supplier = await storage.createSupplier(data);
      res.status(201).json(supplier);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/suppliers/:id", async (req, res) => {
    try {
      const data = insertSupplierSchema.parse(req.body);
      const supplier = await storage.updateSupplier(req.params.id, data);
      if (!supplier) {
        return res.status(404).json({ message: "Supplier not found" });
      }
      res.json(supplier);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/suppliers/:id", async (req, res) => {
    const deleted = await storage.deleteSupplier(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Supplier not found" });
    }
    res.status(204).send();
  });

  // Factories endpoints
  app.get("/api/factories", async (req, res) => {
    const factories = await storage.getFactories();
    res.json(factories);
  });

  app.get("/api/factories/:id", async (req, res) => {
    const factory = await storage.getFactory(req.params.id);
    if (!factory) {
      return res.status(404).json({ message: "Factory not found" });
    }
    res.json(factory);
  });

  app.post("/api/factories", async (req, res) => {
    try {
      const data = insertFactorySchema.parse(req.body);
      const factory = await storage.createFactory(data);
      res.status(201).json(factory);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/factories/:id", async (req, res) => {
    try {
      const data = insertFactorySchema.parse(req.body);
      const factory = await storage.updateFactory(req.params.id, data);
      if (!factory) {
        return res.status(404).json({ message: "Factory not found" });
      }
      res.json(factory);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/factories/:id", async (req, res) => {
    const deleted = await storage.deleteFactory(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Factory not found" });
    }
    res.status(204).send();
  });

  // Sizes endpoints
  app.get("/api/sizes", async (req, res) => {
    const sizes = await storage.getSizes();
    res.json(sizes);
  });

  app.get("/api/sizes/:id", async (req, res) => {
    const size = await storage.getSize(req.params.id);
    if (!size) {
      return res.status(404).json({ message: "Size not found" });
    }
    res.json(size);
  });

  app.post("/api/sizes", async (req, res) => {
    try {
      const data = insertSizeSchema.parse(req.body);
      const size = await storage.createSize(data);
      res.status(201).json(size);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/sizes/:id", async (req, res) => {
    try {
      const data = insertSizeSchema.parse(req.body);
      const size = await storage.updateSize(req.params.id, data);
      if (!size) {
        return res.status(404).json({ message: "Size not found" });
      }
      res.json(size);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/sizes/:id", async (req, res) => {
    const deleted = await storage.deleteSize(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Size not found" });
    }
    res.status(204).send();
  });

  // Mapping Tokens endpoints
  app.get("/api/mapping-tokens", async (req, res) => {
    const tokens = await storage.getMappingTokens();
    res.json(tokens);
  });

  app.get("/api/mapping-tokens/:id", async (req, res) => {
    const token = await storage.getMappingToken(req.params.id);
    if (!token) {
      return res.status(404).json({ message: "Mapping token not found" });
    }
    res.json(token);
  });

  app.post("/api/mapping-tokens", async (req, res) => {
    try {
      const data = insertMappingTokenSchema.parse(req.body);
      const token = await storage.createMappingToken(data);
      res.status(201).json(token);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/mapping-tokens/:id", async (req, res) => {
    try {
      const data = insertMappingTokenSchema.parse(req.body);
      const token = await storage.updateMappingToken(req.params.id, data);
      if (!token) {
        return res.status(404).json({ message: "Mapping token not found" });
      }
      res.json(token);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/mapping-tokens/:id", async (req, res) => {
    const deleted = await storage.deleteMappingToken(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Mapping token not found" });
    }
    res.status(204).send();
  });

  // Products endpoints
  app.get("/api/products", async (req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:id", async (req, res) => {
    const product = await storage.getProduct(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  app.post("/api/products", async (req, res) => {
    try {
      const data = insertProductSchema.parse(req.body);
      const product = await storage.createProduct(data);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.put("/api/products/:id", async (req, res) => {
    try {
      const data = insertProductSchema.parse(req.body);
      const product = await storage.updateProduct(req.params.id, data);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid data", error });
    }
  });

  app.delete("/api/products/:id", async (req, res) => {
    const deleted = await storage.deleteProduct(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  });

  // Bulk Export Endpoints
  app.get("/api/export/seasons", async (req, res) => {
    try {
      const seasons = await storage.getSeasons();
      const headers = ["id", "code", "nameAr", "nameEn", "numericCode"];
      const rows = seasons.map(s => [s.id, s.code, s.nameAr, s.nameEn, String(s.numericCode)]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=seasons.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  app.get("/api/export/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      const headers = ["id", "code", "nameAr", "nameEn", "numericCode"];
      const rows = categories.map(c => [c.id, c.code, c.nameAr, c.nameEn, String(c.numericCode)]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=categories.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  app.get("/api/export/types", async (req, res) => {
    try {
      const types = await storage.getTypes();
      const headers = ["id", "code", "nameAr", "nameEn", "categoryId", "numericCode"];
      const rows = types.map(t => [t.id, t.code, t.nameAr, t.nameEn, t.categoryId, String(t.numericCode)]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=types.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  app.get("/api/export/fabrics", async (req, res) => {
    try {
      const fabrics = await storage.getFabrics();
      const headers = ["id", "code", "nameAr", "nameEn", "numericCode"];
      const rows = fabrics.map(f => [f.id, f.code, f.nameAr, f.nameEn, String(f.numericCode)]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=fabrics.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  app.get("/api/export/colors", async (req, res) => {
    try {
      const colors = await storage.getColors();
      const headers = ["id", "code", "nameAr", "nameEn", "hexValue", "numericCode"];
      const rows = colors.map(c => [c.id, c.code, c.nameAr, c.nameEn, c.hexValue, String(c.numericCode)]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=colors.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  app.get("/api/export/styles", async (req, res) => {
    try {
      const styles = await storage.getStyles();
      const headers = ["id", "code", "nameAr", "nameEn", "numericCode"];
      const rows = styles.map(s => [s.id, s.code, s.nameAr, s.nameEn, String(s.numericCode)]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=styles.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  app.get("/api/export/print-types", async (req, res) => {
    try {
      const printTypes = await storage.getPrintTypes();
      const headers = ["id", "code", "nameAr", "nameEn", "numericCode"];
      const rows = printTypes.map(p => [p.id, p.code, p.nameAr, p.nameEn, String(p.numericCode)]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=print-types.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  app.get("/api/export/placements", async (req, res) => {
    try {
      const placements = await storage.getPlacements();
      const headers = ["id", "code", "nameAr", "nameEn", "numericCode"];
      const rows = placements.map(p => [p.id, p.code, p.nameAr, p.nameEn, String(p.numericCode)]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=placements.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  app.get("/api/export/suppliers", async (req, res) => {
    try {
      const suppliers = await storage.getSuppliers();
      const headers = ["id", "code", "nameAr", "nameEn", "numericCode"];
      const rows = suppliers.map(s => [s.id, s.code, s.nameAr, s.nameEn, String(s.numericCode)]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=suppliers.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  app.get("/api/export/factories", async (req, res) => {
    try {
      const factories = await storage.getFactories();
      const headers = ["id", "code", "nameAr", "nameEn", "numericCode"];
      const rows = factories.map(f => [f.id, f.code, f.nameAr, f.nameEn, String(f.numericCode)]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=factories.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  app.get("/api/export/sizes", async (req, res) => {
    try {
      const sizes = await storage.getSizes();
      const headers = ["id", "code", "nameAr", "nameEn", "numericCode"];
      const rows = sizes.map(s => [s.id, s.code, s.nameAr, s.nameEn, String(s.numericCode)]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=sizes.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  app.get("/api/export/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      const headers = ["id", "seasonCode", "categoryCode", "typeCode", "designNo", "fabricCode", "colorCode", 
                       "styleCode", "printTypeCode", "placementCode", "supplierCode", "factoryCode", "sizeCode",
                       "productNameAr", "productNameEn", "masterDesignCode", "skuCode", "skuCodedSegmented", 
                       "skuCodedCompact", "notes"];
      const rows = products.map(p => [
        p.id,
        p.season?.code,
        p.category?.code,
        p.type?.code,
        p.designNo,
        p.fabric?.code,
        p.color?.code,
        p.style?.code,
        p.printType?.code,
        p.placement?.code,
        p.supplier?.code,
        p.factory?.code,
        p.size?.code,
        p.productNameAr,
        p.productNameEn,
        p.masterDesignCode,
        p.skuCode,
        p.skuCodedSegmented,
        p.skuCodedCompact,
        p.notes
      ]);
      const csv = generateCSV(headers, rows);
      
      res.setHeader("Content-Type", "text/csv; charset=utf-8");
      res.setHeader("Content-Disposition", "attachment; filename=products.csv");
      res.send("\ufeff" + csv);
    } catch (error) {
      res.status(500).json({ message: "Export failed", error });
    }
  });

  // SKU Decode - Decode text or numeric SKU to attributes
  app.post("/api/sku/decode", async (req, res) => {
    try {
      const { sku, skuType } = req.body;
      
      if (!sku || !skuType) {
        return res.status(400).json({ message: "SKU and skuType are required" });
      }

      let decodedParts: string[] = [];
      
      if (skuType === "text") {
        decodedParts = sku.split("-");
      } else if (skuType === "segmented") {
        decodedParts = sku.split("-");
        const [seasons, categories, types, fabrics, colors, styles, printTypes, placements, suppliers, factories, sizes] = await Promise.all([
          storage.getSeasons(),
          storage.getCategories(),
          storage.getTypes(),
          storage.getFabrics(),
          storage.getColors(),
          storage.getStyles(),
          storage.getPrintTypes(),
          storage.getPlacements(),
          storage.getSuppliers(),
          storage.getFactories(),
          storage.getSizes(),
        ]);

        const numericParts = decodedParts.map(p => parseInt(p));
        const textParts = [
          seasons.find(s => s.numericCode === numericParts[0])?.code || "",
          categories.find(c => c.numericCode === numericParts[1])?.code || "",
          types.find(t => t.numericCode === numericParts[2])?.code || "",
          numericParts[3].toString(),
          fabrics.find(f => f.numericCode === numericParts[4])?.code || "",
          colors.find(c => c.numericCode === numericParts[5])?.code || "",
          styles.find(s => s.numericCode === numericParts[6])?.code || "",
          printTypes.find(p => p.numericCode === numericParts[7])?.code || "",
          placements.find(p => p.numericCode === numericParts[8])?.code || "",
          suppliers.find(s => s.numericCode === numericParts[9])?.code || "",
          factories.find(f => f.numericCode === numericParts[10])?.code || "",
          sizes.find(s => s.numericCode === numericParts[11])?.code || "",
        ];
        decodedParts = textParts;
      }

      if (decodedParts.length < 12) {
        return res.status(400).json({ message: "Invalid SKU format" });
      }

      const [seasonCode, categoryCode, typeCode, designNo, fabricCode, colorCode, 
             styleCode, printTypeCode, placementCode, supplierCode, factoryCode, sizeCode] = decodedParts;

      const [season, category, type, fabric, color, style, printType, placement, supplier, factory, size] = await Promise.all([
        (await storage.getSeasons()).find(s => s.code === seasonCode),
        (await storage.getCategories()).find(c => c.code === categoryCode),
        (await storage.getTypes()).find(t => t.code === typeCode),
        (await storage.getFabrics()).find(f => f.code === fabricCode),
        (await storage.getColors()).find(c => c.code === colorCode),
        (await storage.getStyles()).find(s => s.code === styleCode),
        (await storage.getPrintTypes()).find(p => p.code === printTypeCode),
        (await storage.getPlacements()).find(p => p.code === placementCode),
        (await storage.getSuppliers()).find(s => s.code === supplierCode),
        (await storage.getFactories()).find(f => f.code === factoryCode),
        (await storage.getSizes()).find(s => s.code === sizeCode),
      ]);

      const masterDesignCode = [seasonCode, categoryCode, typeCode, designNo, fabricCode, colorCode].join("-");
      const skuCode = decodedParts.join("-");

      const numericCodes = [
        season?.numericCode || 0,
        category?.numericCode || 0,
        type?.numericCode || 0,
        parseInt(designNo) || 0,
        fabric?.numericCode || 0,
        color?.numericCode || 0,
        style?.numericCode || 0,
        printType?.numericCode || 0,
        placement?.numericCode || 0,
        supplier?.numericCode || 0,
        factory?.numericCode || 0,
        size?.numericCode || 0,
      ];

      const skuCodedSegmented = numericCodes.join("-");
      const skuCodedCompact = numericCodes.map(n => n.toString().padStart(3, "0")).join("");

      const decoded = {
        seasonCode,
        seasonNameAr: season?.nameAr || "",
        seasonNameEn: season?.nameEn || "",
        categoryCode,
        categoryNameAr: category?.nameAr || "",
        categoryNameEn: category?.nameEn || "",
        typeCode,
        typeNameAr: type?.nameAr || "",
        typeNameEn: type?.nameEn || "",
        designNo,
        fabricCode,
        fabricNameAr: fabric?.nameAr || "",
        fabricNameEn: fabric?.nameEn || "",
        colorCode,
        colorNameAr: color?.nameAr || "",
        colorNameEn: color?.nameEn || "",
        colorHex: color?.hexValue || "",
        styleCode,
        styleNameAr: style?.nameAr || "",
        styleNameEn: style?.nameEn || "",
        printTypeCode,
        printTypeNameAr: printType?.nameAr || "",
        printTypeNameEn: printType?.nameEn || "",
        placementCode,
        placementNameAr: placement?.nameAr || "",
        placementNameEn: placement?.nameEn || "",
        supplierCode,
        supplierNameAr: supplier?.nameAr || "",
        supplierNameEn: supplier?.nameEn || "",
        factoryCode,
        factoryNameAr: factory?.nameAr || "",
        factoryNameEn: factory?.nameEn || "",
        sizeCode,
        sizeNameAr: size?.nameAr || "",
        sizeNameEn: size?.nameEn || "",
        masterDesignCode,
        skuCode,
        skuCodedSegmented,
        skuCodedCompact,
      };

      res.json(decoded);
    } catch (error) {
      res.status(500).json({ message: "Decode failed", error });
    }
  });

  // SKU Encode - Generate SKU from attributes
  app.post("/api/sku/encode", async (req, res) => {
    try {
      const { seasonCode, categoryCode, typeCode, designNo, fabricCode, colorCode,
              styleCode, printTypeCode, placementCode, supplierCode, factoryCode, sizeCode } = req.body;

      if (!seasonCode || !categoryCode || !typeCode || !designNo || !fabricCode || !colorCode ||
          !styleCode || !printTypeCode || !placementCode || !supplierCode || !factoryCode || !sizeCode) {
        return res.status(400).json({ message: "All SKU components are required" });
      }

      const [season, category, type, fabric, color, style, printType, placement, supplier, factory, size] = await Promise.all([
        (await storage.getSeasons()).find(s => s.code === seasonCode),
        (await storage.getCategories()).find(c => c.code === categoryCode),
        (await storage.getTypes()).find(t => t.code === typeCode),
        (await storage.getFabrics()).find(f => f.code === fabricCode),
        (await storage.getColors()).find(c => c.code === colorCode),
        (await storage.getStyles()).find(s => s.code === styleCode),
        (await storage.getPrintTypes()).find(p => p.code === printTypeCode),
        (await storage.getPlacements()).find(p => p.code === placementCode),
        (await storage.getSuppliers()).find(s => s.code === supplierCode),
        (await storage.getFactories()).find(f => f.code === factoryCode),
        (await storage.getSizes()).find(s => s.code === sizeCode),
      ]);

      if (!season || !category || !type || !fabric || !color || !style || 
          !printType || !placement || !supplier || !factory || !size) {
        return res.status(400).json({ message: "One or more master data codes not found" });
      }

      const masterDesignCode = [seasonCode, categoryCode, typeCode, designNo, fabricCode, colorCode].join("-");
      const skuCode = [seasonCode, categoryCode, typeCode, designNo, fabricCode, colorCode,
                       styleCode, printTypeCode, placementCode, supplierCode, factoryCode, sizeCode].join("-");

      const numericCodes = [
        season.numericCode,
        category.numericCode,
        type.numericCode,
        parseInt(designNo) || 0,
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

      res.json({
        masterDesignCode,
        skuCode,
        skuCodedSegmented,
        skuCodedCompact,
      });
    } catch (error) {
      res.status(500).json({ message: "Encode failed", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
