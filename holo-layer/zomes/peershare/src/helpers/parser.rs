use jsonschema_valid::{schemas, Config};
use serde_json::Value;

pub fn validate_schema(schema_json: &str) -> bool {
    let schema: Value = serde_json::from_str(schema_json).unwrap();
    let cfg = Config::from_schema(&schema, Some(schemas::Draft::Draft7)).unwrap();

    return cfg.validate_schema().is_ok();
}

pub fn _validate_data(schema_json: &str, data_json: &str) -> bool {
    let schema: Value = serde_json::from_str(schema_json).unwrap();
    let data: Value = serde_json::from_str(data_json).unwrap();
    let cfg = Config::from_schema(&schema, Some(schemas::Draft::Draft7)).unwrap();
    if cfg.validate_schema().is_ok() && cfg.validate(&data).is_ok() {
        return true;
    }
    return false;
}

#[cfg(test)]
mod parser_test {
    use super::*;
    use std::fs;
    use std::path::PathBuf;

    #[test]
    fn schema_is_valid() {
        let path = get_absolute_path("src/entries/schema/test-data/valid-schema.json");
        let schema_file = fs::read_to_string(path).unwrap();
        let result = validate_schema(&schema_file);
        assert_eq!(result, true);
    }

    #[test]
    fn schema_is_invalid() {
        let path = get_absolute_path("src/entries/schema/test-data/invalid-schema.json");
        let schema_file = fs::read_to_string(path).unwrap();
        let result = validate_schema(&schema_file);
        assert_eq!(result, false);
    }

    #[test]
    fn data_and_schema_are_valid() {
        let schema = get_absolute_path("src/entries/schema/test-data/valid-schema.json");
        let data = get_absolute_path("src/entries/schema/test-data/valid-data.json");
        println!("{:?}", schema.clone());

        let schema_file = fs::read_to_string(schema).unwrap();
        let data_file = fs::read_to_string(data).unwrap();
        let is_valid_schema = validate_schema(&schema_file);
        let is_valid_data = validate_data(&schema_file, &data_file);
        assert_eq!(is_valid_schema, true);
        assert_eq!(is_valid_data, true);
    }

    #[test]
    fn schema_is_valid_and_data_is_invalid() {
        let schema = get_absolute_path("src/entries/schema/test-data/valid-schema.json");
        let data = get_absolute_path("src/entries/schema/test-data/invalid-data.json");

        let schema_file = fs::read_to_string(schema).unwrap();
        let data_file = fs::read_to_string(data).unwrap();
        let is_valid_schema = validate_schema(&schema_file);
        let is_valid_data = validate_data(&schema_file, &data_file);
        assert_eq!(is_valid_schema, true);
        assert_eq!(is_valid_data, false);
    }

    fn get_absolute_path(file_path: &str) -> PathBuf {
        let mut path = std::env::current_dir().unwrap();
        path.push(file_path);
        assert_eq!(true, path.as_path().exists());
        path
    }
}
