import { Config, InstallAgentsHapps, InstalledHapp } from "@holochain/tryorama";
import { InstallAppRequest } from "@holochain/conductor-api";
import path from "path";

export const conductorConfig = Config.gen({});
export const Peershare_Zome = "peershare";
export const Default_Developer_Address =
  "uhCAkbs0mibHm7rB0ZPkZZzhHC55KwmDxt6uR9x2XgFQ82OYvKwR7";
export const peerShareDNA = path.join(
  __dirname,
  "../../workdir/dna/peershare.dna"
);

import { Base64 } from "js-base64";
export function serializeHash(hash) {
  return `u${Base64.fromUint8Array(hash, true)}`;
}
export const InstallAgentApp = async (
  s,
  agentName: string,
  am_i_developer: boolean = false
) => {
  const config = Config.gen();
  const [agent] = await s.players([conductorConfig], false);
  await agent.startup();
  const adminWs = agent.adminWs();
  let progenitor: string = Default_Developer_Address;
  var agent_key = await adminWs.generateAgentPubKey();
  if (am_i_developer) {
    progenitor = serializeHash(agent_key);
  }
  const hash_app = await adminWs.registerDna({
    path: peerShareDNA,
    properties: {
      developer_address: progenitor,
    },
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

export const InstallAgentsApp = async (s, agentNames: string[]) => {
  const config = Config.gen();
  const [agent] = await s.players([conductorConfig], false);
  await agent.startup();
  const adminWs = agent.adminWs();
  let progenitor: string = Default_Developer_Address;
  var agent_developer_key = await adminWs.generateAgentPubKey();
  var agent_non_developer_key = await adminWs.generateAgentPubKey();

  progenitor = serializeHash(agent_developer_key);

  const hash_dna = await adminWs.registerDna({
    path: peerShareDNA,
    properties: {
      developer_address: progenitor,
    },
  });

  const req_for_developer: InstallAppRequest = {
    installed_app_id: `peer-share-app-` + agentNames[0],
    agent_key: agent_developer_key,
    dnas: [
      {
        hash: hash_dna,
        nick: "my_cell_" + agentNames[0],
      },
    ],
  };

  const req_for_non_developer: InstallAppRequest = {
    installed_app_id: `peer-share-app-` + agentNames[1],
    agent_key: agent_non_developer_key,
    dnas: [
      {
        hash: hash_dna,
        nick: "my_cell_" + agentNames[1],
      },
    ],
  };

  const developer_agent = await agent._installHapp(req_for_developer);
  const non_developer_agent = await agent._installHapp(req_for_non_developer);
  return [developer_agent.cells[0], non_developer_agent.cells[0]];
};

export const _log = (key, value) => {
  console.log("######(" + key + ")#############");
  console.log(value);
  console.log("-----------------------------------");
};
