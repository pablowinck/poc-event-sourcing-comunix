export class UserController {
  constructor(eventManager) {
    eventManager.on("/user", this.handleUser.bind(this));
    this.eventManager = eventManager;
  }

  handleUser({ req, res }) {
    const user = req.headers["user-id"];
    res.end("User controller fired for user " + user);
  }
}
