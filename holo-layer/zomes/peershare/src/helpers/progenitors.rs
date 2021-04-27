use hdk::prelude::*;

#[derive(Serialize, Deserialize, SerializedBytes, Debug, Clone)]
pub struct DnaProperties{
    pub developer_address: String    
}

impl DnaProperties{
    pub fn get()->ExternResult<Self>{
      let prop:DnaProperties =   zome_info()?.properties.try_into()?;
      Ok(prop)
    }

   pub fn get_dev_addr()->ExternResult<AgentPubKey>{
     unimplemented!();
   }
}


pub fn am_i_developer()->ExternResult<bool>{

   // get developer_pub_key from DNA property == my current pub_key     
   // if == i am a developer otherwise I am not. 
    unimplemented!();
}