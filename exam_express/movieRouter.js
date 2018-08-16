const express = require('express');
const router = express.Router();

const fs = require('fs');
const initialData = fs.readFileSync('initialDB.json');
const movieList = JSON.parse(initialData);

router.get('/movies', showMovieList);
router.get('/movies/:movieId', showMovieDetail);
router.post('/movies/:movieId', addReview);

function addReview(req, res, next){
    let movieId = req.params.movieId;
    let movie = findMovie(movieId);

    if (!movie){
        let error = new Error('Not Found');
        error.code = 404;
        return next(error);

    }

    let review = req.body.review;
    movie.review.push(review);
    res.redirect('/movies/' + movieId);
}

function findMovie(movieId) {
    for(let i = 0 ; i < movieList.length; i++) {
       let item = movieList[i];
       if ( item.movieId == movieId ) {
          return item;
       }
    }   
    return null;
 }

 function showMovieDetail(req, res, next) {
    let movieId = req.params.movieId;
    let movie = findMovie(movieId);
 
    if ( ! movie ) {
       let error = new Error('Not Found');
       error.code = 404;
       return next(error);
    }
    
    //res.send(movie);
    res.render('movieDetail', {movie:movie} );  
 }

 function showMovieList(req, res) {
    let data = [];
    movieList.forEach(function(movie) {
       let info = {
          movieId : movie.movieId,
          title : movie.title
       };
       data.push(info);
    });
    let result = {
       count : data.length,
       data : data
    };
    // res.send(result);
    res.render('movieList', result);
 }

 module.exports = router;