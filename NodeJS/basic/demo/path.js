const path = require('path')

console.log('File name: ', path.basename(__filename))
console.log('Dir name: ', path.dirname(__filename))
console.log('Ext file: ', path.extname(__filename))
console.log('Parse: ', path.parse(__filename))
console.log('Parse: ', path.parse(__filename).name)

console.log(path.join(__dirname, 'server', 'index.html'))
// D:\workspace_study\study\JavaScript\NodeJS\basic\demo\server\index.html

