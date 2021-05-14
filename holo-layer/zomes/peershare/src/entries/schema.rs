use holo_hash::EntryHashB64;
use hdk::prelude::*;


#[hdk_entry(id = "schema", visibility = "public")]
#[derive(Clone)]
pub struct Schema {
    pub definition: String,
    pub version: String,
    pub owner_address: AgentPubKey,
}

impl Schema{
    pub fn new(definition: &str, version: &str) -> Self {
        Schema {
            definition: definition.trim().to_string().clone(),
            version: version.trim().to_string().clone(),
            owner_address: agent_info().unwrap().agent_latest_pubkey,
        }
    }
}


#[derive(Clone, Serialize, Deserialize, Debug, SerializedBytes)]
pub struct SchemaDTO {
    pub definition: String,
    pub version: String,
}


pub fn create_schema(input: SchemaDTO) -> ExternResult<EntryHashB64> {
    let new_schema = Schema::new(&input.definition, &input.version);

    let _schema_header_hash = create_entry(new_schema.clone())?;
    let schema_entry_hash = hash_entry(new_schema)?;
    Ok(EntryHashB64::from(schema_entry_hash))
}
