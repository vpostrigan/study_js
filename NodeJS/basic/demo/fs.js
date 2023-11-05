const fs = require('fs')
const path = require('path')

fs.mkdir(path.join(__dirname, 'tests'), (err) => {
    if (err) {
        throw err
    }
    console.log('Folder was created')
})

const filePath = path.join(__dirname, 'tests', 'text.txt')
fs.writeFile(filePath, 'Hello', err => {
    if (err) {
        throw err
    }
    console.log('File was created')
})
fs.appendFile(filePath, '\nHello2', err => {
    if (err) {
        throw err
    }
    console.log('File was created2')
})

fs.readFile(filePath, (err, content) => {
    if (err) {
        throw err
    }
    const data = Buffer.from(content)
    console.log('content: ', content)
    console.log('content: ', data.toString())
})

fs.readFile(filePath, 'utf-8', (err, content) => {
    if (err) {
        throw err
    }
    console.log(content)
})