const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    try {
        await mongoose.connect(
            process.env.MONGOOSE_URL,
            {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }
        );
    } catch(err) {
        console.error('DB Connection Failed:', err);
    }
}

module.exports = { dbConnect };