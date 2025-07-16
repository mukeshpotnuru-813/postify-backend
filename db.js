const mongoose = require('mongoose') // to import mongoose library into a variable named "mongoose".
// by default node will use common js. so we use above method to import a library.

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL,{    //process.env is used to access .env file and .MONGODB_URL IS USED TO access variable MONGODB_URL.
            useNewUrlParser:true,
            useUnifiedTopology:true
            // above 2 lines are optional but used to parse the url in mongodb.(to unterstand the url by mongodb)
        })
        console.log('MongoDb connected');
    }
    catch (error){
        console.log('Unable to connect DataBase');

    }
}

module.exports = connectDB; //to export the above piece of code.