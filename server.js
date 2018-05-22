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

var ReviewSchema = new mongoose.Schema({
    movie:       { type: String },
    username:    { type: String, required: true, minlength: [3, "must be atleast 3 characters"] },
    rating:      { type: Number, min: [1 , "Must be atleast 1 star"], 
                                 max: [5 , "Must be 5 or less stars"]},
    review:      { type: String, required: true, minlength: [3, 'must be atleast 3 characters'] }
}, {timestamps: true });

var MovieSchema = new mongoose.Schema({
    title:       { type: String, required: true, minlength: [3, 'must be atleast 3 characters'] },
    avgRating:   { type: Number },
    reviews:     [ReviewSchema]
}, {timestamps: true });


mongoose.model('Movie', MovieSchema);
// Retrieve the Schema called 'Movie' and store it to the variable User
var Movie = mongoose.model('Movie');

// Routes
// Root Request
app.get('/', function(req, res) {
    console.log("get: \"/\" ");
    res.redirect('/movies');
})

app.get('/moovies', function(req, res) {
    console.log("get: \"/moovies\" ");
    Movie.find({}, function(errs, movies) {
        res.json({'message': "success", movies: movies } );
    });
})

app.get('/moovies/:_id', function(req, res) {
    console.log("get: \"/moovies/\"", req.params._id,"\"", req.params)
    Movie.find({'_id' : req.params._id}, function(errs, movies) {
        console.log("get: \"/\" ", req.params._id)
        res.json({ message : "success", movies: movies  } );
    });
})


// Add User Request 
app.post('/moovies/new', function(req, res) {
    var movie   = req.body;
    console.log("Create Movie:\n", movie);
    Movie.find({ 'title' : movie.title}, function(err, movies) {
        if (err) {
            console.log("We have an error!", err);
            var errMsg = "";
            for(var key in err.errors){
                errMsg += err.errors[key].message;
            }
            res.json({ message : "failed", error: errMsg  } );
        } else {
            console.log("MOVIES:", movies)
            if (movies.length >= 1) {
                res.json({ message : "failed", error: "Movie with that name exists"  } );                
            } else {
                var p = new Movie(movie);
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

app.put('/moovies/:_id', function(req, res) {
    console.log("POST DATA", req.body);
    console.log("Looks adding a review to a movie:")
    var movie   = req.body
    console.log("Update:\n", movie);
    Movie.update({'_id' : req.params._id}, movie,  { runValidators: true }, function(errs, movies) {
        console.log("update: \"/\" ", req.params._id)
        if (errs) {
            console.log("We have an error!", errs);
            var errMsg = "";
            for(var key in errs.errors){
                errMsg += "ERROR: " + key + " must be 3 characters or longer\n";
            }
            res.json({ message : "failed", error: errMsg  } );
        } else {
            res.json({ message : "success"} );
        }
    });
    //res.redirect('/movies');
})


// Add User Request 
app.delete('/moovies/:_id', function(req, res) {
    console.log("Delete", req.params._id);
    Movie.find({ '_id' : req.params._id}, function(err, movies) {
        console.log("Delete?:", movies );
        if (err) {
            console.log("We have an error!", err);
            for(var key in err.errors){
                req.flash('error', err.errors[key].message);
            }
            res.json({ message : "failed", movies: movies  } );
        } else {
            Movie.remove({ '_id' : req.params._id}, function(err, movies) {
                console.log(" == Done!", err);
                res.json({ message : "success", movies: movies  } );
            }); 
        } 
    });
})

// Add User Request 
app.delete('/moovies/:_id/review/:_rid', function(req, res) {
    console.log("Delete review ", req.params._id, "/", req.params._rid);
    Movie.find({ '_id' : req.params._id}, function(err, movies) {
        console.log("Delete?:", movies );
        if (err) {
            console.log("We have an error!", err);
            for(var key in err.errors){
                req.flash('error', err.errors[key].message);
            }
            res.json({ message : "failed", movies: movies  } );
        } else {            
            console.log("----here 1----")
            movies[0].reviews.id(req.params._rid).remove();
            console.log("----here 2----")
            movies[0].save(function(err, movies) {
                console.log(" == Done!", err);
                res.json({ message : "success", movies: movies  } );
            }); 
        } 
    });
})

app.all("*", (req,res,next) => {
    console.log("request: ================================");
    res.sendFile(path.resolve("./public/dist/public/index.html"))
  });

// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000__");
})