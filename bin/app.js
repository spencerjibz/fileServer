#!/usr/bin/env node
var program = require('commander')
var FileServer = require('../lib/server')
var log = console.log
var path = require('path')
var Browser = require('../lib/openBrowser')
var ps = []
var killer = require('../lib/processKiller')
var os = require('os')
var fs = require('fs')
// setup sqlite database 
var db = require('../lib/db')
// Path to  the sqlite fileDatabase
var dbPath = os.tmpDir ? os.tmpDir()+'/test.db': os.tmpdir()+'/test.db'


// main commands
program
 .version(require('../package').version)
    .command('start')// the main  sub-command name
    .alias('s')// alternative sub -command name
    .option("-d,--dirName [value]", 'The directory served')
    .option("-p,--port [value]", 'The port for server, default port is 7000')
    .option("-N,--noBrowser [value]",'disable opening the browser,default is false')
    .description(' starts a file server in a given directory or current directory by default')
    .action(function (options) {
       var port = options.port===undefined?7000: parseInt(options.port);
       var dirName = options.dirName===undefined?process.cwd():options.dirName;
       var noBrowser = options.noBrowser

// create a randon arbitrary between  the range (min,max)
 function getRandomArbitrary(max, min) {
 return Math.floor((Math.random() * (max - min) + min))
  }
      
// Start 
var t
  try {
     
   
      t = FileServer(dirName, port, noBrowser)
      
   
     // when the server is terminated, remove its details from the sqlite database
      process.on('SIGINT'||'SIGTERM', () => {
         
         
              db.run('DELETE FROM servers WHERE pid =?', [t.pid], function (err) {
                  if (err) { throw err }
                  console.log(this.changes + 'fileServer instance (s) teminated  and database cleared')
           
                  // kill process after clearing the database
                  process.exit()
              })
              
        
      })
      
    }
    
      // open the url in browser
   
      
  catch(err) {
      throw err
  }
  finally{
    
      db.serialize(function () {
          // only create database if the db is doesn't exist and only if the database file is empty
          if (!fs.existsSync(dbPath) || fs.readFileSync(dbPath, { encoding: 'utf8' }).length===0) {
              db.run("CREATE TABLE servers(Serveraddress TEXT,dir TEXT,pid INTEGER)");
          }

          var stmt = db.prepare("INSERT INTO servers(Serveraddress,dir,pid) VALUES (?,?,?)");
         stmt.run([t.address,t.dir,t.pid])
         stmt.finalize()
         console.log('server address and pid successfully added to database')


         
      });

  


  }
  // when the server is closed or process is exited

    })

/*
** command thats kills of all the instance of the fileServer


*/
program
 .command('kill')// the main  sub-command name
    .alias('k')// alternative sub -command name
    .description('stops all instances of the fileServer active')
    .action(function(){
// if db file is not empty
        if (fs.readFileSync(os.tmpdir + '/test.db', { encoding: 'utf8' }).length>0) {
        db.all("SELECT rowid AS id, pid FROM servers",[], function (err, row) {
         if(row.length<1){
             console.log('no fileServer processes running')
         }   
         ////
          else {
          ps = row
       
            //var  log(ps) last = row.pop().pid
           try {
               console.time('executing')
            ps.forEach(v=>{
                killer(v.pid,function(){
                    db.run ('DELETE FROM servers WHERE pid =?', [v.pid], function (err) {
                        if (err)  {throw err}
                           console.log(this.changes)
                           db.close()
                    })
                })
                
            })
               console.timeEnd('executing')
           

           }
           catch(err){
               log(err)
           }
            
        }}
        )
    
    }
     else {
          console.log('no fileServer processes running')
        
     }
    })

// let the program parse the CLI arguments
program.parse(process.argv)
// error handler 

// in case of no args
// in case of no args


// error on unknown commands

    if (process.argv.length<3) {
      
        program.help()
    
    }
