import { AppShell } from '@mantine/core';
import Header from '../components/Header.jsx'
import Navbar from '../components/Navbar.jsx';
import HomeDashboard from '../components/HomeDashboard.jsx';
import HomePageStatisticCardContainer from '../components/HomePageStatisticCardContainer.jsx';
import { useDisclosure } from '@mantine/hooks';


export default function HomePage() {
  const [opened, { toggle }] = useDisclosure();

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

       <AppShell.Main><HomeDashboard/></AppShell.Main>
    </AppShell>
  );
}