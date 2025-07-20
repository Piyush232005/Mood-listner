const moongoose = require('mongoose');


function connectDB() {
    moongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {         
        console.error('MongoDB connection failed:', error);
    });
}    

module.exports = connectDB;
