import { useState, useEffect } from 'react';
import { Badge } from '@mantine/core';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import classes from './css/TableContainer.module.css';

ModuleRegistry.registerModules([AllCommunityModule]);

const gridTheme = themeQuartz.withParams({
  accentColor: '#0fa968',
  backgroundColor: '#ffffff',
  headerBackgroundColor: '#fbfcfd',
  headerTextColor: '#8a94a6',
  headerFontWeight: 600,
  headerFontSize: 11,
  foregroundColor: '#0e141b',
  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  cellFontFamily: 'Inter, system-ui, sans-serif',
  borderColor: '#e6e9ee',
  rowBorder: { style: 'solid', width: 1, color: '#f0f2f5' },
  headerRowBorder: { style: 'solid', width: 1, color: '#e6e9ee' },
  wrapperBorder: false,
  rowHoverColor: '#f6f8f9',
  oddRowBackgroundColor: '#ffffff',
  headerHeight: 40,
  rowHeight: 46,
  fontSize: 13.5,
  cellHorizontalPadding: 16,
});

const calculateStatus = (outstanding, dueDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  if (outstanding && due >= today) return 'Outstanding';
  if (outstanding && due < today) return 'Overdue';
  return 'Paid';
};

const statusColors = {
  Overdue: 'var(--overdue)',
  Outstanding: 'var(--outstanding)',
  Paid: 'var(--paid)',
};

export function StatusBadge({ value }) {
  return (
    <Badge
      variant="light"
      radius="sm"
      styles={{
        root: {
          color: statusColors[value] ?? 'var(--text-dim)',
          background: `color-mix(in srgb, ${statusColors[value] ?? '#8a94a6'} 12%, transparent)`,
          fontWeight: 600,
          textTransform: 'none',
          letterSpacing: 0,
        },
      }}
    >
      {value}
    </Badge>
  );
}

export default function TableContainer({ title, subtitle, query, colDefs }) {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        const data = await query();
        if (data) setRowData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className={classes.card}>
      <div className={classes.head}>
        <div>
          <p className={classes.eyebrow}>Receivables</p>
          <h2 className={classes.title}>{title}</h2>
        </div>
        <span className={classes.count}>
          {rowData.length} {rowData.length === 1 ? 'record' : 'records'}
        </span>
      </div>
      <div className={classes.grid}>
        <AgGridReact
          theme={gridTheme}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={{ minWidth: 70, resizable: false }}
          suppressHorizontalScroll
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}

export { calculateStatus };
