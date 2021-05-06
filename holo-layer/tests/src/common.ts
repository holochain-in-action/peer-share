import { Config, InstallAgentsHapps } from "@holochain/tryorama";
import { InstallAppRequest } from "@holochain/conductor-api";
import path from "path";

export const conductorConfig = Config.gen({});
export const Peershare_Zome = "peershare";

export const peerShareDNA = path.join(
    __dirname,
    "../../workdir/dna/peershare.dna"
);

const installationAgents: InstallAgentsHapps = [
    // agent 0
    [
        // happ 0
        [peerShareDNA],
    ],
    [
        // happ 0
        [peerShareDNA],
    ],
];

export const InstallAgentApp = async (s, agentName: string, agentKey: string = "") => {
    const config = Config.gen();
    const [agent] = await s.players([conductorConfig], false);
    await agent.startup();
    const adminWs = agent.adminWs();
    let agent_key = Buffer.from(agentKey);
    if(agentKey == ""){
        agent_key = await adminWs.generateAgentPubKey();
    }
    const hash_app = await adminWs.registerDna({
        path: peerShareDNA,
    });

    const req: InstallAppRequest = {
        installed_app_id: `peer-share-app-` + agentName,
        agent_key: agent_key,
        dnas: [
            {
                hash: hash_app,
                nick: "my_cell_" + agentName,
            },
        ],
    };
    const installedHapp = await agent._installHapp(req);

    return installedHapp.cells[0];
};


export const InstallAgentApp_As_Developer = async (s, agentName: string) => {
    const config = Config.gen();
    const [agent] = await s.players([conductorConfig], false);
    await agent.startup();
    const adminWs = agent.adminWs();
    const agent_key = await _generateAgentPubKey_without_special_charachter(
        adminWs
    );
    //const agent_key = await adminWs.generateAgentPubKey();

    var developer_address = agent_key.toString("base64");
    _log("Generated_Agent_Key_For_Test", developer_address);

    const hash_app = await adminWs.registerDna({
        path: peerShareDNA,
        properties: { developer_address: developer_address },
    });

    const req: InstallAppRequest = {
        installed_app_id: `peer-share-app-` + agentName,
        agent_key: agent_key,
        dnas: [
            {
                hash: hash_app,
                nick: "my_cell_" + agentName,
            },
        ],
    };
    const installedHapp = await agent._installHapp(req);

    return installedHapp.cells[0];
};
export const _log = (key, value) => {
    console.log("######(" + key + ")#############");
    console.log(value);
    console.log("-----------------------------------");
};


/**************************Generate safe key  */
async function _generateAgentPubKey_without_special_charachter(adminWs) {
    var generated_key = await adminWs.generateAgentPubKey();
    while (_key_contains_special_chars(generated_key.toString("base64"))) {
        generated_key = await adminWs.generateAgentPubKey();
    }
    return generated_key;
}
var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
function _key_contains_special_chars(val) {
    if (format.test(val)) {
        return true;
    } else {
        return false;
    }
}