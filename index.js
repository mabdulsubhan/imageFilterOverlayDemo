var express = require('express');
var app = express();
var gm = require('gm')
, imageMagick = gm.subClass({ imageMagick: true });
var bodyParser = require('body-parser');

var path = require('path'),
    fs = require('fs');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser({uploadDir:__dirname + '/images'}));

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


// Upload
app.get('/upload', function (req, res) {
	console.log("uploading");
    var tempPath = req.files.file.path,
        targetPath = path.resolve('./uploads/image.jpg');
    if (path.extname(req.files.file.name).toLowerCase() === '.jpg') {
        fs.rename(tempPath, targetPath, function(err) {
            if (err) throw err;
            console.log("Upload completed!");
        });
    } else {
        fs.unlink(tempPath, function () {
            if (err) throw err;
            console.error("Only .jpg files are allowed!");
        });
    }
    // ...
});

});


