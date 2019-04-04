const express = require ('express'); // serve request and give response
const mongoose = require ('mongoose'); // access database mongodb

const User = require('./models/user')
const Task = require('./models/task')

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/jcmongoose',{
    useNewUrlParser: true, // parsing url
    useCreateIndex: true // auto create id
})

const app = express()
const port = 2020
app.use(express.json()) // bodyParser.json()

app.get('/users')












// running API
app.listen(port, () => {
    console.log('API is running on port ' + port);
});
