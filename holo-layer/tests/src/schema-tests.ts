const sleep = (ms) =>
    new Promise((resolve) => setTimeout(() => resolve(null), ms));

import path from "path";
import { InstallAgentApp, _log, Peershare_Zome } from "./common";


module.exports = async (orchestrator) => {
    orchestrator.registerScenario("upload schema-jsaon!", async (s, t) => {
        const alice_cell = await InstallAgentApp(
            s,
            "alice-cell-upload-schema",
            true
        );

        //*********** Test Case: create_schema, Success
        const schema = {
            definition: "fake data",
            version: "v1",
        };
        let create_schema_result_alice = await alice_cell.call(
            Peershare_Zome,
            "create_schema",
            schema
        );
        _log("Create_Schema_Result", create_schema_result_alice.toString("base64"));
        t.ok(create_schema_result_alice);

        await sleep(10);

        //*********** Test Case: create_schema, Faild becuase non-developer tried to create schema
        const bob_cell = await InstallAgentApp(s, "bob-cell-upload-schema", false);
        try {
            let create_schema_result_bob = await bob_cell.call(
                Peershare_Zome,
                "create_schema",
                {
                    definition: schema,
                    version: "v1",
                }
            );
            t.fail();
        } catch (e) {
            _log("e", e);
            t.deepEqual(e.type, "error");
        }


        //*********** Test Case: Get Element

        let element_result = await alice_cell.call(
            Peershare_Zome,
            "get_schema_element",
            schema
        );
        _log("Element", element_result);
        t.ok(element_result);

        await sleep(10);

    });
};
