const express = require('express');
const Movie = require('./movieModel');
const router = express.Router();

router.get('/movies', showMovieList);
router.post('/movies', addMovie);
router.delete('/movies/:movieId', deleteMovie);
router.get('/movies/:movieId', showMovieDetail);
router.put('/movies/:movieId', editMovie);
router.post('/movies/:movieId', addReview);

function addReview(req, res, next) {
   let movieId = req.params.movieId;
   let review = req.body.review;
   
   Movie.findById(movieId, function(err, doc) {
      if ( err ) {
         err.code = 500;
         return next(err);
      }  
      
      doc.addReviewM(review).then(function fulfilled(result) {
         res.send({msg:'success', result:result});
      }, function rejected(err) {
         err.code = 500;
         next(err);
      });  
      
      // Normar way
      // doc.reviews.push(review);
      // doc.save().then(function fulfilled(result){
      //    res.send({msg:'success', result:result});
      // }, function rejected(err) {
      //    err.code = 500;
      //    next(err);
      // });        
   });
}

function editMovie(req, res, next) {
   let movieId = req.params.movieId;
   let title = req.body.title;
   let director = req.body.director;
   let year = parseInt(req.body.year);
   
   Movie.findById(movieId, function(err, doc) {
      if ( err ) {
         err.code = 500;
         return next(err);
      }      
      
      if ( title )      
         doc.title = title;
      if ( director )
         doc.director = director;
      if ( year )
         doc.year = year;
      
      doc.save().then(function fulfilled(result){
         res.send({msg:'success', result:result});
      }, function rejected(err) {
         err.code = 500;
         next(err);
      });      
   });
}


function deleteMovie(req, res, next) {
   let movieId = req.params.movieId;
   Movie.findOneAndRemove({_id:movieId}).then(function fulfilled(result){
      res.send({msg:'success', result:result});
   }, function rejected(err) {
      err.code = 500;
      next(err);       
   });
}


function addMovie(req, res, next) {
   let title = req.body.title;
   let director = req.body.director;
   let year = parseInt(req.body.year);
   let reviews = req.body.reviews;
   
   let movie = new Movie({title:title, director:director, year:year, reviews:reviews});
   movie.save().then(function fulfilled(result){
      console.log(result);
      res.send({msg:'success', id:result._id});
   }, (err) => {
      err.code = 500;
      next(err);      
   });
}

function showMovieList(req, res, next) {
   Movie.find({},{_id:1, title:1}).then((docs) => {
      console.log('Succes : ');
      let result = {
         count : docs.length,
         data : docs
      };
      res.send(result);
   }, (err) => {
      err.code = 500;
      next(err);
   });
}

function showMovieDetail(req, res, next) {
   let movieId = req.params.movieId;
   Movie.findById(movieId).exec(function(err, doc) {
      if ( err ) {
         err.code = 500;
         return next(err);
      }
      res.send(doc);
   });
}


module.exports = router;