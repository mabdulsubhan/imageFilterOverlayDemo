var express = require('express')
var app = express()
var gm = require('gm')
  , imageMagick = gm.subClass({ imageMagick: true });

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res, next) {
  imageMagick('https://pixabay.com/static/uploads/photo/2015/10/01/21/39/background-image-967820_960_720.jpg')
  .autoOrient()
  .flip()
  .stream('png', function (err, stdout) {
    if (err) return next(err);
    res.setHeader('Expires', new Date(Date.now() + 604800000));
    res.setHeader('Content-Type', 'image/png');
    stdout.pipe(res);
  });
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

