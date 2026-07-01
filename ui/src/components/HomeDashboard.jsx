import classes from './css/HomeDashboard.module.css';
import { NumberFormatter } from '@mantine/core';
import HomePageStatisticCardContainer from './HomePageStatisticCardContainer.jsx';
import TableContainer, { StatusBadge, calculateStatus } from './TableContainer.jsx';
import { fetchDueInvoicesNext7Days } from '../api/queries.js';

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

const dueThisWeekColDefs = [
  { field: 'customer.firstName', headerName: 'Customer', flex: 1.4 },
  { field: 'invoiceTotal', headerName: 'Total', flex: 1, cellRenderer: MoneyCell, type: 'rightAligned' },
  { field: 'outstandingTotal', headerName: 'Outstanding', flex: 1, cellRenderer: MoneyCell, type: 'rightAligned' },
  { field: 'dueDate', headerName: 'Due date', flex: 1, cellRenderer: DateCell },
  { headerName: 'Status', flex: 1, minWidth: 120, cellRenderer: StatusCell },
];

const topRankedReceivablesColDefs = [
  { field: 'customer.firstName', headerName: 'Customer', flex: 1.4 },
  { field: 'invoiceTotal', headerName: 'Total', flex: 1, cellRenderer: MoneyCell, type: 'rightAligned' },
  { field: 'outstandingTotal', headerName: 'Outstanding', flex: 1, cellRenderer: MoneyCell, type: 'rightAligned' },
  { field: 'dueDate', headerName: 'Due date', flex: 1, cellRenderer: DateCell },
  { headerName: 'Status', flex: 1, minWidth: 120, cellRenderer: StatusCell },
];

export default function HomeDashboard() {
  return (
    <div className={classes.dashboard}>
      <HomePageStatisticCardContainer />
      <TableContainer
        title="Due this week"
        query={fetchDueInvoicesNext7Days}
        colDefs={dueThisWeekColDefs}
      />
      <TableContainer
        title="Top ranked receivables"
        colDefs={topRankedReceivablesColDefs}
      />
    </div>
  );
}
