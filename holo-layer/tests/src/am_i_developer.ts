const sleep = (ms) =>
    new Promise((resolve) => setTimeout(() => resolve(null), ms));

import {
    InstallAgentApp,
    InstallAgentApp_As_Developer,
    _log,
    Peershare_Zome,
} from "./common";

module.exports = async (orchestrator) => {
    orchestrator.registerScenario("Am I developer Tests", async (s, t) => {
        const bob_cell = await InstallAgentApp(
            s,
            "alic-cell-as-developer",
            "hCAkbs0mibHm7rB0ZPkZZzhHC55KwmDxt6uR9x2XgFQ82OYvKwR7"
        );

        let result = await bob_cell.call(Peershare_Zome, "am_i_developer", null);

        _log("Result default_prop:", result);

        t.deepEqual(result, true);
    });
};
