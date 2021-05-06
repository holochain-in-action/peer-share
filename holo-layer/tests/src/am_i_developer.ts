const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

import { InstallAgentApp, _log, Peershare_Zome } from "./common";

module.exports = async (orchestrator) => {
  orchestrator.registerScenario("Am I developer Tests", async (s, t) => {
    const bob_cell = await InstallAgentApp(s, "alic-cell-as-developer", true);

    let result_bob = await bob_cell.call(
      Peershare_Zome,
      "am_i_developer",
      null
    );

    t.deepEqual(result_bob, true);

    const alice_cell = await InstallAgentApp(
      s,
      "alic-cell-as-developer",
      false
    );

    let result_for_alice = await alice_cell.call(
      Peershare_Zome,
      "am_i_developer",
      null
    );

    t.deepEqual(result_for_alice, false);
  });
};
