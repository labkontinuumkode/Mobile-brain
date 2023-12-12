const prefix = require('../../config/configApi.json').apiPrefix;
const globalController = require('../controller/global/globalController');
    module.exports = function (app) {
     app.post(`${prefix}/create/team`,  globalController.createTeam);
     app.post(`${prefix}/team/info`,  globalController.getTeam);
 
};