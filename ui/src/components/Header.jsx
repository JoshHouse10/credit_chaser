import { useState } from 'react';
import { Container, Group, Avatar, ActionIcon, Indicator, Text } from '@mantine/core';
import { IconBell, IconChevronDown } from '@tabler/icons-react';
import classes from './css/Header.module.css';

const josh = {
        firstName:'Joshua',
        lastName: 'House',
        email: 'jhousepersonal@gmail.com',
        company: 'Josh Industrial'
        }

export default function Header() {

  const [currentUser, setCurrentUser] = useState(josh);

  return (
    <header className={classes.header}>
      <Container fluid className={classes.inner}>
        <Group gap="xl">
          <Text className={classes.brand}>CREDIT CONTROL</Text>
          <Group gap={6} className={classes.org}>
            <Text size="sm">{currentUser?.company}</Text>
            <IconChevronDown size={14} stroke={1.5} />
          </Group>
        </Group>

        <Group gap="md">
          <Indicator color="red" size={8} offset={4}>
            <ActionIcon variant="subtle" color="white" size="lg" aria-label="Notifications">
              <IconBell size={20} stroke={1.5} />
            </ActionIcon>
          </Indicator>

          <Avatar
            color="indigo"
            name={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : ''}
          />
        </Group>
      </Container>
    </header>
  );
}
