import '@mantine/core/styles.css';
import HomePage from './pages/HomePage.jsx';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';



import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily:
    'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace:
    '"JetBrains Mono", ui-monospace, SFMono-Regular, Consolas, monospace',
  headings: {
    fontFamily:
      'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 'md',
});

const modules = [AllCommunityModule];

export default function App() {
  return (
    <MantineProvider theme={theme}>
        <AgGridProvider modules={modules}>
      <HomePage />
      </AgGridProvider>
    </MantineProvider>
  );
}