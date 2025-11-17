import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
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

  const httpServer = createServer(app);
  return httpServer;
}
