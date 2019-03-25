var express = require('express');
var path =require('path');
var logger = require('morgan');
var bodyparser = require('body-parser');
var neo4j =require('neo4j-driver').v1;



var app = express();



app.set('views',path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


var driver = neo4j.driver('bolt://localhost',neo4j.auth.basic('....','.......'));
var session =driver.session();

app.get('/', function(req,res){
    session
        .run('MATCH (p:P) RETURN p LIMIT 40')
        .then(function(result){
            var packagearr = [];
            result.records.forEach(function(record){
                packagearr.push({
                    name: record._fields[0].properties.n
/*                  method: record._fields[0].properties.M,
                    value: record._fields[0].properties.V,
                    argument:record._fields[0].properties.A
*/
});
            });
        
        
        
        
        
        res.render('index', {
            package:  packagearr
        });
    })
        .catch(function(err){
        console.log(err);
    });
});


app.listen(3000);
console.log('at begin');


module.exports = app;
