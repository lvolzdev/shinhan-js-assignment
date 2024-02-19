const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const dbConf = {
    username: process.env.USER_NAME,
    password: process.env.PASSWORD,
    cluster: process.env.CLUSTER,
    getMongoURL: function () {
        return `mongodb+srv://${this.username}:${this.password}@${this.cluster}/`;
    },
};

const dbConnect = async () => {
    try {
        await mongoose.connect(
            dbConf.getMongoURL(), {
                retryWrites: true,
                w: 'majority',
            }
        );
    } catch(err) {
        console.error('DB Connection Failed:', err);
    }
}

module.exports = { dbConnect };