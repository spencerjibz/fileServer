var  cp = require('child_process')


var start = (process.platform ==='darwin' ? 'open' : process.platform ==='win32' ? 'start' : 'xdg-open');

 function Starter(url) {
     if(url) {
      return cp.execSync(start + ' ' + url)
       
     
     
 } 
 }
 module.exports = Starter
 