import { storage } from "./storage";

export async function initializeSampleData() {
  // Check if data already exists
  const existingSeasons = await storage.getSeasons();
  if (existingSeasons.length > 0) {
    console.log("Sample data already exists, skipping initialization");
    return;
  }

  console.log("Initializing sample data...");

  // Seasons
  const season1 = await storage.createSeason({ code: "S26", nameAr: "موسم صيف 26", nameEn: "Summer 26" });
  const season2 = await storage.createSeason({ code: "W26", nameAr: "موسم شتاء 26", nameEn: "Winter 26" });
  const season3 = await storage.createSeason({ code: "S27", nameAr: "موسم صيف 27", nameEn: "Summer 27" });

  // Categories
  const categoryTP = await storage.createCategory({ code: "TP", nameAr: "تيشيرتات / علوي", nameEn: "Tops" });
  const categoryBT = await storage.createCategory({ code: "BT", nameAr: "بنطلونات / سفلي", nameEn: "Bottoms" });
  const categoryST = await storage.createCategory({ code: "ST", nameAr: "مجموعات", nameEn: "Sets" });

  // Types
  await storage.createType({ code: "RTS", nameAr: "تيشيرت راوند", nameEn: "Round T-Shirt" });
  await storage.createType({ code: "HO", nameAr: "هودي", nameEn: "Hoodie" });
  await storage.createType({ code: "POL", nameAr: "بولو", nameEn: "Polo" });
  await storage.createType({ code: "SWT", nameAr: "سويت شيرت", nameEn: "Sweatshirt" });
  await storage.createType({ code: "JNS", nameAr: "بنطلون جينز", nameEn: "Jeans" });
  await storage.createType({ code: "JOG", nameAr: "جوجر", nameEn: "Jogger" });

  // Fabrics
  await storage.createFabric({ code: "MLT", nameAr: "ميلتون", nameEn: "Melton" });
  await storage.createFabric({ code: "JRS", nameAr: "جيرسي", nameEn: "Jersey" });
  await storage.createFabric({ code: "LNN", nameAr: "كتان", nameEn: "Linen" });
  await storage.createFabric({ code: "INT", nameAr: "إنترلوك", nameEn: "Interlock" });
  await storage.createFabric({ code: "DM", nameAr: "دنيم", nameEn: "Denim" });

  // Colors
  await storage.createColor({ code: "BLK", hexValue: "#000000", nameAr: "أسود", nameEn: "Black" });
  await storage.createColor({ code: "WHT", hexValue: "#FFFFFF", nameAr: "أبيض", nameEn: "White" });
  await storage.createColor({ code: "RED", hexValue: "#FF0000", nameAr: "أحمر", nameEn: "Red" });
  await storage.createColor({ code: "BLU", hexValue: "#0000FF", nameAr: "أزرق", nameEn: "Blue" });
  await storage.createColor({ code: "GRN", hexValue: "#00FF00", nameAr: "أخضر", nameEn: "Green" });
  await storage.createColor({ code: "GRY", hexValue: "#808080", nameAr: "رمادي", nameEn: "Gray" });

  // Styles
  await storage.createStyle({ code: "ARB", nameAr: "عربي", nameEn: "Arabic" });
  await storage.createStyle({ code: "MIN", nameAr: "مينمال", nameEn: "Minimal" });
  await storage.createStyle({ code: "VNT", nameAr: "فينتاج", nameEn: "Vintage" });
  await storage.createStyle({ code: "FRH", nameAr: "فرنش", nameEn: "French" });

  // Print Types
  await storage.createPrintType({ code: "NP", nameAr: "بدون طباعة", nameEn: "No Print" });
  await storage.createPrintType({ code: "SLK", nameAr: "سيلك سكرين", nameEn: "Silk Screen" });
  await storage.createPrintType({ code: "DTF", nameAr: "دي تي اف", nameEn: "DTF" });
  await storage.createPrintType({ code: "RBR", nameAr: "رابر", nameEn: "Rubber" });

  // Placements
  await storage.createPlacement({ code: "MDF", nameAr: "منتصف الأمام", nameEn: "Mid Front" });
  await storage.createPlacement({ code: "LPF", nameAr: "الأمام الأيسر", nameEn: "Left Front" });
  await storage.createPlacement({ code: "RPF", nameAr: "الأمام الأيمن", nameEn: "Right Front" });
  await storage.createPlacement({ code: "MDB", nameAr: "منتصف الخلف", nameEn: "Mid Back" });
  await storage.createPlacement({ code: "LSL", nameAr: "الكم الأيسر", nameEn: "Left Sleeve" });
  await storage.createPlacement({ code: "RSL", nameAr: "الكم الأيمن", nameEn: "Right Sleeve" });

  // Suppliers
  await storage.createSupplier({ code: "S1", nameAr: "مورد 1", nameEn: "Supplier 1" });
  await storage.createSupplier({ code: "S2", nameAr: "مورد 2", nameEn: "Supplier 2" });
  await storage.createSupplier({ code: "S3", nameAr: "مورد 3", nameEn: "Supplier 3" });

  // Factories
  await storage.createFactory({ code: "F1", nameAr: "مصنع 1", nameEn: "Factory 1" });
  await storage.createFactory({ code: "F2", nameAr: "مصنع 2", nameEn: "Factory 2" });
  await storage.createFactory({ code: "F3", nameAr: "مصنع 3", nameEn: "Factory 3" });

  // Sizes
  await storage.createSize({ code: "S", nameAr: "صغير", nameEn: "Small" });
  await storage.createSize({ code: "M", nameAr: "وسط", nameEn: "Medium" });
  await storage.createSize({ code: "L", nameAr: "كبير", nameEn: "Large" });
  await storage.createSize({ code: "XL", nameAr: "إكس لارج", nameEn: "Extra Large" });
  await storage.createSize({ code: "XXL", nameAr: "دبل إكس لارج", nameEn: "Double XL" });

  // Mapping Tokens - All the codes we just created
  let numericCode = 1;
  
  // Seasons
  await storage.createMappingToken({ token: "S26", numericCode: numericCode++, descriptionAr: "موسم صيف 26", descriptionEn: "Summer Season 26" });
  await storage.createMappingToken({ token: "W26", numericCode: numericCode++, descriptionAr: "موسم شتاء 26", descriptionEn: "Winter Season 26" });
  await storage.createMappingToken({ token: "S27", numericCode: numericCode++, descriptionAr: "موسم صيف 27", descriptionEn: "Summer Season 27" });

  // Categories
  await storage.createMappingToken({ token: "TP", numericCode: numericCode++, descriptionAr: "تيشيرتات / علوي", descriptionEn: "Tops" });
  await storage.createMappingToken({ token: "BT", numericCode: numericCode++, descriptionAr: "بنطلونات / سفلي", descriptionEn: "Bottoms" });
  await storage.createMappingToken({ token: "ST", numericCode: numericCode++, descriptionAr: "مجموعات", descriptionEn: "Sets" });

  // Types
  await storage.createMappingToken({ token: "RTS", numericCode: numericCode++, descriptionAr: "تيشيرت راوند", descriptionEn: "Round T-Shirt" });
  await storage.createMappingToken({ token: "HO", numericCode: numericCode++, descriptionAr: "هودي", descriptionEn: "Hoodie" });
  await storage.createMappingToken({ token: "POL", numericCode: numericCode++, descriptionAr: "بولو", descriptionEn: "Polo" });
  await storage.createMappingToken({ token: "SWT", numericCode: numericCode++, descriptionAr: "سويت شيرت", descriptionEn: "Sweatshirt" });
  await storage.createMappingToken({ token: "JNS", numericCode: numericCode++, descriptionAr: "بنطلون جينز", descriptionEn: "Jeans" });
  await storage.createMappingToken({ token: "JOG", numericCode: numericCode++, descriptionAr: "جوجر", descriptionEn: "Jogger" });

  // Design Numbers (common ones)
  await storage.createMappingToken({ token: "2001", numericCode: numericCode++, descriptionAr: "تصميم 2001", descriptionEn: "Design 2001" });
  await storage.createMappingToken({ token: "2002", numericCode: numericCode++, descriptionAr: "تصميم 2002", descriptionEn: "Design 2002" });
  await storage.createMappingToken({ token: "2003", numericCode: numericCode++, descriptionAr: "تصميم 2003", descriptionEn: "Design 2003" });
  await storage.createMappingToken({ token: "2004", numericCode: numericCode++, descriptionAr: "تصميم 2004", descriptionEn: "Design 2004" });
  await storage.createMappingToken({ token: "2005", numericCode: numericCode++, descriptionAr: "تصميم 2005", descriptionEn: "Design 2005" });
  await storage.createMappingToken({ token: "2006", numericCode: numericCode++, descriptionAr: "تصميم 2006", descriptionEn: "Design 2006" });

  // Fabrics
  await storage.createMappingToken({ token: "MLT", numericCode: numericCode++, descriptionAr: "ميلتون", descriptionEn: "Melton" });
  await storage.createMappingToken({ token: "JRS", numericCode: numericCode++, descriptionAr: "جيرسي", descriptionEn: "Jersey" });
  await storage.createMappingToken({ token: "LNN", numericCode: numericCode++, descriptionAr: "كتان", descriptionEn: "Linen" });
  await storage.createMappingToken({ token: "INT", numericCode: numericCode++, descriptionAr: "إنترلوك", descriptionEn: "Interlock" });
  await storage.createMappingToken({ token: "DM", numericCode: numericCode++, descriptionAr: "دنيم", descriptionEn: "Denim" });

  // Colors
  await storage.createMappingToken({ token: "BLK", numericCode: numericCode++, descriptionAr: "أسود", descriptionEn: "Black" });
  await storage.createMappingToken({ token: "WHT", numericCode: numericCode++, descriptionAr: "أبيض", descriptionEn: "White" });
  await storage.createMappingToken({ token: "RED", numericCode: numericCode++, descriptionAr: "أحمر", descriptionEn: "Red" });
  await storage.createMappingToken({ token: "BLU", numericCode: numericCode++, descriptionAr: "أزرق", descriptionEn: "Blue" });
  await storage.createMappingToken({ token: "GRN", numericCode: numericCode++, descriptionAr: "أخضر", descriptionEn: "Green" });
  await storage.createMappingToken({ token: "GRY", numericCode: numericCode++, descriptionAr: "رمادي", descriptionEn: "Gray" });

  // Styles
  await storage.createMappingToken({ token: "ARB", numericCode: numericCode++, descriptionAr: "عربي", descriptionEn: "Arabic" });
  await storage.createMappingToken({ token: "MIN", numericCode: numericCode++, descriptionAr: "مينمال", descriptionEn: "Minimal" });
  await storage.createMappingToken({ token: "VNT", numericCode: numericCode++, descriptionAr: "فينتاج", descriptionEn: "Vintage" });
  await storage.createMappingToken({ token: "FRH", numericCode: numericCode++, descriptionAr: "فرنش", descriptionEn: "French" });

  // Print Types
  await storage.createMappingToken({ token: "NP", numericCode: numericCode++, descriptionAr: "بدون طباعة", descriptionEn: "No Print" });
  await storage.createMappingToken({ token: "SLK", numericCode: numericCode++, descriptionAr: "سيلك سكرين", descriptionEn: "Silk Screen" });
  await storage.createMappingToken({ token: "DTF", numericCode: numericCode++, descriptionAr: "دي تي اف", descriptionEn: "DTF" });
  await storage.createMappingToken({ token: "RBR", numericCode: numericCode++, descriptionAr: "رابر", descriptionEn: "Rubber" });

  // Placements
  await storage.createMappingToken({ token: "MDF", numericCode: numericCode++, descriptionAr: "منتصف الأمام", descriptionEn: "Mid Front" });
  await storage.createMappingToken({ token: "LPF", numericCode: numericCode++, descriptionAr: "الأمام الأيسر", descriptionEn: "Left Front" });
  await storage.createMappingToken({ token: "RPF", numericCode: numericCode++, descriptionAr: "الأمام الأيمن", descriptionEn: "Right Front" });
  await storage.createMappingToken({ token: "MDB", numericCode: numericCode++, descriptionAr: "منتصف الخلف", descriptionEn: "Mid Back" });
  await storage.createMappingToken({ token: "LSL", numericCode: numericCode++, descriptionAr: "الكم الأيسر", descriptionEn: "Left Sleeve" });
  await storage.createMappingToken({ token: "RSL", numericCode: numericCode++, descriptionAr: "الكم الأيمن", descriptionEn: "Right Sleeve" });

  // Suppliers
  await storage.createMappingToken({ token: "S1", numericCode: numericCode++, descriptionAr: "مورد 1", descriptionEn: "Supplier 1" });
  await storage.createMappingToken({ token: "S2", numericCode: numericCode++, descriptionAr: "مورد 2", descriptionEn: "Supplier 2" });
  await storage.createMappingToken({ token: "S3", numericCode: numericCode++, descriptionAr: "مورد 3", descriptionEn: "Supplier 3" });

  // Factories
  await storage.createMappingToken({ token: "F1", numericCode: numericCode++, descriptionAr: "مصنع 1", descriptionEn: "Factory 1" });
  await storage.createMappingToken({ token: "F2", numericCode: numericCode++, descriptionAr: "مصنع 2", descriptionEn: "Factory 2" });
  await storage.createMappingToken({ token: "F3", numericCode: numericCode++, descriptionAr: "مصنع 3", descriptionEn: "Factory 3" });

  // Sizes
  await storage.createMappingToken({ token: "S", numericCode: numericCode++, descriptionAr: "صغير", descriptionEn: "Small" });
  await storage.createMappingToken({ token: "M", numericCode: numericCode++, descriptionAr: "وسط", descriptionEn: "Medium" });
  await storage.createMappingToken({ token: "L", numericCode: numericCode++, descriptionAr: "كبير", descriptionEn: "Large" });
  await storage.createMappingToken({ token: "XL", numericCode: numericCode++, descriptionAr: "إكس لارج", descriptionEn: "Extra Large" });
  await storage.createMappingToken({ token: "XXL", numericCode: numericCode++, descriptionAr: "دبل إكس لارج", descriptionEn: "Double XL" });

  console.log("Sample data initialized successfully!");
}
