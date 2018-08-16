let mysql = require('mysql');
let dbConfig = {
   host : 'localhost',
   user : 'root',
   password : '1qaz2wsX',
   port : 3306,
   multipleStatements : true,
   database : 'moviest'
};

let pool = mysql.createPool(dbConfig);
module.exports = pool;

// pool.getConnection(function(err, conn) {
//    if ( err ) {
//       console.error('Connection Error : ', err);
//       return;
//    }
   
//    let fs = require('fs');
//    let sqls = fs.readFileSync('./initialData.sql', 'utf8');
   
//    conn.query(sqls, function(err, results) {
//       if ( err ) {
//          console.error('Initialdata error : ', err);
//          return;
//       }
//       console.log('Success');      
//    });   
// });