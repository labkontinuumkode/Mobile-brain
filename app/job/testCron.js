const cron = require('cron');
const {fetchData } = require('../helper/globalHelper');
const leagueModel = require('../model/league');
async function updateDatabase() {
    try {
    
        const teamsData = await fetchData();
         for (const team of teamsData) {
            const existingTeam = await leagueModel.findOne({ team_name: team.team_name });
                    console.log(existingTeam);
            if (existingTeam) {
                // Team exists, update the information
                await leagueModel.updateOne({ team_name: team.team_name }, { $set: team });
            } else {
                 await leagueModel.create(team);
            }
        }
        console.log('Database updated successfully.');
    } catch (error) {
        console.error('Error updating database:', error.message);
    }
}

function insertOrUpdateTeamCron() {
    console.log("cron start-------------------------------");

    // Run the updateDatabase function every day at 12:57 AM
   // const dailyJob = new cron.CronJob('57 0 * * *', updateDatabase, null, true);
    const dailyJob = new cron.CronJob('*/40 * * * *', updateDatabase, null, true);
    dailyJob.start();
}
module.exports = {
    insertOrUpdateTeamCron,
};