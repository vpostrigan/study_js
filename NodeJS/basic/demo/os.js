const os = require('os')

console.log('OS: ', os.platform())
console.log('Arch: ', os.arch())
console.log('CPU: ', os.cpus())
console.log('Free mem : ', os.freemem())
console.log('Total mem: ', os.totalmem())
console.log('Home dir: ', os.homedir())
console.log('Uptime: ', os.uptime()/60/60) // seconds
