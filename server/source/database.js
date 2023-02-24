const mongoose = require('mongoose');
require('dotenv').config();

const user = process.env.USER || 'user';
const pass = process.env.PASS || 'password';
const host = process.env.HOST || 'host';
const port = process.env.PORT || 12345;

console.log(user);

mongoose.set("strictQuery", false);
mongoose.connect(`mongodb://${user}:${pass}@${host}:${port}/mean-users?authSource=${user}`, {  
    useUnifiedTopology: true,
    //useNewUrlParser: true 
})
    .then((db) => console.log('DB is connected'))
    .catch((err) => console.error('Not connected',err));