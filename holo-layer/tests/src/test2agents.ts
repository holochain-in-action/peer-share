const sleep = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve(null), ms));

import { InstallAgentsApp, _log, Peershare_Zome } from "./common";

module.exports = async (orchestrator) => {
  orchestrator.registerScenario(
    "Test 2 developers, one Developer and on Normal user",
    async (s, t) => {
      const [alice, bob] = await InstallAgentsApp(s, [
        "alice-cell",
        "bob-cell",
      ]);

      let alice_is_developer = await alice.call(
        Peershare_Zome,
        "am_i_developer",
        null
      );
      _log("alice is developer", alice_is_developer);
      t.deepEqual(alice_is_developer, true);

      let bob_is_not_developer = await bob.call(
        Peershare_Zome,
        "am_i_developer",
        null
      );
      _log("bob is not developer", bob_is_not_developer);
      t.deepEqual(bob_is_not_developer, false);

      let dnaProp1 = await alice.call(Peershare_Zome, "get_dna_props", null);
      let dnaProp2 = await bob.call(Peershare_Zome, "get_dna_props", null);

      _log("DNA Prop1:", dnaProp1);
      _log("DNA Prop2:", dnaProp2);
      t.deepEqual(dnaProp1, dnaProp2);

      await sleep(10);
    }
  );
};
