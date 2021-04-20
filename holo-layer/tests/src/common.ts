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

export const InstallAgentApp = async (s, agentName: string) => {
    const config = Config.gen();
    const [agent] = await s.players([conductorConfig], false);
    await agent.startup();
    const adminWs = agent.adminWs();
    const agent_key = await adminWs.generateAgentPubKey();
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


export const _log = (key, value) => {
    console.log("######(" + key + ")#############");
    console.log(value);
    console.log("-----------------------------------");
};
