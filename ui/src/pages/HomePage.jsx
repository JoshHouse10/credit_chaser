import { AppShell } from '@mantine/core';
import Header from '../components/Header.jsx'
import Navbar from '../components/Navbar.jsx';
import HomeDashboard from '../components/HomeDashboard.jsx';
import { useDisclosure } from '@mantine/hooks';


export default function HomePage() {
  const [opened] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 56 }}
      navbar={{
              width: 300,
              breakpoint: 'sm',
              collapsed: { mobile: !opened },
            }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <AppShell.Navbar><Navbar/></AppShell.Navbar>

       <AppShell.Main bg="var(--mantine-color-gray-0)"><HomeDashboard/></AppShell.Main>
    </AppShell>
  );
}