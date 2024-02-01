var express = require('express');
var cors = require('cors');
var connection = require('./modules/database');
var personasRouter = require('./routers/personas-router');

var app = express();
app.use(express.json());
app.use(cors());
app.use('/personas', personasRouter(connection));

app.listen(8888, () => {
    console.log('Servidor del backend levantado en 8888');
});
