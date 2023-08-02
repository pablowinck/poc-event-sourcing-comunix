import EventEmitter from 'node:events'

export class EventManager extends EventEmitter {

    constructor() {
        super()
        super.on('event-proxy', (event, args) => {
            if (this.#isEventProxy(event)) return;
            if (this.#isHttpProxy(args)) return;
        })
    }

    emit(...args) {
        super.emit('event-proxy', ...args)
        super.emit(...args)
    }

    #isEventProxy(event) {
        return event === 'event-proxy'
    }

    #isHttpProxy(args) {
        return args?.req && args?.res
    }

}