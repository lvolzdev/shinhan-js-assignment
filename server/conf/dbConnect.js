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
        throw new Error('DB Connection Failed');
    }
}

export { dbConnect };