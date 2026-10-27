import Table from "./Table.astro";
import TableBody from "./TableBody.astro";
import TableCell from "./TableCell.astro";
import TableHead from "./TableHead.astro";
import TableHeader from "./TableHeader.astro";
import TableRow from "./TableRow.astro";

const tableRow = (
  values: string[],
  cellComponent: typeof TableCell | typeof TableHead = TableCell,
) => ({
  component: TableRow,
  slots: {
    default: values.map((value) => ({
      component: cellComponent,
      slots: { default: value },
    })),
  },
});

const tableSlots = {
  default: [
    {
      component: TableHeader,
      slots: {
        default: tableRow(["Invoice", "Status", "Amount"], TableHead),
      },
    },
    {
      component: TableBody,
      slots: {
        default: [
          tableRow(["INV001", "Paid", "$250.00"]),
          tableRow(["INV002", "Pending", "$150.00"]),
          tableRow(["INV003", "Unpaid", "$350.00"]),
        ],
      },
    },
  ],
};

const meta = {
  title: "UI/Elements/Table",
  component: Table,
  tags: ["!autodocs"],
  args: {
    hasBorder: false,
    slots: tableSlots,
  },
};

export default meta;

export const Default = {};

export const Bordered = {
  args: {
    hasBorder: true,
  },
};