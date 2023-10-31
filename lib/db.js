var os = require("os");
var fs = require("fs");
var tmpFile = os.tmpDir ? os.tmpDir() : os.tmpdir();
var sqlite3 = require("sqlite3").verbose();
// configure a sqlite db for storing process.pid

module.exports = new sqlite3.Database(tmpFile + "/test.db", function (err) {
  if (err) {
    console.error(err.message);
  }
  console.log("Connected to the chinook database.");
});
