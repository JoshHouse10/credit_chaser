import { Card, Text, Group, ThemeIcon, NumberFormatter } from '@mantine/core';
import classes from './css/HomePageStatisticCard.module.css';

export default function HomePageStatisticCard({ title, value, icon: Icon, color }) {
  return (
    <Card className={classes.card} shadow="sm" p="lg" radius="md" withBorder>
      <Group gap="sm" mb="sm">
        <ThemeIcon color={color} variant="light" size={38} radius="md">
          {Icon && <Icon size={20} stroke={1.5} />}
        </ThemeIcon>
        <Text className={classes.title} size="sm" c="dimmed">
          {title}
        </Text>
      </Group>

      <div className={classes.value}>
        <NumberFormatter prefix="£" value={value} thousandSeparator />
      </div>
    </Card>
  );
}
