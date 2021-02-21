const express = require('express');
const app = express();
const routes = require('./routes/index')
const port = process.env.PORT || 3000
const { connect } = require('./config/mongoDb')
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes);

connect().then(async (db) => {
    console.log('mongoDb connected');
    app.listen(port, function() {
    console.log('running' + port);
    })    
})


module.exports = app;