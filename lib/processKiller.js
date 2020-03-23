var findps = require('find-process')
var util = require('util')

function killer (ps,cb) {
  
    var typer = typeof ps==='string'?'name':'pid'

     findps(typer, ps).then(function(c){
      console.log(c)
        // if process is found
        if(c.length>0) {
            c.forEach(function (v) {
                process.kill(v.pid,'SIGTERM')
              console.log('fileServer with pid '+v.pid+' stopped')
                if(cb){
                  cb()
                }
              
            })
        }
        else {
          console.log('process with pid ' + ps + ' not found')
           if(cb) {
              killer(ps,cb())
             
           }
        }
         
   
    }).catch(function(err){
        return err
    })
    

}

// 
module.exports = killer
