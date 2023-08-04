import assert from "node:assert";
import { describe, it } from "node:test";
import { EventManager } from "../../../src/core/entity/EventManager.js";
import { EventStore } from "../../../src/outbound/mongodb/EventStore.js";
import { SolicitarCadastroEmpresa } from "../../../src/core/usecase/SolicitarCadastroEmpresa.js";

describe("SolicitarCadastroEmpresa", () => {
  it("quando eu executar com cnpj inválido, deve lançar exception e salvar o evento de falha", async () => {
    const eventStore = EventStore.getInstance();
    await eventStore.init();
    const eventManager = new EventManager(eventStore);
    const usecase = new SolicitarCadastroEmpresa(eventManager);
    assert.throws(() => usecase.execute({ cnpj: "123" }), Error);
    const events = await eventStore.findByTypeLike("cadastro-empresa");
    assert.strictEqual(events.length > 0, true);
    process.exit(0);
  });

  it("quando eu executar com cnpj válido, então deve salvar o evento de sucesso", async () => {
    const eventStore = new EventStore();
    await eventStore.init();
    const eventManager = new EventManager(eventStore);
    const usecase = new SolicitarCadastroEmpresa(eventManager);
    assert.doesNotThrow(() =>
      usecase.execute({ cnpj: "26.253.045/0001-61", nome: "Empresa Teste" }),
    );
    const events = await eventStore.findByTypeLike("cadastro-empresa");
    assert.strictEqual(events.length > 0, true);
    process.exit(0);
  });
});
