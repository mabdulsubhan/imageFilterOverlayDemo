var express = require('express');
var app = express();
var gm = require('gm')
  , imageMagick = gm.subClass({ imageMagick: true });


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/magic', function(req, res){
    console.log("magic");
    res.send("aaa");

    // gm composite -gravity center change_image_url base_image_url

gm()
.command("composite") 
.in("-gravity", "center")
.in('/images/pic1.jpg')
.in('/images/pic2.jpg')
.write('/images/pic3.jpg', function (err) {
  if (!err) 
    console.log(' hooray! ');
  else
    console.log(err);
});

});


