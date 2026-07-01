import { useState } from 'react';
import { Group, Avatar, ActionIcon, Indicator, Text, Menu } from '@mantine/core';
import { IconBell, IconChevronDown, IconSearch } from '@tabler/icons-react';
import classes from './css/Header.module.css';

const josh = {
  firstName: 'Joshua',
  lastName: 'House',
  email: 'jhousepersonal@gmail.com',
  company: 'Josh Industrial',
};

export default function Header() {
  const [currentUser] = useState(josh);

  return (
    <header className={classes.header}>
      <div className={classes.left}>
        <div>
          <p className={classes.eyebrow}>Credit Control</p>
          <h1 className={classes.pageTitle}>Dashboard</h1>
        </div>
      </div>

      <Group gap="sm" wrap="nowrap">
        <button className={classes.orgSwitch} type="button">
          <span className={classes.orgDot} />
          <span className={classes.orgName}>{currentUser?.company}</span>
          <IconChevronDown size={14} stroke={2} className={classes.orgChev} />
        </button>

        <ActionIcon
          variant="subtle"
          color="gray"
          size="lg"
          radius="md"
          aria-label="Search"
        >
          <IconSearch size={18} stroke={1.8} />
        </ActionIcon>

        <Indicator color="var(--overdue)" size={7} offset={5} withBorder>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            radius="md"
            aria-label="Notifications"
          >
            <IconBell size={18} stroke={1.8} />
          </ActionIcon>
        </Indicator>

        <div className={classes.userChip}>
          <Avatar
            radius="md"
            size={32}
            color="jade"
            name={
              currentUser
                ? `${currentUser.firstName} ${currentUser.lastName}`
                : ''
            }
          />
          <div className={classes.userMeta}>
            <Text className={classes.userName}>
              {currentUser.firstName} {currentUser.lastName}
            </Text>
            <Text className={classes.userRole}>Credit Controller</Text>
          </div>
        </div>
      </Group>
    </header>
  );
}
