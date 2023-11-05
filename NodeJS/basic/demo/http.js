const http = require('http')
const fs = require('fs')
const path = require('path')

// Start $ D:\workspace_study\study\JavaScript\NodeJS\basic>node demo/http

const server = http.createServer((req, res) => {

    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url)

    const ext = path.extname(filePath)
    if (!ext) {
        filePath += '.html'
    }

    let contentType
    switch (ext) {
        case '.css':
            contentType = 'text/css'
            break
        case '.js':
            contentType = 'text/javascript'
            break
        default:
            contentType = 'text/html'
    }

    console.log(req.url)
    console.log(filePath)

    fs.readFile(path.join(filePath), (err, data1) => {
        if (err) {

            fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
                if (err) {
                    res.writeHead(500)
                    res.end('Error')
                } else {
                    res.writeHead(200, {
                        'Content-Type': 'text/html'
                    })
                    res.end(data)
                }
            })

        } else {

            res.writeHead(200, {
                'Content-Type': contentType
            })
            res.end(data1)

        }
    })
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => {
    console.log('Server has been started ${PORT}...')
})



