import assert from "node:assert";
import { describe, it } from "node:test";
import { CoreConfiguration } from "../../src/core/config/CoreConfiguration.js";
import { InboundConfiguration } from "../../src/inbound/config/InboundConfiguration.js";

describe("UserController", () => {
  it("when I call the /user endpoint, it should return the user id", async () => {
    const { server, eventManager } = new CoreConfiguration();
    new InboundConfiguration(eventManager);

    server.listen(3000, () => {
      console.log("Server started");
    });

    const response = await fetch("http://localhost:3000/user", {
      headers: {
        "user-id": "1234",
      },
    });

    assert.strictEqual(response.status, 200);
    assert.strictEqual(
      await response.text(),
      "User controller fired for user 1234",
    );

    server.close();
    process.exit(0);
  });
});
