use crate::helpers::progenitors::DnaProperties;
use hdk::prelude::*;
mod helpers;
#[hdk_extern]
pub fn who_am_i(_: ()) -> ExternResult<AgentPubKey> {      

    Ok(agent_info()?.agent_latest_pubkey)
}

#[hdk_extern]
pub fn get_dna_props(_:()) -> ExternResult<DnaProperties>{
    helpers::progenitors::DnaProperties::get()
}

#[hdk_extern]
pub fn am_i_developer(_:()) -> ExternResult<bool>{
   helpers::progenitors::am_i_developer()
}
