var express = require('express');
var app = express();
const path = require('path');
const formidable = require('formidable');
const fs = require('fs');

module.exports = function upload_file(req, res, next){
  if(req.method == "POST") {
     // create an incoming form object
     var form = new formidable.IncomingForm();
     // specify that we want to allow the user to upload multiple files in a single request
     form.multiples = true;
     // store all uploads in the /uploads directory
     form.uploadDir = path.basename(path.dirname('/uploads/json_files/'))
     // every time a file has been uploaded successfully,
     // rename it to it's orignal name
     form.on('file', function(field, file) {
       fs.rename(file.path, path.join(form.uploadDir, file.name), function(err){
           if (err) throw err;
           //console.log('renamed complete: '+file.name);
           const file_path = '/uploads/'+file.name
       });
     });
     // log any errors that occur
     form.on('error', function(err) {
         console.log('An error has occured: \n' + err);
     });
     // once all the files have been uploaded, send a response to the client
     form.on('end', function() {
          //res.end('success');
          res.statusMessage = "All files uploaded";
          res.statusCode = 200;
          res.redirect('/users')
          res.end()
     });
     // parse the incoming request containing the form data
     form.parse(req);
   }
}