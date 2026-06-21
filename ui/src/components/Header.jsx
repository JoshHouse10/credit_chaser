import { useState } from 'react';
import { Burger, Container, Divider, Drawer, Group, ScrollArea, Avatar, ActionIcon, Indicator, Menu, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBell, IconSettings, IconLogout } from '@tabler/icons-react';
import classes from './css/Header.module.css';

const josh = {
        firstName:'Joshua',
        lastName: 'House',
        email: 'jhousepersonal@gmail.com',
        company: 'Josh Industrial'
        }

export default function Header() {

  const [currentUser, setCurrentUser] = useState(josh);
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <header className={classes.header}>
      <Container fluid className={classes.inner}>
        {"credit_control"}

        <Group gap="md" visibleFrom="xs">
          <Indicator color="red" size={8} offset={4}>
            <ActionIcon variant="subtle" color="gray" size="lg" aria-label="Notifications">
              <IconBell size={20} stroke={1.5} />
            </ActionIcon>
          </Indicator>


              <Avatar

                name={currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : ''}
              />
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="xs"
          size="sm"
          aria-label="Toggle navigation"
        />
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px" mx="-md">
          <Divider my="sm" />

        </ScrollArea>
      </Drawer>
    </header>
  );
}
