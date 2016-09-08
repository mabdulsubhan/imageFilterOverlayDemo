var express = require('express')
var app = express()
var gm = require('gm')
  , imageMagick = gm.subClass({ imageMagick: true });

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res, next) {
  imageMagick('https://pixabay.com/static/uploads/photo/2015/10/01/21/39/background-image-967820_960_720.jpg')
.resize(353, 257)
.autoOrient()
.write(writeStream, function (err) {
  if (!err) console.log(' hooray! ');
});

});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

