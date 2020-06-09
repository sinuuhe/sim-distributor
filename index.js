let express = require('express');

let app = express();

let cors = require('cors')

app.use(cors())

//import roputes
let apiRoutes = require('./api-routes');

let bodyParser = require('body-parser');

let mongoose = require('mongoose');

//configure body oarser to handle post request

app.use(bodyParser.json());

//conect to mongoosde and set conection variable
mongoose.connect('mongodb://localhost/sim-distributor', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

app.use('/api', apiRoutes);

var port = process.env.PORT || 8181;

app.get('/',(req, res) => res.send('Morisqueta is running'));

app.listen(port,() => {
    console.log("Runing morisqueta on port " + port);
})