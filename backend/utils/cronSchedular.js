import { updateContestData } from '../services/codeforcesService.js';

function is3AM() {
  const now = new Date();
  return now.getHours() === 3 && now.getMinutes() === 0;
}

let lastCronRunDate = '';

export const startCronScheduler = () => {
  setInterval(() => {
    if (!is3AM()) return;

    const today = new Date().toDateString();
    if (lastCronRunDate === today) return;

    lastCronRunDate = today;
    console.log("It's 3 AM! Starting scheduled contest data update...");
    updateContestData();
  }, 60_000);
};
