import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import classes from './css/DashboardTableContainer.module.css';
import {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';


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



export default function InteractiveTable({ title, subtitle, query, colDefs }) {
  const [rowData, setRowData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);


  const walkPath = (obj, path) => {
    let current = obj;
    for (const key of path.split('.')) {
      if (current == null) return undefined;
      current = current[key];
    }
    return current;
  };

  const handleSearch = (e, searchableFields) => {
    const text = e.target.value.trim().toLowerCase();

    if (!text) {
      setFilteredData(undefined);
      return;
    }

    const matches = rowData.filter((row) =>
      searchableFields.some((field) => {
        const value = walkPath(row, field);
        return value != null && String(value).toLowerCase().includes(text);
      })
    );

    setFilteredData(matches);
  };

  useEffect(() => {
    if (!query) return;
    const fetchData = async () => {
      try {
        const data = await query(0,5);

        if (data.content) setRowData(data.content);
      } catch (error) {
      }
    };
    fetchData();
  }, [query]);

  return (
    <div className={classes.card}>
      <div className={classes.head}>
        <div>
          <input type="text" placeholder="search" onChange={(e) => handleSearch(e, ["customer.firstName"])}/>
          <h2 className={classes.title}>{title}</h2>
        </div>
        <span className={classes.count}>
          {rowData.length} {rowData.length === 1 ? 'record' : 'records'}
        </span>
      </div>
      <div className={classes.grid}>
        <AgGridReact
          theme={gridTheme}
          rowData={filteredData ? filteredData: rowData}
          columnDefs={colDefs}
          defaultColDef={{ minWidth: 70, resizable: true }}
          suppressHorizontalScroll
          domLayout="autoHeight"
        />
      </div>
    </div>
  );
}