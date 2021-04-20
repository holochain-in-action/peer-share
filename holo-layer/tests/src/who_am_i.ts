const sleep = (ms) =>
    new Promise((resolve) => setTimeout(() => resolve(null), ms));

import { InstallAgentApp, _log } from "./common";

module.exports = async (orchestrator) => {
    orchestrator.registerScenario("Who am I", async (s, t) => {
        const alice_cell = await InstallAgentApp(s, "alice-cell");

        let my_agent_key = await alice_cell.call("peershare", "who_am_i", null);

        _log("agent_key", my_agent_key.toString("base64"));
        _log("cellId", alice_cell.cellId[1].toString("base64"));

        t.deepEqual(
            my_agent_key.toString("base64"),
            alice_cell.cellId[1].toString("base64")
        );

        await sleep(10);
    });
};