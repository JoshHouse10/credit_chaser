import { NumberFormatter } from '@mantine/core';
import classes from './css/HomePageStatisticCard.module.css';

export default function HomePageStatisticCard({ title, value, tone, percent }) {
  return (
    <div className={classes.card} data-tone={tone}>
      <div className={classes.cardHead}>
        <span className={classes.dot} />
        <span className={classes.cardTitle}>{title}</span>
        <span className={classes.cardPct}>{Math.round(percent)}%</span>
      </div>
      <div className={`${classes.value} figure`}>
        <NumberFormatter prefix="£" value={value} thousandSeparator />
      </div>
    </div>
  );
}
