export class EventBuilder {
  static build({ feature, action }) {
    return `${feature}-${action}`;
  }
}
