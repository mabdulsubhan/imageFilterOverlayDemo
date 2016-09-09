var express = require('express');
var app = express();
var gm = require('gm')
, imageMagick = gm.subClass({ imageMagick: true });
var bodyParser = require('body-parser');
var multer  = require('multer')
var upload = multer({ dest: 'images/' })
var open = require('open');

var path = require('path'),
    fs = require('fs');

var express = require('express');
var fs = require('fs');
var app = express();


var http = require('http');

// Upload
app.post('/upload', upload.single('theFile'), function (req, res) {
	console.log("uploading");
		    res.set("done");
		    var fileName = 'images/' + Date.now() + '.jpg';
		    fs.rename(req.file.path, fileName);

	var size = {width: 800, height: 800};
	gm(fileName)
	.resize(size.width, size.height )
	.gravity('Center')
	.extent(size.width, size.height)
	.write(fileName, function (error) {
		if (error) console.log('Error - ', error);
		else
		{

			gm()
			.command("composite") 
			.resize(800, 800)
			.in("-gravity", "center")
			.in('images/pic1.png')
			.in(fileName)
			.write(fileName, function (err) {
				if (!err) {
					console.log(' hooray! '); // "http://proquestdp.herokuapp.com/"+"fileName"
					res.send("http://proquestdp.herokuapp.com/"+fileName)
				}
				else
					console.log(err);
			});
		}
	});


});



app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index');
});

app.get('/image.png', function (req, res) {
    res.sendfile(path.resolve('./uploads/pic1.png'));
}); 

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});

app.get('/magic', function(req, res){
	console.log("magic");
	res.send("aaa");

	var size = {width: 800, height: 800};
	gm('/Users/johnson3004luu/Desktop/proquestdp/images/pic2B.jpg')
	.resize(size.width, size.height )
	.gravity('Center')
	.extent(size.width, size.height)
	.write('/Users/johnson3004luu/Desktop/proquestdp/images/pic2.jpg', function (error) {
		if (error) console.log('Error - ', error);
		else
		{

			gm()
			.command("composite") 
			.resize(800, 800)
			.in("-gravity", "center")
			.in('/Users/johnson3004luu/Desktop/proquestdp/images/pic1.png')
			.in('/Users/johnson3004luu/Desktop/proquestdp/images/pic2.jpg')
			.write('/Users/johnson3004luu/Desktop/proquestdp/images/pic3.jpg', function (err) {
				if (!err) 
					console.log(' hooray! ');
				else
					console.log(err);
			});
		}
	});

});


