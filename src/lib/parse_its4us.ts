import ExcelJS from "exceljs";

type ParsedRow = {
  id: string,
  resource_title: string,
  publication_code: string | null,
  awardee_deployment: string,
  task_name: string,
  phase: number,
  date: Date | null,
  type: string,
  keywords: string[],
  links: LinkItem[]
}

type LinkItem = {
  title: string,
  type: "download" | "external",
  href?: string,
};

type NewLinkItem = LinkItem & {
  href: string
}

type RowValues = ExcelJS.CellValue[] | { [key: string]: ExcelJS.CellValue };

type ColumnMap = { [key: string]: number };
type LinkMap = { [key: string]: LinkItem };

const links: {[key: string]: LinkItem} = {
  "Slide Deck Link 1": { title: "Slide Deck 1", type: "download" },
  "Slide Deck Link 2": { title: "Slide Deck 2", type: "download" },
  "Slide Deck Link 3": { title: "Slide Deck 3", type: "download" },
  "Transcript Link": { title: "Transcript", type: "external" },
  "Recording Link": { title: "View Webinar", type: "external" },
  "Publication Link": { title: "Publication Link", type: "external" },
  "External Link": { title: "External Link", type: "external" },
}

const getLinks = (rowValues: RowValues, columnNames: ColumnMap, links: LinkMap) => {
  // Finds every column from the spreadsheet that is in the link mapping object
  const linkColumns = Object.fromEntries(
    Object.entries(columnNames).filter(([columnName]) => links.hasOwnProperty(columnName))
  )
  
  const newLinks: NewLinkItem[] = [];
  for (const [linkColumn, columnNumber] of Object.entries(linkColumns)) {
    const cellValue = rowValues[columnNumber]?.text;
    if (cellValue) {
      const linkData = links[linkColumn];
      newLinks.push({
        title: linkData.title,
        type: linkData.type,
        href: cellValue,
      })
    }
  }
  return newLinks;
}

function getKeywords(keywordString: string): string[] {
  const splitKeywords = keywordString ? keywordString.split(";") : [];
  const deepSplitKeywords = splitKeywords.map(keyword => keyword.split(",")).flat();
  return deepSplitKeywords.map(keyword => keyword.trim().replace(`"`, ``).replace(`\\n`, ``));
}

const getParsedRow = (row: ExcelJS.Row, rowNumber: number, columnMap: ColumnMap): ParsedRow => {
  const values = row.values;
  // console.log(values[columnMap["Publish Date"]]);
  // console.log(typeof values[columnMap["Publish Date"]]);
  return {
    id: String(rowNumber - 1),
    resource_title: values[columnMap["Resource Title"]],
    publication_code: values[columnMap["Publication Code"]] ?? null,
    awardee_deployment: values[columnMap["Awardee/Deployment"]],
    task_name: values[columnMap["Task #/Name"]],
    phase: values[columnMap["Phase"]],
    date: values[columnMap["Publish Date"]] ?? null,
    type: values[columnMap["Type"]],
    keywords: getKeywords(values[columnMap["Keywords"]]),
    links: getLinks(values, columnMap, links),
  }
}

export async function fetchWebinarData(filePath: string): Promise<ParsedRow[]> {
  const workbook = new ExcelJS.Workbook();
  const file = await workbook.xlsx.readFile(filePath);
  const worksheet = file.getWorksheet(1);

  if (!worksheet) throw new Error("Worksheet could not be found");

  const headerRow = worksheet.getRow(1);
  const columnMap: ColumnMap = {};
  headerRow.eachCell((cell, colNumber) => {
    if (cell.value) {
      columnMap[cell.value.toString()] = colNumber;
    }
  });

  const rows: ParsedRow[] = [];
  worksheet.eachRow(function(row: ExcelJS.Row, rowNumber: number) {
    if (rowNumber > 1) {
      rows.push(getParsedRow(row, rowNumber, columnMap));
    }
  })

  return rows;
}

