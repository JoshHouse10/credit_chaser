import { useState, useEffect } from 'react';
import {
  IconLayoutDashboard,
  IconLogout,
  IconFileInvoice,
  IconUsers,
  IconRobot,
  IconHistory,
} from '@tabler/icons-react';
import classes from './css/Navbar.module.css';
import {useNavigate} from "react-router";

const data = [
  { link: '/', label: 'Dashboard', icon: IconLayoutDashboard },
  { link: '/invoices', label: 'Invoices', icon: IconFileInvoice },
  { link: '/customers', label: 'Customers', icon: IconUsers },
  { link: '/automated-control', label: 'Automated Control', icon: IconRobot },
  { link: '/event-log', label: 'Event Log', icon: IconHistory },
];

export default function Navbar() {
  const [active, setActive] = useState('Dashboard');
  const navigate = useNavigate();


  const handleNavigation = (link) => {

      navigate(link)
      }

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(label => item.label);
        navigate(item.link);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.6} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.brand}>
        <span className={classes.brandMark}>£</span>
        <span className={classes.brandText}>
          Credit<span className={classes.brandAccent}>Chaser</span>
        </span>
      </div>

      <div className={classes.navbarMain}>
        <p className={classes.groupLabel}>Workspace</p>
        {links}
      </div>

      <div className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.6} />
          <span>Log out</span>
        </a>
      </div>
    </nav>
  );
}
