use hdk::prelude::*;

pub const ALL_SCHEMAS_LINKTAG: &'static str = "all_schema_tag";

const ALL_SCHEMAS_ANCHOR: &'static str = "all_schemas_anchor";
pub fn get_all_schemas_anchor_entry() -> ExternResult<EntryHash> {
    let all_schemas_paths: Path = Path::from(ALL_SCHEMAS_ANCHOR);
    all_schemas_paths.ensure()?;
    let all_schemas_entry_hash: EntryHash = all_schemas_paths.hash()?;
    Ok(all_schemas_entry_hash)
}
