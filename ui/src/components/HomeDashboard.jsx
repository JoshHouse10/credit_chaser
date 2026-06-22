import classes from './css/HomeDashboard.module.css';
import HomePageStatisticCardContainer from './HomePageStatisticCardContainer.jsx';
import TableContainer from './TableContainer.jsx';

export default function HomeDashboard() {

  return (
      <div className={classes.dashboard}>
          <HomePageStatisticCardContainer/>
          <TableContainer title={'Due this week'}/>
      </div>
  )
}
