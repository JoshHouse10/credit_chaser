import { useState } from 'react';
import {
  IconDashboard,
  IconLogout,
  IconInvoice,
  IconUserCircle,
  IconBuildingBank,
  IconHistory
} from '@tabler/icons-react';
import { Code, Group } from '@mantine/core';
import classes from './css/Navbar.module.css';

const data = [
  { link: '', label: 'Dashboard', icon: IconDashboard },
  { link: '', label: 'Invoices', icon: IconInvoice },
  { link: '', label: 'Customers', icon: IconUserCircle },
  { link: '', label: 'Automated Credit Control', icon: IconBuildingBank },
  { link: '', label: 'Event Log', icon: IconHistory },

];

export default function Navbar() {
  const [active, setActive] = useState('Dashboard');

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">

        </Group>
        {links}
      </div>

      <div className={classes.footer}>


        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}