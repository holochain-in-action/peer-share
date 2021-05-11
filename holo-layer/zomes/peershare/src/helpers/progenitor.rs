//use hc_utils::WrappedAgentPubKey;
use hdk::prelude::*;
use holo_hash::AgentPubKeyB64;

#[derive(Serialize, Deserialize, SerializedBytes, Debug, Clone)]
pub struct DnaProperties {
  pub developer_address: AgentPubKeyB64,
}

impl DnaProperties {
  pub fn get() -> ExternResult<Self> {
    let prop: DnaProperties = zome_info()?.properties.try_into()?;
    Ok(prop)
  }
}

pub fn am_i_developer() -> ExternResult<bool> {
  let my_addr = agent_info()?.agent_latest_pubkey;
  let developer_key = DnaProperties::get()?.developer_address;
  Ok(my_addr == developer_key.into())
}
