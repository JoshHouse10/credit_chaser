import { AppShell } from '@mantine/core';
import Header from '../components/Header.jsx'
import Navbar from '../components/Navbar.jsx';
import InteractiveTable from '../components/InteractiveTable.jsx';
import { useDisclosure } from '@mantine/hooks';
import classes from './css/InvoicesPage.module.css'
import { fetchInvoices } from '../api/queries.js';
import { StatusBadge, calculateStatus } from '../components/DashboardTableContainer.jsx';
import { NumberFormatter } from '@mantine/core';

const topRankedReceivablesColDefs = [
  { field: 'customer.firstName', headerName: 'Customer', flex: 1.4 },
  { field: 'invoiceTotal', headerName: 'Total', flex: 1, cellRenderer: MoneyCell, type: 'rightAligned' },
  { field: 'outstandingTotal', headerName: 'Outstanding', flex: 1, cellRenderer: MoneyCell, type: 'rightAligned' },
  { field: 'dueDate', headerName: 'Due date', flex: 1, cellRenderer: DateCell },
  { headerName: 'Status', flex: 1, minWidth: 120, cellRenderer: StatusCell },
];

function MoneyCell({ value }) {
  return (
    <span className="figure">
      <NumberFormatter prefix="£" value={value} thousandSeparator />
    </span>
  );
}

function DateCell({ value }) {
  return <span className="figure">{value}</span>;
}

function StatusCell({ data }) {
  return <StatusBadge value={calculateStatus(data?.outstandingTotal, data?.dueDate)} />;
}

export default function InvoicesPage() {
  const [opened] = useDisclosure();

  return (
      <div className={classes.invoicesPageContainer}>

    <div className={classes.createInvoiceContainer}>
        <button>Create Invoice</button>
        </div>
        <InteractiveTable query={fetchInvoices} colDefs={topRankedReceivablesColDefs}/>
        </div>
  );
}