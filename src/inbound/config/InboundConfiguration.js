import { EmpresaController } from "../controller/EmpresaController.js";
import { EventController } from "../controller/EventController.js";
import { UserController } from "../controller/UserController.js";

export class InboundConfiguration {
  controllers = [UserController, EmpresaController, EventController];

  constructor(eventManager) {
    this.#initControllers(eventManager);
  }

  #initControllers(eventManager) {
    this.controllers.forEach((Controller) => {
      new Controller(eventManager);
      console.log(Controller.name + " initialized");
    });
  }
}
