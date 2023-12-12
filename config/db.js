
const mongoose = require('mongoose');
require('dotenv').config();
async function connect() {
    try {
        const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_CLUSTER, MONGODB_DBNAME } = process.env;

        mongoose.connect(
            `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_CLUSTER}/${MONGODB_DBNAME}?retryWrites=true&w=majority`, 
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            }
            
          );
          console.log("db connection success");
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        throw error;
    }
}
module.exports = connect;



