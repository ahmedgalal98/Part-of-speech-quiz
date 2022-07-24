const express = require('express');
const app = express();
const CORS = require('cors');

//import routers
const wordRouter = require('./routes/word');

// Enable CORS
app.use(CORS());

// Body parser
app.use(express.json());

//http://localhost:5000/word/getRandomWords
//mounting routers
app.use('/word', wordRouter);

const Port = 5000;
app.listen(Port, () => {
  console.log(`App  on port ${Port} on  mode`);
});
