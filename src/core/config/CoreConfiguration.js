import morgan from 'morgan';
import { createServer } from 'node:http';
import { EventStore } from "../../outbound/mongodb/EventStore.js";
import { EventManager } from '../entity/EventManager.js';

export class CoreConfiguration {

    #eventManager
    #eventStore

    get server() {
        const logger = morgan('tiny')
        return createServer((req, res) => {
            res.setHeader('content-type', 'application/json')
            logger(req, res, function (err) {
                if (err) return res.end('error')
            })
            try {
                this.eventManager.emit(req.url, { req, res })
            } catch (error) {
                console.log(error)
                res.statusCode = 500
                res.end('error')
            }
        }).on('error', (err) => {
            console.log(err)
            this.eventStore.closeConnection();
        }).on('close', () => {
            console.log("Server closed");
            this.eventStore.closeConnection();
        })
    }

    get eventStore() {
        if (!this.#eventStore) {
            this.#eventStore = new EventStore();
            this.#eventStore.init();
        }
        return this.#eventStore;
    }

    get eventManager() {
        if (!this.#eventManager) {
            this.#eventManager = new EventManager(this.eventStore);
        }
        return this.#eventManager
    }

}