 let db = require('./db')
 let fetch = require('node-fetch')
  let fs = require('fs')
  let assert = require('assert')
  let window = require('window')
 db.all('SELECT * FROM servers;',[],(err,row)=>err||row.length<1?console.log(row):
 row.forEach(server =>
 
     fs.readdirSync(server.dir).map(v => {
         let arr = [].concat(v)

         if (/^\./g.test(v) && !v.includes('ignore') || !/\.\w+$/g.test(v)) {
             arr.push('/')
             return arr.join('')

         }
         if (/^\./g.test(v) && v.includes('ignore')) {
             arr.push('/')
             return arr.join('')
         }

         return encodeURI(v)

     }
     )
     .forEach(V => {
         return fetch(server.Serveraddress+'/'+V)
             .then(resp =>  console.log(resp.status,V)
             ).catch(er=>console.log(err))

             

     })
 
 ))