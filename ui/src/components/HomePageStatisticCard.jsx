import { Card, Text, NumberFormatter } from '@mantine/core';
import classes from './css/HomePageStatisticCard.module.css';

export default function HomePageStatisticCard({title ,value}) {
  return (
    <Card className={classes.card} shadow="sm" p="lg" radius="md" withBorder>
      <Card.Section className={classes.accent} />

      <div className={classes.value}>
          <NumberFormatter prefix="£" value={value} thousandSeparator/>
          </div>

      <Text className={classes.title} size="lg" c="dimmed">
        {title}
      </Text>

    </Card>
  );
}