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
    Pet.find({}).sort({type: 'ascending'}).exec(function(errs, pets) {
        console.log("get: \"/pets/all\" ")
        //console.log(qs)
        res.json({'message': "success", pets: pets } );
    });
})

app.get('/pets/get/:_id', function(req, res) {
    console.log("get: \"/pets/get/", req.params._id,"\"", req.params)
    Pet.find({'_id' : req.params._id}, function(errs, pet) {
        console.log(pet)
        res.json({ message : "success", pet: pet  } );
    });
})


// Add Pet Request 
app.post('/pets/new', function(req, res) {
    var pet   = req.body
    console.log("Create Pet:\n", pet);
    Pet.find({ 'name' : pet.name}, function(err, pets) {
        if (err) {
            console.log("We have an error!", err);
            var errMsg = "";
            for(var key in err.errors){
                errMsg += err.errors[key].message;
            }
            res.json({ message : "failed", error: errMsg  } );
        } else {
            console.log("PETS:", pets)
            if (pets.length >= 1) {
                res.json({ message : "failed", error: "Pet with that name exists"  } );                
            } else {
                var p = new Pet(pet);
                p.save(function (err) {
                    if (err) {
                        console.log("We have an error!", err);
                        var errMsg = "";
                        for(var key in err.errors){
                            errMsg += "ERROR: " + key + " must be 3 characters or longer\n";
                        }
                        res.json({ message : "failed", error: errMsg  } );
                    } else {
                        res.json({ message : "success"} );
                    }
                });
            }
        }
    })
})

// update Pets
app.put('/pets/:_id', function(req, res) {
    console.log("PUT DATA", req.body);
    console.log("Looks update pet:")
    var pet   = req.body
    console.log("Update:\n", pet);
    Pet.update({'_id' : req.params._id}, pet,  { runValidators: true }, function(err, pets) {
        console.log("update: \"/\" ", req.params._id);
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


// Delete(Adopt) Pet Request 
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
            Pet.remove({ '_id' : req.params._id}, function(err, pets) {
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