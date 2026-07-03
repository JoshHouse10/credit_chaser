import { AppShell } from '@mantine/core';
import Header from '../components/Header.jsx'
import Navbar from '../components/Navbar.jsx';
import HomeDashboard from '../components/HomeDashboard.jsx';
import { useDisclosure } from '@mantine/hooks';
import {Routes, Route, useLocation} from "react-router";
import InvoicesPage from '../pages/InvoicesPage.jsx';

const pathTitles = [
  { path: "/", title: "Dashboard" },
  { path: "/invoices", title: "Invoices" },
];

export default function Shell() {
  const [opened] = useDisclosure();
  const { pathname } = useLocation();
  const getPathTitle = () => {
    const match = pathTitles.find((p) => p.path === pathname);
    return match ? match.title : "";
  };

  return (
    <AppShell
      layout="alt"
      padding={0}
      header={{ height: 60 }}
      navbar={{
              width: 236,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
    >
      <AppShell.Header withBorder={false} style={{ background: 'transparent' }}>
        <Header pageTitle={getPathTitle()} />
      </AppShell.Header>
      <AppShell.Navbar withBorder={false} style={{ background: 'var(--ink)' }}>
        <Navbar/>
      </AppShell.Navbar>

       <AppShell.Main bg="var(--canvas)">
           <Routes>
           <Route index element={<HomeDashboard pageTitle={getPathTitle()} />}/>
           <Route path="/invoices" element={<InvoicesPage pageTitle={"Invoices"}/>}/>
           </Routes>
           </AppShell.Main>

    </AppShell>
  );
}