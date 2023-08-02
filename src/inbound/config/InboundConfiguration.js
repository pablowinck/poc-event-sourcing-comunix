import { UserController } from "../controller/UserController.js";

export class InboundConfiguration {

    controllers = [UserController]

    constructor(eventManager) {
        this.#initControllers(eventManager);
    }

    #initControllers(eventManager) {
        this.controllers.forEach(Controller => {
            new Controller(eventManager)
            console.log(Controller.name + ' initialized');
        })
    }
    
}