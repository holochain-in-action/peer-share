use hdk::prelude::*;
use holo_hash::EntryHashB64;

#[hdk_entry(id = "schema", visibility = "public")]
#[derive(Clone)]
pub struct Schema {
    pub definition: String,
    pub version: String,
    pub owner_address: AgentPubKey,
}

impl Schema {
    pub fn new(definition: &str, version: &str) -> Self {
        Schema {
            definition: definition.trim().to_string().clone(),
            version: version.trim().to_string().clone(),
            owner_address: agent_info().unwrap().agent_latest_pubkey,
        }
    }
    pub fn new_withkey(definition: &str, version: &str, owner_address: AgentPubKey) -> Self {
        Schema {
            definition: definition.trim().to_string().clone(),
            version: version.trim().to_string().clone(),
            owner_address: owner_address,
        }
    }
}

#[derive(Clone, Serialize, Deserialize, Debug, SerializedBytes)]
pub struct SchemaDTO {
    pub definition: String,
    pub version: String,
}

impl SchemaDTO {
    pub fn validate(&self) -> Result<(), String> {
        let mut msgs: Vec<String> = Vec::new();
        let mut result: bool = true;
        if crate::helpers::parser::validate_schema(&self.definition) == false {
            msgs.push("Schema definition is not valid. visit json-schema.org and use draft-07. You can also use: jsonschema.net".to_string());
            result = false;
        }
        if self.version.trim().is_empty() {
            msgs.push("Version of schema can not be null or empty".to_string());
            result = false;
        }
        if result == false {
            return Err(msgs.join("\r"));
        } else {
            return Ok(());
        }
    }
}

pub fn create_schema(input: SchemaDTO) -> ExternResult<EntryHashB64> {
    if let Err(e) = input.validate() {
        return Err(WasmError::Guest(e));
    }

    let new_schema = Schema::new(&input.definition, &input.version);

    let _schema_header_hash = create_entry(new_schema.clone())?;
    let schema_entry_hash = hash_entry(new_schema)?;
    Ok(EntryHashB64::from(schema_entry_hash))
}
