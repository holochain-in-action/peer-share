use crate::entries::schema::Schema;
use crate::entries::schema::SchemaDTO;
use crate::helpers::progenitor::DnaProperties;
use crate::helpers::utils::err;
use entries::schema::AllSchemaDTO;
use hdk::prelude::*;
use holo_hash::EntryHashB64;
mod entries;
mod helpers;

entry_defs![Schema::entry_def(), Path::entry_def()];

#[hdk_extern]
pub fn who_am_i(_: ()) -> ExternResult<AgentPubKey> {
    Ok(agent_info()?.agent_latest_pubkey)
}

#[hdk_extern]
pub fn get_dna_props(_: ()) -> ExternResult<DnaProperties> {
    helpers::progenitor::DnaProperties::get()
}

#[hdk_extern]
pub fn am_i_developer(_: ()) -> ExternResult<bool> {
    helpers::progenitor::am_i_developer()
}

#[hdk_extern]
pub fn create_schema(input: SchemaDTO) -> ExternResult<EntryHashB64> {
    if false == helpers::progenitor::am_i_developer()? {
        return Err(err(
            "You are not the developer, so you can't create a schema",
        ));
    }
    return entries::schema::create_schema(input);
}

#[hdk_extern]
pub fn get_schema_element(input: SchemaDTO) -> ExternResult<Element> {
    let hash: EntryHash = hash_entry(&Schema::new_withkey(
        &input.definition,
        &input.version,
        AgentPubKey::from(DnaProperties::get()?.developer_address),
    ))?;
    let element: Element =
        get(EntryHash::from(hash), GetOptions::default())?.ok_or(err("Can't find this schema"))?;

    Ok(element)
}

#[hdk_extern]
pub fn get_all_schemas(_: ()) -> ExternResult<Vec<AllSchemaDTO>> {
    entries::schema::get_all_schemas()
}
