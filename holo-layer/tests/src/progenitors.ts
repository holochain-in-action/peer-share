const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

import { InstallAgentApp, _log, Peershare_Zome } from "./common";

module.exports = async (orchestrator) => {
  orchestrator.registerScenario("Who am I", async (s, t) => {
    const alice_cell = await InstallAgentApp(s, "alice-cell");

    let result = await alice_cell.call(Peershare_Zome, "get_dna_props", null);

    _log("Read DNA Properties:", result);

    t.deepEqual(
      result.developer_address,
      "uhCAkbs0mibHm7rB0ZPkZZzhHC55KwmDxt6uR9x2XgFQ82OYvKwR7"
    );

    await sleep(10);
  });
};
