import { AppShell, Button } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import Header from '../components/Header.jsx'
import Navbar from '../components/Navbar.jsx';
import InteractiveTable from '../components/InteractiveTable.jsx';
import CreateInvoiceModal from '../components/CreateInvoiceModal.jsx';
import { useDisclosure } from '@mantine/hooks';
import classes from './css/InvoicesPage.module.css'
import { fetchInvoices, searchInvoicesQuery } from '../api/queries.js';
import { StatusBadge, calculateStatus } from '../components/DashboardTableContainer.jsx';
import { NumberFormatter } from '@mantine/core';

const topRankedReceivablesColDefs = [
  { field: 'customer.firstName', headerName: 'Customer', flex: 1.4 },
  {field: 'documentDate', headerName: 'Document Date', flex:1, cellRenderer: DateCell},
  { field: 'invoiceTotal', headerName: 'Total', flex: 1, cellRenderer: MoneyCell, type: 'rightAligned' },
  { field: 'outstandingTotal', headerName: 'Outstanding', flex: 1, cellRenderer: MoneyCell, type: 'rightAligned' },
  { field: 'dueDate', headerName: 'Due Date', flex: 1, cellRenderer: DateCell },
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
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className={classes.invoicesPageContainer}>
      <div className={classes.createInvoiceContainer}>
        <Button color="jade" leftSection={<IconPlus size={16} stroke={2} />} onClick={open}>
          Create invoice
        </Button>
      </div>
      <CreateInvoiceModal opened={opened} onClose={close} />
      <InteractiveTable
        title="All invoices"
        query={fetchInvoices}
        searchQuery={searchInvoicesQuery}
        colDefs={topRankedReceivablesColDefs}
      />
    </div>
  );
}