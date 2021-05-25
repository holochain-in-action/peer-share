const sleep = (ms) =>
    new Promise((resolve) => setTimeout(() => resolve(null), ms));

import path from "path";
import { InstallAgentsApp, _log, Peershare_Zome } from "./common";
const enum zome_function {
    create_schem = "create_schema",
    get_schema_element = "get_schema_element",
    get_all_schemas = "get_all_schemas"
}
import fs from "fs";

module.exports = async (orchestrator) => {
    orchestrator.registerScenario("upload schema-jsaon!", async (s, t) => {
        const [alice, bob] = await InstallAgentsApp(
            s,
            ["alice", "bob"],
        );


        // Read file:
        let file_path = path.join(__dirname, "/test-data", "valid-schema.json");
        let schema_file = fs.readFileSync(file_path, "utf-8");

        //*********** Test Case: create_schema, Success
        const schema = {
            definition: schema_file,
            version: "v1",
        };
        let create_schema_result_alice = await alice.call(
            Peershare_Zome,
            zome_function.create_schem,
            schema
        );
        _log("Create_Schema_Result", create_schema_result_alice.toString("base64"));
        t.ok(create_schema_result_alice);

        await sleep(10);

        const schema2 = {
            definition: schema_file,
            version: "v2",
        };
        let create_schema_result_alice_2 = await alice.call(
            Peershare_Zome,
            zome_function.create_schem,
            schema2
        );
        t.ok(create_schema_result_alice_2);

        await sleep(10);

        //*********** Test Case: create_schema, Faild becuase non-developer tried to create schema       
        try {
            const bob_create_schema_result = await bob.call(
                Peershare_Zome,
                zome_function.create_schem,
                schema
            );
            t.fail();
        } catch (e) {
            t.deepEqual(e.data.data, "Wasm error while working with Ribosome: Guest(\"You are not the developer, so you can\\'t create a schema\")");
        }


        // //*********** Test Case: Get Element


        let alice_read_element = await alice.call(Peershare_Zome,
            zome_function.get_schema_element,
            schema);

        _log("alice read element", alice_read_element);
        t.ok(alice_read_element);

        await sleep(10);

        let bob_read_element = await bob.call(Peershare_Zome,
            zome_function.get_schema_element,
            schema);
        t.ok(bob_read_element);

        _log("bob read element", bob_read_element);
        await sleep(10);



        let get_all_schemas_result = await bob.call(
            Peershare_Zome,
            zome_function.get_all_schemas,
            null
        );
        _log("bob get all schemas", get_all_schemas_result);
        t.ok(get_all_schemas_result);
        t.equal(get_all_schemas_result.length, 2);
        await sleep(10);

    });
};
