require('dotenv').config();

const app = require('./src/app');
const connectDB = require('./src/db/db');

connectDB();
// Start the server after connecting to the database

app.listen(3000, () => {
  console.log('Server is running on port 3000');
}); 
