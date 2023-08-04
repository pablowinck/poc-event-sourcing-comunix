import assert from "node:assert";
import { describe, it, mock } from "node:test";
import { EventManager } from "../../../src/core/entity/EventManager.js";
import { EventStore } from "../../../src/outbound/mongodb/EventStore.js";

describe("EventManager", () => {
  it('when I call the emit method, it should emit the "event-proxy" event', async () => {
    const eventStore = EventStore.getInstance();
    await eventStore.init();
    const mockfn = mock.fn();
    const eventManager = new EventManager(eventStore);
    eventManager.on("event-proxy", mockfn);
    eventManager.emit("user-created", { name: "John Doe" });
    assert.strictEqual(mockfn.mock.calls.length, 1);
    process.exit(0);
  });
  it("when I call the emit method, it should save the event in the EventStore", async () => {
    const eventStore = EventStore.getInstance();
    await eventStore.init();
    const eventManager = new EventManager(eventStore);
    const event = "user-created-" + new Date().getTime() + Math.random();
    eventManager.emit(event, { name: "John Doe" });
    const events = await eventStore.findByType(event);
    assert.strictEqual(events[0].type, event);
    assert.strictEqual(events[0].data.name, "John Doe");
    process.exit(0);
  });
});
