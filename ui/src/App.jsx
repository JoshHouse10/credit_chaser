import '@mantine/core/styles.css';
import { AllCommunityModule } from 'ag-grid-community';
import { AgGridProvider } from 'ag-grid-react';
import {BrowserRouter, Routes, Route} from "react-router";
import Shell from './components/Shell.jsx';



import { createTheme, MantineProvider } from '@mantine/core';

const theme = createTheme({
  primaryColor: 'jade',
  primaryShade: 6,
  colors: {
    jade: [
      '#e7f8f1',
      '#c4efdf',
      '#97e4c7',
      '#64d7ac',
      '#37cd96',
      '#1ac488',
      '#0fa968',
      '#0c8e57',
      '#0a7346',
      '#064f30',
    ],
    ink: [
      '#eceef1',
      '#d3d7de',
      '#aab2bf',
      '#7f8a9c',
      '#5b6672',
      '#3a4149',
      '#252b32',
      '#1a1f26',
      '#141a20',
      '#10151c',
    ],
  },
  fontFamily:
    'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
  fontFamilyMonospace:
    '"JetBrains Mono", ui-monospace, SFMono-Regular, Consolas, monospace',
  headings: {
    fontFamily:
      '"Space Grotesk", Inter, system-ui, sans-serif',
    fontWeight: '600',
  },
  defaultRadius: 6,
});

const modules = [AllCommunityModule];

export default function App() {
  return (

    <MantineProvider theme={theme}>
        <AgGridProvider modules={modules}>
            <BrowserRouter>
                <Shell/>
            </BrowserRouter>
            </AgGridProvider>
    </MantineProvider>

  );
}