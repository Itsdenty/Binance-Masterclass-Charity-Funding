import schedule from 'node-schedule'
import { resetVotesAllowed } from './processors/user';

// schedule.scheduleJob('0 0 * * *', () => resetVotesAllowed());
// const scheduleIt = () => schedule.scheduleJob('*/5 * * * *', () => console.log("schedule ran"));
const scheduleIt = () => schedule.scheduleJob('0 0 * * *', () => resetVotesAllowed());

export default scheduleIt;
