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
        {title: 'Total paid', value: totalPaid},
        {title: 'Total outstanding', value: totalOutstanding},
        {title: 'Total overdue', value: totalOverdue}
        ]
    return (
        <div className={classes.container}>
            <Toggle setRange={setRange}/>
            <div className={classes.cards}>
                {cards.map(card => <HomePageStatisticCard key={card.title} title={card.title} value={card.value} />)}
            </div>
            </div>
        )
    }