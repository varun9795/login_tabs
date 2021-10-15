require('dotenv').config();

const usersData = require("./data/user");
const connectDb = require("./config/database");
const user = require('./models/userModel');

connectDb();

const importData = async () => {
    try {
        await user.deleteMany({});
        await user.insertMany(usersData);

        console.log("Data Import Sucess");
        process.exit();
    }
    catch (error) {
        console.error("Error with data");
        process.exit(1);
    }
}
importData();