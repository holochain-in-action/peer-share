use hdk::prelude::*;
use holo_hash::EntryHashB64;
pub mod anchors;
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

    // step0: create enty
    let entry_hash = hash_entry(new_schema.clone())?;

    // step1: create fix object, or whater that I can remeber: email, fix string, agent-public-key
    let all_schema_anchor = anchors::get_all_schemas_anchor_entry()?;

    // step2: do we need any Tag: one tag
    // step3: create a link from Step1 -(step2)--> Step0

    create_link(
        all_schema_anchor,
        entry_hash,
        LinkTag::new(anchors::ALL_SCHEMAS_LINKTAG),
    )?;

    let schema_entry_hash = hash_entry(new_schema)?;
    Ok(EntryHashB64::from(schema_entry_hash))
}

#[derive(Clone, Serialize, Deserialize, Debug, SerializedBytes)]
pub struct AllSchemaDTO {
    pub definition: String,
    pub version: String,
    pub entry_hash: EntryHashB64,
}
pub fn get_all_schemas() -> ExternResult<Vec<AllSchemaDTO>> {
    let all_schema_anchor: EntryHash = anchors::get_all_schemas_anchor_entry()?;
    let mut all_schema_dto: Vec<AllSchemaDTO> = Vec::new();
    let linked_schemas: Vec<Link> = get_links(
        all_schema_anchor,
        Some(LinkTag::new(anchors::ALL_SCHEMAS_LINKTAG)),
    )?
    .into_inner();

    for link in linked_schemas.into_iter() {
        match get(link.target.clone(), GetOptions::content())? {
            Some(element) => {
                let entry: Option<Schema> = element.entry().to_app_option()?;

                match entry {
                    Some(schema) => {
                        all_schema_dto.push(AllSchemaDTO {
                            definition: schema.definition,
                            version: schema.version,
                            entry_hash: EntryHashB64::from(link.target),
                        });
                    }
                    None => {}
                }
            }
            None => {}
        }
    }
    Ok(all_schema_dto)
}
