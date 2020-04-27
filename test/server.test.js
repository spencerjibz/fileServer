"use strict";

var Server = require('../lib/server');

var fetch = require('node-fetch');

var fs = require('fs');
 var execSync = require('child_process').execSync
var os = require('os');

var tmpFile =  os.tmpDir ? os.tmpDir() : os.tmpdir()

var sqlite3 = require('sqlite3').verbose();

var killer = require('../lib/killer-test');

var db = require('../lib/db'); // setup database connection
//  fetch the database


function fetcher(cb) {
  return db.all('SELECT* FROM servers', [], cb);
}

describe('fileServer', function () {
  beforeAll(function (done) {
  // if there is no fileserver run an instance of the fileServer
  fetcher((err,row)=>{
 if(err||row.length<1||row===null){
// no instance of the fileServer running so lets run one in the create folder
  console.warn('there is no instance of the fileServer running, ensure run one or more and then test it')
 process.exit()


 }

done()

  })

    jest.setTimeout(10000);
  }); // the server should started successfully

  it('should start sucessfully', function (done) {
    fetcher(function (err, row) {
      if (err || row.length < 1) {
        expect(row.length > 0).toEqual(true);
        done(err);
      }

      row.forEach(function (server) {
        return fetch(server.Serveraddress).then(function (resp) {
          expect(resp.status).toBe(200);
          done();
        })["catch"](function (err) {
          expect(true).toBe(false);
        });
      });
    });
  }); // the server should  serve all contents in passed folder
  // The all files and folders should show up on the index.html page

  it('should serve  all files in passed directory', function (done) {
    fetcher(function (err, row) {
      if (err || row.length < 1) {
        expect(row.length > 0).toEqual(true);
        done(err);
      }

      row.forEach(function (server) {
        return fs.readdirSync(server.dir).map(function (v) {
          var arr = [].concat(v);

          if (/^\./g.test(v) && !v.includes('ignore') || !/\.\w+$/g.test(v)) {
            arr.push('/');
            return arr.join('');
          }

          if (/^\./g.test(v) && v.includes('ignore')) {
            arr.push('/');
            return arr.join('');
          }

          return v;
        }).forEach(function (V) {
          return fetch(server.Serveraddress).then(function (resp) {
            return resp.text();
          }).then(function (txt) {
            var tes = txt.includes(V);
            expect(tes).toEqual(true);
            done();
          })["catch"](function (err) {
            expect(true).toBe(false);
          });
        });
      });
    });
  }); // the fileServer should  serve all the folders and files in the passed directory
  // the content contents of each dir should match what's served

  it('should serve the all folders and files', function (done) {
    fetcher(function (err, row) {
      if (err || row.length < 1) {
        expect(row.length > 0).toEqual(true);
        done(err);
      }

      row.forEach(function (server) {
        return fs.readdirSync(server.dir).map(function (v) {
          var arr = [].concat(v);

          if (/^\./g.test(v) && !v.includes('ignore') || !/\.\w+$/g.test(v)) {
            arr.push('/');
            return arr.join('');
          }

          if (/^\./g.test(v) && v.includes('ignore')) {
            arr.push('/');
            return arr.join('');
          }

          return encodeURI(v);
        }).forEach(function (V) {
          return fetch(server.Serveraddress + '/' + V).then(function (resp) {
            expect(resp.status).toBe(200);
            done();
          })["catch"](function (err) {
            expect(true).toBe(false);
          });
        });
      });
    });
  }); // fileServer app should kill all instances of the server which kill command is passed

  it('should successfully stopped the running instances of the fileServer', function (done) {
    fetcher(function (err, row) {
      if (err || row.length < 1) {
        expect(row.length > 0).toEqual(true);
      } else {
        row.forEach(function (v) {
          killer(v.pid, function () {
            db.run('DELETE FROM servers WHERE pid =?', [v.pid], function (err) {
              if (err) {
                expect(true).toBe(false);
              }

              expect(this.changes > 0).toBe(true);
              done();
            });
          });
        });
      }
    });
  });
});
// 
