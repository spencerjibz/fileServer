

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var http = require('http');

var fs = require('fs');

var parseUrl = require('parseurl');

var url = require('url');

var filepath = require('path');

var send = require('send');

var morgan = require('morgan');

var finalHandler = require('finalhandler');

var Window = require('window');

var Browser = require('./openBrowser');

var os = require('os');

var log = console.log;
var window = new Window(); // create "middleware"

var logger = morgan('short');
/**
 * Adds starts a file server
 * @param {number} port
 * @param {string} dirName
 * @return {function} Server
 */

function FileServer(dirName, port,noBrowser) {
  var _this = this;
 this.dirName   
  this.portName = port;
  this.Server;
  this.pid = process.pid;
  this.address = "http://127.0.0.1:".concat(port);
  process.title = 'fileServer';
  this.name = process.title; 
  var openBrowser = noBrowser === undefined || !noBrowser ? true : false;
 // change the directory 
  // validation of dirname
  if (typeof this.portName !== 'number') {
    return new Error("the port should be a number not ".concat(_typeof(this.port)));
  } 
  if (typeof dirName !== 'string') {
    return new Error("string parameter is expected for the filepath not ".concat(_typeof(dirName)));
  } //validation of port
 // set dirname after type checking

  else {
    // if the dirName is a path, resolve it to a fullpath 
    this.dirName = (/^(\.)/g).test(dirName)?filepath.resolve(dirName):dirName;
// Before serving the directory pass, check it if exists in file system
  fs.access(this.dirName,function(err,done){
    if(err) {
        throw new Error('no such directory')
    }






  
    // Custom directory handler
    var directory = function directory(res, path) {
      var stream = this; // redirect to trailing slash for consistent url

      if (!stream.hasTrailingSlash()) {
        return stream.redirect(path);
      } // get directory list


      fs.readdir(path, function onReaddir(err, list) {
        if (err) return stream.error(err); // formate dir name

        var dir = [].concat(path.replace(filepath.normalize(process.cwd()), ' ').replace(/[\\]/g, '/'));
        dir.shift();
        dir.shift(); // enable browser to open .dir type of folder by adding a lash to end of the folder name

        var results = list.map(function (v) {
          var arr = [].concat(v);

          if (/^\./g.test(v) && !v.includes('ignore') || !/\.\w+$/g.test(v)) {
            arr.push('/');
            return arr.join('');
          }

          if (/^\./g.test(v) && v.includes('ignore')) {
            if (process.platform === 'win32') {
              arr.push('/');
              return arr.join('');
            }

            return arr.join('');
          } // the v is a files 
          /// 


          return v;
        });
        res.end("\n         <h1>Directory listing for /".concat(dir.join(''), "</h1>\n         <hr> \n         <ul>").concat(results.map(function (v) {
          return "<li> <a href='".concat(window.location.pathname.replace('blank', "".concat(encodeURI(v).replace(/\'/g, "%27"))), "'>").concat(v, "</a>\n         \n         </li>");
        }).join(' '), "</ul>\n         <hr>\n         \n         "));
      });
    };

    // Add media mime types 
    send.mime.define({
      "audio/midi": ["mid", "midi", "kar", "rmi"],
      "audio/mp4": ["mp4a", "m4a"],
      "audio/mpeg": ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
      "audio/ogg": ["oga", "ogg", "spx"],
      "audio/webm": ["weba"],
      "audio/x-matroska": ["mka"],
      "audio/x-mpegurl": ["m3u"],
      "audio/wav": ["wav"],
      "video/3gpp": ["3gp"],
      "video/3gpp2": ["3g2"],
      "video/mp4": ["mp4", "mp4v", "mpg4"],
      "video/mpeg": ["mpeg", "mpg", "mpe", "m1v", "m2v"],
      "video/ogg": ["ogv"],
      "video/quicktime": ["qt", "mov"],
      "video/webm": ["webm"],
      "video/x-f4v": ["f4v"],
      "video/x-fli": ["fli"],
      "video/x-flv": ["flv"],
      "video/x-m4v": ["m4v"],
      "video/x-matroska": ["mkv", "mk3d", "mks"]
    }); // Transfer arbitrary files from within the dirname*
    // with a custom handler for directory listing

    this.Server = http.createServer(function onRequest(req, res) {
      var done = finalHandler(req, res);
      logger(req, res, function (err) {
        if (err) return done(err); // respond to request

        send(req, parseUrl(req).pathname, {
          index: false,
          root: this.dirName
        }).once('directory', directory).pipe(res);
      });
    });

    this.Server.listen(this.portName, function () {
      log("http server listening at http://127.0.0.1:".concat(_this.portName, " ")); /// create a db file int tmpfolder

      
      process.title = 'fileServer';
      _this.name = process.title;
      log(_this.pid, _this.name);
       log(openBrowser?'openning your browser':"don't open the browser")
      if(openBrowser) {
        Browser("http://127.0.0.1:".concat(_this.portName));
      }
    });

  })
    return {
      Server: this.Server,
      name: this.name,
      pid: this.pid,
      address: this.address,
      dir: this.dirName
    };
    
  }
}

module.exports = FileServer;
