import HomePageStatisticCard from './HomePageStatisticCard.jsx';
import classes from './css/HomePageStatisticCard.module.css';

export default function HomePageStatisticCardContainer() {

    const totalPaid = 500000;
    const totalOutstanding = 2000;
    const totalOverdue = 1500;

    const cards = [
        {title: 'Total paid', value: totalPaid},
        {title: 'Total outstanding', value: totalOutstanding},
        {title: 'Total overdue', value: totalOverdue}
        ]
    return (
        <div className={classes.container}>
            {cards.map(card => <HomePageStatisticCard key={card.title} title={card.title} value={card.value}/>)}
            </div>
        )
    }