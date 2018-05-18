// Require the Express Module
var express      = require('express');
var bodyParser   = require('body-parser');
var path         = require('path');
var app          = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static( __dirname + '/public/dist/public' ));

var mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "basic_mongoose" is the name of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/basic_mongoose');

var TaskSchema = new mongoose.Schema({
    title:  { type: String, required: true, minlength: 1 },
    description:   { type: String, required: true, minlength: 1 },
    boolean:    { type: Boolean, default: false }
}, {timestamps: true });

mongoose.model('Task', TaskSchema);
// Retrieve the Schema called 'Task' and store it to the variable User
var Task = mongoose.model('Task');

// Routes
// Root Request
app.get('/tasks', function(req, res) {
    Task.find({}, function(errs, tasks) {
        console.log("get: \"/tasks\" ")
        //console.log(qs)
        res.json({'message': "success", tasks: tasks } );
    });
})

app.get('/tasks/:_id', function(req, res) {
    console.log("get: \"/tasks/\"", req.params._id)
    console.log("get: \"/tasks/\"", req.params)
    Task.find({'_id' : req.params._id}, function(errs, tasks) {
        console.log("get: \"/\" ", req.params._id)
        //console.log(qs)
        res.json({ message : "success", tasks: tasks  } );
    });
})


// Add User Request 
app.post('/tasks', function(req, res) {
    console.log("POST DATA", req.body);
    console.log("Looks create task:")
    var task   = req.body
    console.log("Create:\n", task);
    var t = new Task(task);
    t.save(function (err) {
        if (err) {
            console.log("We have an error!", err);
        }
    });
    res.redirect('/tasks');
})

app.put('/tasks/:_id', function(req, res) {
    console.log("POST DATA", req.body);
    console.log("Looks create task:")
    var task   = req.body
    console.log("Update:\n", task);
    Task.update({'_id' : req.params._id}, task, function(errs, tasks) {
        console.log("update: \"/\" ", req.params._id)
        //console.log(qs)
        res.json({ message : "success", tasks: tasks  } );
    });
    //res.redirect('/tasks');
})


// Add User Request 
app.delete('/tasks/:_id', function(req, res) {
    console.log("Delete", req.params._id);
    Task.find({ '_id' : req.params._id}, function(err, tasks) {
        console.log("Delete?:", tasks );
        if (err) {
            console.log("We have an error!", err);
            for(var key in err.errors){
                req.flash('error', err.errors[key].message);
            }
            res.json({ message : "failed", tasks: tasks  } );
        } else {
            Task.remove({ '_id' : req.params._id}, function(err, tasks) {
                console.log(" == Done!", err);
                res.json({ message : "success", tasks: tasks  } );
            }); 
        } 
    });
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})