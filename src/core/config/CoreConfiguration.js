import morgan from 'morgan';
import { createServer } from 'node:http';
import { EventManager } from '../entity/EventManager.js';

export class CoreConfiguration {

    #eventManager

    get server() {
        const logger = morgan('tiny')
        return createServer((req, res) => {
            res.setHeader('content-type', 'application/json')
            logger(req, res, function (err) {
                if (err) return res.end('error')
            })
            this.eventManager.emit(req.url, { req, res })
        })
    }

    get eventManager() {
        if (!this.#eventManager)
            this.#eventManager = new EventManager()
        return this.#eventManager
    }

}