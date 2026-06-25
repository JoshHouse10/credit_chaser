import { useState, useEffect } from 'react';
import { Card, Text, Group, Badge, NumberFormatter } from '@mantine/core';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';


ModuleRegistry.registerModules([AllCommunityModule]);

const gridTheme = themeQuartz.withParams({
  accentColor: '#4c43c4',
  headerBackgroundColor: '#f3f2fb',
  headerTextColor: '#3c3489',
  fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  borderColor: '#e9e8f2',
  rowHoverColor: '#f3f2fb',
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
  Overdue: 'red',
  Outstanding: 'yellow',
  Paid: 'teal',
};

function StatusBadge({ value }) {
  return (
    <Badge color={statusColors[value] ?? 'gray'} variant="light" radius="sm">
      {value}
    </Badge>
  );
}

function ValueCell({ value }) {
  return <NumberFormatter prefix="£" value={value} thousandSeparator />;
}

export default function TableContainer({ title, query }) {
  const [rowData, setRowData] = useState([
  ]);

  const [colDefs, setColDefs] = useState([
    { field: 'customer', headerName: 'Customer', flex: 1 },
    { field: 'value', headerName: 'Value', flex: 1, cellRenderer: ValueCell },
    { field: 'outstanding', headerName: 'Outstanding', flex: 1, cellRenderer: ValueCell },
    { field: 'dueDate', headerName: 'Due date', flex: 1 },
  ]);

  useEffect(() => {
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
    <Card shadow="sm" p="lg" radius="md" withBorder mt="md">
      <Group justify="space-between" mb="md">
        <Text size="md" fw={500}>{title}</Text>
      </Group>
      <div style={{ height: 280 }}>
        <AgGridReact
          theme={gridTheme}
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </Card>
  );
}
