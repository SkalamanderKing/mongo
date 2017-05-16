const express = require('express');
const socket = require('socket.io');
let app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const port = process.env.PORT || 4000;
const logger = require('morgan');

//Pug files stored in a folder
app.set('view engine', 'pug');

//use stuff from folder: client js and css
app.use('/public', express.static('public'));

app.use(logger('tiny'));

//render pug stuff
app.get('/', (req, res) => {
	res.render('index')
});

app.listen(port, ()=>{
console.log("hej");
});