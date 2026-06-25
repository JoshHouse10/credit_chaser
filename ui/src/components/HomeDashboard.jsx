import classes from './css/HomeDashboard.module.css';
import HomePageStatisticCardContainer from './HomePageStatisticCardContainer.jsx';
import TableContainer from './TableContainer.jsx';
import {fetchDueInvoicesNext7Days} from '../api/queries.js';

export default function HomeDashboard() {

  return (
      <div className={classes.dashboard}>
          <HomePageStatisticCardContainer/>
          <TableContainer title={'Due this week'} query={fetchDueInvoicesNext7Days}/>
      </div>
  )
}
