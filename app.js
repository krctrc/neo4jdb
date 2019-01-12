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


var driver = neo4j.driver('bolt://localhost',neo4j.auth.basic('neo4j','kra06kra'));
var session =driver.session();

app.get('/', function(req,res){
    session
        .run('MATCH (p:Package) RETURN p LIMIT 40')
        .then(function(result){
            var packagearr = [];
            result.records.forEach(function(record){
                packagearr.push({
                    name: record._fields[0].properties.name
/*                  method: record._fields[0].properties.MethodId,
                    value: record._fields[0].properties.ValueId,
                    argument:record._fields[0].properties.ArgumentId
*/
});
            });
        
        
        
        
        
        res.render('index', {
            package:  packageearr
        });
    })
        .catch(function(err){
        console.log(err);
    });
});


app.listen(3000);
console.log('at begin');


module.exports = app;