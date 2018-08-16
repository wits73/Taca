const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/Moviest';
mongoose.connect(url, { useNewUrlParser: true });
const conn = mongoose.connection;

conn.on('error', (err) => {
   console.error('Error : ', err);
});

conn.on('open', () => {
   console.log('Connect');
});

const MovieSchema = mongoose.Schema({
   title : String,
   director : String,
   year : Number,
   reviews : [String]
});

// Define methods for Schema
MovieSchema.methods.addReviewM = function(review) {
   this.reviews.push(review);
   return this.save();
}

const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;
// data initiallizing with Model
// var movie1 = new Movie({title:'인터스텔라', director:'크리스노퍼 놀란', year:2014});
// movie1.save(function(err, result, rows) {
//    if ( err ) {
//       console.error('Error : ', err);      
//    }
//    else {
//       console.log('Success');
//    }
// });

// data initiallizing with create with promise
// Movie.create({title:'아바타', director:'제임스 카메론', year:2010}).then(function fulfilled(result){
//    console.log('Success : ', result);
// }, function rejected(err) {
//    console.error('Error : ', err);
// });


// data initiallizing with create with callback
// Movie.create({title:'스타워즈', director:'조지 루카스', year:1977}, function(err, result) {
//    if ( err ) {
//       console.error('Error : ', err);
//    }
//    else {
//       console.log('Success : ', result);
//    }
// });