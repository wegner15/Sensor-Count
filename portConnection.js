const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline');

let path = ''
let Port = ''


// Promise approach
SerialPort.list().then(ports => {
  let done = false
  let count = 0
  let allports = ports.length
  ports.forEach(function(port) {
    count = count+1
    pm  = port.manufacturer
    console.log(pm)

    if (typeof pm !== 'undefined' && pm.includes('Silicon')) {
      path = port.path
      Port = new SerialPort(path, { baudRate: 9600 })
      const parser = Port.pipe(new Readline({ delimiter: '\n' }));// Read the port data
      Port.on("open", () => {
        console.log('serial port open');
      });parser.on('data', data =>{
        console.log('got word from arduino:', data);
      });
      done = true
    }

    if(count === allports && done === false){
      console.log(`can't find any arduino`)
    }
  })
})