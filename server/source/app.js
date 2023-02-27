const express = require('express');
const morgan = require('morgan');//middleware
const cors = require('cors');

const app = express();

// app.set('PORT', process.env.PORT || 4000)
app.set('PORT', 4000)

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended:false}))

app.use('/api/users', require('./routes/users.routes'))

module.exports = app;