import { AppShell } from '@mantine/core';
import Header from '../components/Header.jsx'
import Navbar from '../components/Navbar.jsx';
import HomeDashboard from '../components/HomeDashboard.jsx';
import { useDisclosure } from '@mantine/hooks';


export default function HomePage() {
  const [opened] = useDisclosure();

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
        <Header />
      </AppShell.Header>
      <AppShell.Navbar withBorder={false} style={{ background: 'var(--ink)' }}>
        <Navbar/>
      </AppShell.Navbar>

       <AppShell.Main bg="var(--canvas)"><HomeDashboard/></AppShell.Main>
    </AppShell>
  );
}