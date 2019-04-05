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

// Get all data
app.get("/users", async (req, res) => {

  try {
    const users = await User.find({}); // mongoose documentation: Queries > Model.find(), result: array of users
    res.status(200).send(users); // send array of users
  } catch (e) {
    res.status(500).send(e); //status: internal server error
  }
});

// Read one data by user ID
app.get('/users/:id', async (req, res) => {
    const _id = req.params.id // destruct id

    try {
        const user = await User.findById(_id) // mongoose: Model.findById(id), result: found user

        if (!user) { // it will be empty if not found
            return res.send(404).send() // send error 404
        }

        res.status(200).send(user) // send the found user
    } catch (e) {
        res.status(500).send() //status: internal server error
    }

})

// Add one user
app.post('/users', async (req, res) => { 
    const user = new User(req.body) // get body from client

    try {
        const rez = await user.save() // mongoose: save() , result = inserted user
        res.status(201).send(rez) // res will be inserted user
    } catch (e) {
        res.status(400).send(e) //  status: Bad Request
    }
})

// Delete user data by id
app.delete('/users/:id', async (req, res) => { 
    try {
        const user = await User.findByIdAndDelete(req.params.id) // find user by id. then delete if exist

         if(!user){ //  check if the user found
            return res.status(404).send({err: "User not found"}) // user not found, will be null
        }

         res.status(200).send(user) // if exist, send deleted user
    } catch (e) {
        res.status(500).send(e) // internal bad happen
    }
})

// Update user by id
app.patch('/users/:id', async (req, res) => { 
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age'] // menentukan field apa yang boleh diganti oleh user
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    // Method every: Will test every data in array, if all of it can give return of true, isValidOperations will be true.
    // If there is atleast one false, isValidOperation will be false

    if (!isValidOperation) {
        return res.status(400).send({ err: "Invalid request!" })
    }

    try {
        // findByIdAndUpdate passing mongoose save() function, we need refactor it
        const user = await User.findById(req.params.id)

        updates.forEach(update => user[update] = req.body[update]) // updating given field in req body
        await user.save()

        if (!user) { // user not found, cause const user is empty
            return res.status(404).send({ err: "User not found" })
        }

        res.status(200).send(user) // send updated user
    } catch (e) {
        res.status(400).send({
            whatYouSend: req.body,
            err: e.message
        }) // bad request
        // if err with validations, it would send Error object from validation model's schema
    }
})








// TASK
app.get('/tasks', async (req, res) => { // Find all tasks

    try {
        const tasks = await Task.find({}) // find all tasks
        res.status(200).send(tasks) // tasks: array of tasks
    } catch (e) {
        res.status(500).send() // internal server error
    }

})

app.get('/tasks/:id', async (req, res) => { // get one task by id
    const _id = req.params.id // path  variable

    try {
        const task = await Task.findById(_id)  // find task by id

        if (!task) { // task not found
            return res.status(404).send({ err: "Task not found" }) // send error 404
        }

        res.status(200).send(task) // send found task
    } catch (e) {
        res.status(500).send() // internal server error
    }

})

app.post("/tasks", async (req, res) => { // add one user
    const task = new Task(req.body); // get body from client

    try {
        const rez = await task.save(); // mongoose: save(), result: inserted task
        res.status(201).send(rez); // status: Created success
    } catch (e) {
        res.status(400).send(e); // status: Bad Request
    }

});

app.patch('/tasks/:id', async (req, res) => { // update task by id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    // every will test every data in array, if all of it can give return of true, isValidOperations will be true
    // if there is atleast one false, isValidOperation will be false

    if (!isValidOperation) {
        return res.status(400).send({ err: "Invalid request!" })
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        // new : give updated task, runValidator: run validator based on models schema
        // if 'req.body' empty, task will be found task
        const task = await Task.findById(req.params.id)

        updates.forEach(update => task[update] = req.body[update])
        await task.save()

        if (!task) { // task not found, cause const task is empty
            return res.status(404).send({ err: "Task not found!" })
        }

        res.status(200).send(task) // send updated task
    } catch (e) {
        res.status(400).send({
            whatYouSend: req.body,
            err: e.message
        }) // bad request
        // if err with validations, it would send Error object from validation model's schema
    }
})

app.delete('/tasks/:id', async (req, res) => { // delete one task
    try {
        const task = await Task.findByIdAndDelete(req.params.id) // find task by id

        if (!task) { // check if the task is found
            return res.status(404).send({ err: "Task not found!" }) // user not found, null
        }

        res.status(200).send(task) // send the deleted task
    } catch (e) {
        res.status(500).send(e) // internal problem some what
    }
})


// running API
app.listen(port, () => {
    console.log('API is running on port ' + port);
});
