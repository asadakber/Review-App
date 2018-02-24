var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');

mongoose.connect('mongodb://review:review@ds044907.mlab.com:44907/reviews');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}))
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api + json'}));
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

 // Models
 var Review = mongoose.model('Review', {
     title: String,
     description: String,
     rating: Number
 })

 // Routes
 app.get('/api/reviews', function(req, res) {
    console.log("fetching reviews");
    Review.find(function(err, reviews) {
        if (err)
            res.send(err)

        res.json(reviews);
    });
});

app.post('/api/reviews', function(req, res) {
    console.log('creating review');

    Review.create({
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        done: false
    }, function(err, review){
        if(err)
            res.send(err);
        review.find(function(err, review){
            if(err)
                res.send(err)
                res.json(reviewa);
        })
    })
})

app.delete('/api/reviews/:review_id', function(req, res) {
    Review.remove({
        _id: req.params.review_id
    }, function(err, review) {

    })
})

app.listen(8080);
console.log("App listening on port 8080")