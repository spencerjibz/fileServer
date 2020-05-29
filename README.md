## FileServer 
A simple command line tool that initiates a static-asset http server in specified directory. Inspired by the Pythons Http module (http.server method)
 
### Requirements for usage
 - Nodejs  (v4 and higher) 
 - git
 - node-gyp ( maybe not be necessary). for installation of Sqlite3 binding for nodejs
### Installation
clone the repo(run the command below with in powershell,cmd or  bash) or download zipped folder(if you've download the zip folder just run npm install).<br>
 
``` git clone https://github.com/spencerjibz/fileServer.git && cd  fileServer && npm install```
 
### Features
-  logs all  responses and status codes
 - Opens the browser with start command. 
 - Cross platform (Windows and Linux-based systems)
 -  stops all instances running with the kill command()
### Usage
``` Usage: app [options] [command]

Options:
  -V, --version      output the version number
  -h, --help         output usage information

Commands:
  start|s [options]   starts a file server in a given directory or current directory by default
  kill|k             stops all instances of the fileServer active

  ```
  
![](https://raw.githubusercontent.com/spencerjibz/fileServer/master/assets/general.gif)
### key Facts on Usage

1.**Start Command**: <br> 
```  
 starts a file server in a given directory or current directory by default

Options:
  -d,--dirName [value]    The directory served
  -p,--port [value]       The port for server, default port is 7000
  -N,--noBrowser [value]  disable opening the browser,default is false
  -h, --help              output usage information

```
Start fileServer and  open browser . This is the default setting
 ![](https://raw.githubusercontent.com/spencerjibz/fileServer/master/assets/startCommand.gif)

Start fileServer without opening browser

 ![](https://raw.githubusercontent.com/spencerjibz/fileServer/master/assets/NobrowserCommand.gif)
 

2.**Kill Command**: <br>
``` 
stops all instances of the fileServer active

Options:
  -h, --help  output usage information

```
 ![](https://raw.githubusercontent.com/spencerjibz/fileServer/master/assets/killCommand.gif)

3.**Usage illustration**<br>
 

 ![](https://raw.githubusercontent.com/spencerjibz/fileServer/master/assets/Crd.gif)

 Enjoy the rest of the features
### Testing
 Ensure that  atleast one instance of the fileServer is running before running the command below.<br>
 ```  cd file Server && npm test ```
  ![](https://raw.githubusercontent.com/spencerjibz/fileServer/master/assets/tests.gif)

### License
  [MIT](https://github.com/spencerjibz/fileServer/blob/master/LICENSE)
