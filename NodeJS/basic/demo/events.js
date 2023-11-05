const EventEmitter = require('events')

const emitter = new EventEmitter()

// прослушка событий
emitter.on('anything', data => {
    console.log('ON: anything', data)
})

emitter.emit('anything', {a: 1})
emitter.emit('anything2', {b: 2})
emitter.emit('anything', {c: 3})

setTimeout(() => {
    emitter.emit('anything', {c: 4})
}, 1500)




class Dispatcher extends EventEmitter {
    subscribe(eventName, callbac) {
        console.log('[Subscribe...]')
        this.on(eventName, callbac)
    }

    dispatch(eventName, data) {
        console.log('[Dispatching...]')
        this.emit(eventName, data)
    }
}

const dis = new Dispatcher()
dis.subscribe('aa', data => {
    console.log('On: aa', data)
})
dis.dispatch('aa', {aa: 22})