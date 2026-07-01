import { NumberFormatter } from '@mantine/core';
import Toggle from './Toggle.jsx';
import HomePageStatisticCard from './HomePageStatisticCard.jsx';
import classes from './css/HomePageStatisticCard.module.css';
import { fetchHomePageStatistics } from '../api/queries.js';
import { useState, useEffect } from 'react';

export default function HomePageStatisticCardContainer() {
  const [range, setRange] = useState('Yearly');
  const [statisticData, setStatisticData] = useState({});

  useEffect(() => {
    const fetchStatisticData = async () => {
      try {
        const data = await fetchHomePageStatistics();
        if (data) setStatisticData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchStatisticData();
  }, []);

  const totalPaid =
    range === 'Yearly'
      ? statisticData?.yearlyTotalPaid ?? 0
      : statisticData?.monthlyTotalPaid ?? 0;
  const totalOutstanding =
    range === 'Yearly'
      ? statisticData?.yearlyTotalOutstanding ?? 0
      : statisticData?.monthlyTotalOutstanding ?? 0;
  const totalOverdue =
    range === 'Yearly'
      ? statisticData?.yearlyTotalOverdue ?? 0
      : statisticData?.monthlyTotalOverdue ?? 0;

  const total = totalPaid + totalOutstanding + totalOverdue;
  const pct = (v) => (total > 0 ? (v / total) * 100 : 0);

  const cards = [
    { key: 'paid', title: 'Paid', value: totalPaid, tone: 'paid' },
    {
      key: 'outstanding',
      title: 'Outstanding',
      value: totalOutstanding,
      tone: 'outstanding',
    },
    { key: 'overdue', title: 'Overdue', value: totalOverdue, tone: 'overdue' },
  ];

  return (
    <section className={classes.hero}>
      <div className={classes.heroTop}>
        <div>
          <p className={classes.eyebrow}>Cash position</p>
          <div className={classes.total}>
            <NumberFormatter prefix="£" value={total} thousandSeparator />
            <span className={classes.totalLabel}>invoiced</span>
          </div>
        </div>
        <Toggle setRange={setRange} />
      </div>

      {/* Signature: receivable-health bar */}
      <div className={classes.bar} role="img" aria-label="Receivable health">
        <span
          className={classes.segPaid}
          style={{ width: `${pct(totalPaid)}%` }}
        />
        <span
          className={classes.segOutstanding}
          style={{ width: `${pct(totalOutstanding)}%` }}
        />
        <span
          className={classes.segOverdue}
          style={{ width: `${pct(totalOverdue)}%` }}
        />
      </div>

      <div className={classes.cards}>
        {cards.map((card) => (
          <HomePageStatisticCard
            key={card.key}
            title={card.title}
            value={card.value}
            tone={card.tone}
            percent={pct(card.value)}
          />
        ))}
      </div>
    </section>
  );
}
