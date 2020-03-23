var findps = require('find-process')


function killer(ps, cb) {

    var typer = typeof ps === 'string' ? 'name' : 'pid'

    findps(typer, ps).then(function (c) {
       
        // if process is found
        if (c.length > 0) {
            c.forEach(function (v) {
                process.kill(v.pid, 'SIGTERM')
               
                if (cb) {
                    cb()
                }

            })
        }
        else {
            
            if (cb) {
                 return killer(ps, cb())
            }
        }


    }).catch(function (err) {
        return err
    })


}

// 
module.exports = killer
