const successCode = require("../../util/successCode");
const errorCode = require("../../util/errorCode");
const { createEplService , getTeamData } = require("../../service/teamService")
const url = require('../../../config/configApi.json').PL_APi_Url;
const {fetchData } = require('../../helper/globalHelper');

exports.createTeam = async (req, res) => {
    const data = await fetchData(url);
     try {
        const insertResult = await createEplService(data);
        return res.status(201).send(successCode(true, 'Team Create Success!', insertResult, null));
    } catch (error) {
        console.error("createTeam", error);
        return res.status(500).send(errorCode(false, 'error', 'Internal Server Error', error.message));
    }
};
exports.getTeam = async (req, res) => {
     
    try {
        const insertResult = await getTeamData(req);
        return res.status(200).send(successCode(true, ' Success!', insertResult, null));
    } catch (error) {
        console.error("createTeam", error);
        return res.status(500).send(errorCode(false, 'error', 'Internal Server Error', error.message));
    }
};

 
  // Call the async function
  