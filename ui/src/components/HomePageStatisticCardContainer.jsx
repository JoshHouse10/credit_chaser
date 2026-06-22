import { Group, Text } from '@mantine/core';
import { IconCash, IconClock, IconAlertTriangle } from '@tabler/icons-react';
import Toggle from './Toggle.jsx';
import HomePageStatisticCard from './HomePageStatisticCard.jsx';
import classes from './css/HomePageStatisticCard.module.css';
import {useState} from 'react';

export default function HomePageStatisticCardContainer() {

    const [range, setRange] = useState('Yearly');

    const totalPaid = range === 'Yearly' ? 500000 : 5000;
    const totalOutstanding = range === 'Yearly' ? 20000 : 1000;
    const totalOverdue = range === 'Yearly' ? 1000 : 0;

    const cards = [
        {title: 'Total paid', value: totalPaid, icon: IconCash, color: 'teal'},
        {title: 'Total outstanding', value: totalOutstanding, icon: IconClock, color: 'indigo'},
        {title: 'Total overdue', value: totalOverdue, icon: IconAlertTriangle, color: 'red'}
        ]
    return (
        <div className={classes.container}>
            <Group justify="space-between" align="center">
                <Text size="md" fw={500}>Overview</Text>
                <Toggle setRange={setRange}/>
            </Group>
            <div className={classes.cards}>
                {cards.map(card => (
                    <HomePageStatisticCard
                        key={card.title}
                        title={card.title}
                        value={card.value}
                        icon={card.icon}
                        color={card.color}
                    />
                ))}
            </div>
            </div>
        )
    }
