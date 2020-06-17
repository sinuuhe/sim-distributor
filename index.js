let express = require('express');

let app = express();

let cors = require('cors')

app.use(cors())

//import roputes
let apiRoutes = require('./api-routes');

let bodyParser = require('body-parser');

let mongoose = require('mongoose');

const config = require('./config');
//configure body oarser to handle post request

app.use(bodyParser.json());

//conect to mongoosde and set conection variable

mongoose.connect(config.config.databaseUriDev, { useNewUrlParser: true, useUnifiedTopology: true }); 

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected')
})

mongoose.connection.on('error', (error) => {
    console.log('errorsaso!!!!', error)
})

app.use('/api', apiRoutes);

var port = process.env.PORT || 8181;

app.get('/',(req, res) => res.send('Morisqueta is running'));

app.listen(port,() => {
    console.log("Runing morisqueta on port " + port);
})