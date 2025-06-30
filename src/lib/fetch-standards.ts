import ExcelJS from "exceljs";

type Category = 
  "Public Mobility" | 
  "Data/Trusted Exchanges" | 
  "Vehicle-to-Everything (V2X)" | 
  "Inactive" | 
  "Operations/Safety" | 
  "Cybersecurity Controls" |
  "Automation" |
  "Positioning Navigation and Timing (PNT)" |
  "Emerging Technology" |
  "Public Mobility" |
  "Unknown"

type ParsedRow = {
  id: string;
  sdo: string;
  name: string;
  category: Category;
  link?: string;
}

type RowValues = ExcelJS.CellValue [] | { [key: string]: ExcelJS.CellValue };

type ColumnMap = { [key: string]: number };

const getParsedRow = (row: ExcelJS.Row, rowNumber: number, columnMap: ColumnMap): ParsedRow => {
  const values = row.values;
  const cat = values[columnMap["Category"]]

  return {
    id: String(rowNumber - 1),
    sdo: values[columnMap["SDO"]],
    name: values[columnMap["Standard"]],
    category: cat as Category ?? "Unknown",
    link: values[columnMap["Link"]]?.hyperlink
  }
}

export async function fetchStandardsData(filePath: string): Promise<ParsedRow[]> {
  const workbook = new ExcelJS.Workbook();
  const file = await workbook.xlsx.readFile(filePath);
  const worksheet = file.getWorksheet(1);

  if (!worksheet) throw new Error("Worksheet could not be found");

  const headerRow = worksheet.getRow(1)
  const columnMap: ColumnMap = {};
  headerRow.eachCell((cell, colNumber) => {
    if (cell.value) {
      columnMap[cell.value.toString()] = colNumber;
    }
  });

  const rows: ParsedRow[] = [];
  worksheet.eachRow((row: ExcelJS.Row, rowNumber: number) => {
    if (rowNumber > 1) {
      rows.push(getParsedRow(row, rowNumber, columnMap));
    }
  })

  return rows;
}