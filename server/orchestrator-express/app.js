const express = require('express');
const app = express();
const routes = require('./routes/index')
const port = process.env.PORT || 4000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, function () {
    console.log('running entertainme ' + port);
})


module.exports = app;