const leagueModel = require('../model/league');
 async function createEplService(data) {
    try {
       const result = await leagueModel.insertMany(data);
        return result
    } catch (error) {
        console.error('Error in createEplService:', error.message);
        throw new Error(error);
    }
}
async function getTeamData(req) {
     const teamName =req.body.team_name;
     let result;

    try {
         if(teamName){
            result = await leagueModel.find({ team_name: new RegExp(teamName, 'i') })
         }
         else{
            result = await leagueModel.find({});
         }
         
      return result
    } catch (error) {
        console.error('Error in getTeamData:', error.message);
       throw new Error(error);
    }
}
 
module.exports = { createEplService , getTeamData };
