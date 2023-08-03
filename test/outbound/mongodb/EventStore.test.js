import assert from "node:assert";
import { describe, it } from "node:test";
import { EventStore } from "../../../src/outbound/mongodb/EventStore.js";

describe("EventStore", () => {
  it("quando chamado o criado um evento, depois chamado a listagem de eventos deve exibir a listagem", async () => {
    const eventStore = new EventStore();
    await eventStore.init();
    await eventStore.deleteAll();
    const event = {
      description: "Cadastrar Usuario",
      status: "To Do",
    };
    await eventStore.insert("Evento Cadastro de usuário", event);
    const events = await eventStore.getAll();
    assert.strictEqual(events.length, 1);
    assert.strictEqual(events[0].data.description, event.description);
    await eventStore.deleteAll();
    await eventStore.closeConnection();
  });
});
