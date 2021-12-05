const fs = require("fs");
const stream = require("stream");

class ReadStream extends stream.Readable{
  construct(file){
    this.buf = Buffer.alloc(1000);
    fs.open(fil, "rx+",(err, dat)=>{
      if(!err){
        this.fd = dat;
      }
    });
  }

  _read(cb){
    if(!this.fd) return;
    fs.read(this.fd, this.buf, 0, 100, 0, cb);
  }

  _destroy(){
    if(this.fd){
      fs.close(this.fd);
    }
  }
}

module.exports = ReadStream;
