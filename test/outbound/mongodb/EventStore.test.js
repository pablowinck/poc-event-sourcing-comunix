import assert from "node:assert";
import { describe, it } from "node:test";
import { EventStore } from "../../../src/outbound/mongodb/EventStore.js";

describe("EventStore", () => {
  it("when an event is created and then the list of events is called, it should display the list", async () => {
    const eventStore = new EventStore();
    await eventStore.init();
    const event = {
      description: "Create User",
      status: "To Do",
    };
    const eventType = 'user-created-' + new Date().getTime();
    await eventStore.insert(eventType, event);
    const events = await eventStore.findByType(eventType);
    assert.strictEqual(events.length, 1);
    assert.strictEqual(events[0].data.description, event.description);
    await eventStore.deleteAll();
    await eventStore.closeConnection();
  });
  it("when searching for an event by type like, it should return the list of events", async () => {
    const eventStore = new EventStore();
    await eventStore.init();
    const event = {
      description: "Create User",
      status: "To Do",
    };
    const eventType = 'user-created-' + new Date().getTime();
    await eventStore.insert(eventType, event);
    const events = await eventStore.findByTypeLike('user-created');
    assert.strictEqual(events.length, 1);
    assert.strictEqual(events[0].data.description, event.description);
    await eventStore.deleteAll();
    await eventStore.closeConnection();
  });
});
