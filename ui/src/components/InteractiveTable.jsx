import { AllCommunityModule, ModuleRegistry, themeQuartz } from 'ag-grid-community';
import classes from './css/DashboardTableContainer.module.css';
import {useState, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import { TextInput, ActionIcon } from '@mantine/core';
import {useDebounce300ms} from '../hooks/DebounceHooks.jsx';
import { IconSearch, IconChevronLeft, IconChevronRight } from '@tabler/icons-react';


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



export default function InteractiveTable({ title, subtitle, query, searchQuery, colDefs }) {

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);
    const [rowData, setRowData] = useState([]);
    const [searchText, setSearchText] = useState('');

    const debouncedText = useDebounce300ms(searchText);

    const fetchData = async () => {
            try {
              const data = await query(page,10);

              if (data.content) {
                  setRowData(data.content);
                  setTotalPages(data.totalPages);
                  setTotalRecords(data.totalElements)
                  }
            } catch (error) {
            }
          };

      const fetchSearchQuery = async () => {
          console.log(debouncedText);
          if(!debouncedText) return;
          try {
              const data = await searchQuery(page,10,debouncedText);
              if(data) {
                  setRowData(data.content);
                  setTotalPages(data.totalPages);
                  setTotalRecords(data.setTotalRecords);
                  }
              }
          catch(error) {
              console.error(error);
              throw error;
              }

          }

      const handleSearchChange = (e) => {
          setPage(0);
          const text = e.target.value;
          setSearchText(text);
          }

    useEffect(() => {
    if (!query && !fetchSearchQuery) return;
    debouncedText ? fetchSearchQuery() : fetchData();

  }, [ debouncedText ,page]);

  return (
    <div className={classes.card}>
      <div className={classes.head}>
        <div>
          <p className={classes.eyebrow}>Receivables</p>
          <h2 className={classes.title}>{title}</h2>
        </div>
        <div className={classes.headActions}>
          <TextInput
            className={classes.search}
            placeholder="Search invoices…"
            radius="sm"
            leftSection={<IconSearch size={15} stroke={1.8} />}
            onChange={handleSearchChange}
          />
          <span className={classes.count}>
            {totalRecords} {totalRecords === 1 ? 'record' : 'records'}
          </span>
        </div>
      </div>
      <div className={classes.grid}>
        <AgGridReact
          theme={gridTheme}
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={{ minWidth: 70, resizable: true }}
          suppressHorizontalScroll
          domLayout="autoHeight"
        />
      </div>
      <div className={classes.footer}>
        <span className={classes.pageLabel}>page {page + 1} of {totalPages}</span>
        <div className={classes.pageControls}>
          <ActionIcon
            variant="subtle"
            color="gray"
            radius="md"
            aria-label="Previous page"
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
          >
            <IconChevronLeft size={16} stroke={1.8} />
          </ActionIcon>
          <ActionIcon
            variant="subtle"
            color="gray"
            radius="md"
            aria-label="Next page"
            disabled={page + 1 >= totalPages}
            onClick={() => setPage(page + 1)}
          >
            <IconChevronRight size={16} stroke={1.8} />
          </ActionIcon>
        </div>
      </div>
    </div>
  );
}