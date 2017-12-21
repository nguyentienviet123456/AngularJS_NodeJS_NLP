const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const api = require('./server/routes/api');

//port number
//const port = 3000;
const app = express();

//cors middleware

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: false}));

//body parser middleware
app.use(bodyParser.json());
// passport middleware
//route
app.use('/api', api);
//index route
app.get('*',(req,res) => {
    res.sendFile(path.join(__dirname, 'dist/views/index.html'));
});
// start server
/* app.listen(port, function(){
    console.log("server running on localhost:" +port);
}); */
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
