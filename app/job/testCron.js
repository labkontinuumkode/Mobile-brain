const cron = require('cron');
const {fetchData } = require('../helper/globalHelper');
const leagueModel = require('../model/league');
const url = require('../../config/configApi.json').PL_APi_Url;

async function updateOrInsertTeam() {
    try {
        const teamsData = await fetchData(url);
        console.log(teamsData)
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
     } catch (error) {
        console.error('Error updating database:', error.message);
    }
}

async function insertOrUpdateTeamCron() {
    console.log("cron start-------------------------------");
    // Run the updateDatabase function every day at 12:57 AM
    const dailyJob = new cron.CronJob('0 0 * * *',  updateOrInsertTeam, null, true);
   console.log("update orinser in every 2 min for testing " )
   dailyJob.start();
}
module.exports = {
    insertOrUpdateTeamCron,
};