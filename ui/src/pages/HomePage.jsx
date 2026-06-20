import { AppShell } from '@mantine/core';
import Header from '../components/Header.jsx'
import HomeDashboard from '../components/HomeDashboard.jsx';
import HomePageStatisticCardContainer from '../components/HomePageStatisticCardContainer.jsx'

export default function HomePage() {
  return (
    <AppShell
      padding="md"
      header={{ height: 56 }}
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>
       <AppShell.Main><HomePageStatisticCardContainer/></AppShell.Main>
    </AppShell>
  );
}