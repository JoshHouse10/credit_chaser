import { AgGridReact } from 'ag-grid-react';
import { useState } from 'react';

export default function InvoiceGrid() {
  const [rowData] = useState([{ customer: 'josh', value: 4.99 }]);
  const [cols] = useState([{ field: 'customer' }, { field: 'value' }]);
  const defaultColDef = {
    flex: 1,
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={cols}
        defaultColDef={defaultColDef}
      />
    </div>
  );
}
