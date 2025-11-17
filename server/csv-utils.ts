export function escapeCSVField(field: string | null | undefined): string {
  if (field === null || field === undefined) {
    return '';
  }
  
  const stringField = String(field);
  
  if (stringField.includes('"') || stringField.includes(',') || stringField.includes('\n') || stringField.includes('\r')) {
    return `"${stringField.replace(/"/g, '""')}"`;
  }
  
  return stringField;
}

export function generateCSV(headers: string[], rows: (string | null | undefined)[][]): string {
  const escapedHeaders = headers.map(h => escapeCSVField(h)).join(',');
  const escapedRows = rows.map(row => 
    row.map(field => escapeCSVField(field)).join(',')
  );
  
  return [escapedHeaders, ...escapedRows].join('\n');
}

export function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current.trim());
  return result;
}

export function parseCSV(csvContent: string): { headers: string[], rows: string[][] } {
  const lines = csvContent.split(/\r?\n/).filter(line => line.trim());
  
  if (lines.length === 0) {
    return { headers: [], rows: [] };
  }
  
  const headers = parseCSVLine(lines[0]);
  const rows = lines.slice(1).map(line => parseCSVLine(line));
  
  return { headers, rows };
}

export interface DecodedSKU {
  seasonCode: string;
  seasonNameAr: string;
  seasonNameEn: string | null;
  categoryCode: string;
  categoryNameAr: string;
  categoryNameEn: string | null;
  typeCode: string;
  typeNameAr: string;
  typeNameEn: string | null;
  designNo: string;
  fabricCode: string;
  fabricNameAr: string;
  fabricNameEn: string | null;
  colorCode: string;
  colorNameAr: string;
  colorNameEn: string | null;
  colorHex: string | null;
  styleCode: string;
  styleNameAr: string;
  styleNameEn: string | null;
  printTypeCode: string;
  printTypeNameAr: string;
  printTypeNameEn: string | null;
  placementCode: string;
  placementNameAr: string;
  placementNameEn: string | null;
  supplierCode: string;
  supplierNameAr: string;
  supplierNameEn: string | null;
  factoryCode: string;
  factoryNameAr: string;
  factoryNameEn: string | null;
  sizeCode: string;
  sizeNameAr: string;
  sizeNameEn: string | null;
  masterDesignCode: string;
  skuCode: string;
  skuCodedSegmented: string;
  skuCodedCompact: string;
}
