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

var PetSchema = new mongoose.Schema({
    name:  { type: String, required: true, minlength: 3 },
    type:   { type: String, required: true, minlength: 3 },
    description:   { type: String, required: true, minlength: 3 },
    skills:   [String],
    likes:    { type: Number, default: 0 }
}, {timestamps: true });

mongoose.model('Pet', PetSchema);
// Retrieve the Schema called 'pet' and store it to the variable User
var Pet = mongoose.model('Pet');

// Routes
// Root Request
app.get('/pets/all', function(req, res) {
    Pet.find({}, function(errs, pets) {
        console.log("get: \"/pets\" ")
        //console.log(qs)
        res.json({'message': "success", pets: pets } );
    });
})

app.get('/pets/:_id', function(req, res) {
    console.log("get: \"/pets/\"", req.params._id)
    console.log("get: \"/pets/\"", req.params)
    Pet.find({'_id' : req.params._id}, function(errs, pets) {
        console.log("get: \"/\" ", req.params._id)
        //console.log(qs)
        res.json({ message : "success", pets: pets  } );
    });
})


// Add Pet Request 
app.post('/pets', function(req, res) {
    console.log("POST DATA", req.body);
    console.log("Looks create pet:")
    var pet   = req.body
    console.log("Create:\n", pet);
    var p = new Pet(pet);
    p.save(function (err) {
        if (err) {
            console.log("We have an error!", err);
            var errMsg = "";
            for(var key in err.errors){
                errMsg += err.errors[key].message;
            }
            res.json({ message : "failed", error: errMsg  } );
        } else {
            res.json({ message : "success"} );
        }
    });
})

app.put('/pets/:_id', function(req, res) {
    console.log("POST DATA", req.body);
    console.log("Looks update pet:")
    var pet   = req.body
    console.log("Update:\n", pet);
    Pet.update({'_id' : req.params._id}, pet, function(errs, pets) {
        console.log("update: \"/\" ", req.params._id)
        if (err) {
            console.log("We have an error!", err);
            var errMsg = "";
            for(var key in err.errors){
                errMsg += err.errors[key].message;
            }
            res.json({ message : "failed", error: errMsg  } );
        } else {
            res.json({ message : "success"} );
        }
    });
    //res.redirect('/pets');
})


// Add User Request 
app.delete('/pets/:_id', function(req, res) {
    console.log("Delete", req.params._id);
    Pet.find({ '_id' : req.params._id}, function(err, pets) {
        console.log("Delete?:", pets );
        if (err) {
            console.log("We have an error!", err);
            var errMsg = "";
            for(var key in err.errors){
                errMsg += err.errors[key].message;
            }
            res.json({ message : "failed", error: errMsg  } );
        } else {
            pet.remove({ '_id' : req.params._id}, function(err, pets) {
                console.log(" == Done!", err);
                res.json({ message : "success"} );
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