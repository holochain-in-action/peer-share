### Run hApp

0. Install nix-shell
1. Clone this repository
2. Go to holo-layer folder and run `nix-shell` (It takes a lot of time for the first time.)
3. Go to tests folder and run `npm i`
4. In the tests folder run `npm test`
___________
### Watch Youtube Channel:
https://www.youtube.com/watch?v=V077MZp7BHw&list=PL2hOZGg8QnUDiTkJF2CD2Fu1D9F6KbsmB
___________
# Peer-Share-1.0.0


## Purposes
1. Implementing **Dev-ops** in Holochain with minimum DNA changes.
2. Implementing **hybrid solution** with holocahin (**oracle** topic).
3. Implementing **modularity** by using some ready modules like File_Storage into the solution.
4. Designing holochain app with **Holoport**
5. Introducing some patterns and desings for implementing hApps.
# Architect Schema

![](https://i.imgur.com/51Wq6oC.png)


# Layers:
* **Holo layer**:
    * Schema abstraction.(Json Schema)
    * Content abstraction.(Json Content)
    * Application settings.
    * Subscription(Capability-token).
    * Smart Contact:Uploading web-assembly to have customized business rules()(next version)
* **Outlet layer**: (MVC pattern)
    * **Model**: hApp concrete modeling
    * **View**: UI, view models,
    * **Controller**:
        * DNA Adapter: outlet to DNA 
        * DNA Signaling: DNA to Outlet
        * Oracle Adapter: connection to hybrid

* **External Layer**
    * Centralized:
        * Indexing: Elastic Search
        * Payment methods: Paypal, MasterCard
    * Cryptocurrency layer
        * Metamask connection
        * Wallet connection


# User Stories
## Guest (user without identity):
* As a Guest I want to be able to open hApp via browser.
* As a Guest I want to search channel and visit the contents.
* As a Guest I want to be able to register an account.
## User:(user with identity)
* As a User I want to be able to create a Channel.
* As a user I want to see the list of my Channels.
* As a User I want to add multiple contents to a Channel.
* As a User I want to edit/delete a Channel info.
* As a User I want to delete a content of channel.
## Developer:(user with super-power)
* As a developer I want to have Dev-ops facility on Outlet layer.
* As a developer I want to be able to update app without versioning the DNA.
* As a developer I want to be able to create new schema.

___

# DNA design
## Schema Definition in Zome

* schema definition is created only by developer using progenitor pattern.
```rust
[Public Entry][Edit(N),Delete(N)]
struct Schema {  
  definition:JSON, // JSON Schema: https://json-schema.org/
  version:String
  owner_address:AgentPubKey, // progenitor pattern, this is developer agent address
}

Validation Rules:
1- definition, version, owner_address are required.
2- owner_address should be progenitor pattern
3- json schema should be valid.

```
Peer-Share Example:
Schema will be created by Admin User.
```json=
Schema {
 name: "Channel",
  definition:{
     [field:title, type:string,lenght:50, required:yes],
     [field:category, type:int, required:yes],
     [field:createdat, type:datetime, required:yes],
     [field:description, type:string, lenght:4000, required:no],     
 },
 version:"v1",
 owner_address:"asdf234sfsewr#$2"
}


Schema {
 name: "Tag",
  definition:{
     [field:name, type:string(25), required:yes]    
 },
 version:"v1",
 owner_address:"asdf234sfsewr#$2"
}
```
## Content Definition in Zome
### Public Data Definition
* End-user public data which goes to DHT would be using this entry.
```rust
[Public Entry][Edit(N),Delete(Y)]
struct Public_Content { 
   content:String, // JSON data in JsonSchema standard format
   schema:Address, // Hash address of JsonSchema
   owner: AgentPubKey,   // user address
}

Validation Rules:
1- ower address is valid
2- validate content based on the referenced schema using schema format.
```
Example:
```json=
Public_Content { // Channel is public entry in DHT
 content:{
     title:"Holochain in Action",
     category:1
     createdat:"01-01-2021 12:30",
     description:"empty"
 },
 schema:"HNsj6tQ51s1SPrCBkedbNf0Tp0GbM",
 owner:"o23KMBAuJGSYnRmoBZM3lMfTKevIkA"
}

```

### Private Data Definition

* End-user private data would be using this entry.
```rust
[Private Entry][Edit(Y),Delete(Y)]
struct Private_Content{
  content:String, // JSON data in JsonSchema standard format
  schema:Address, // Hash address of JsonSchema
  owner: AgentPubKey,   // user address
}

Validation Rules:
1- ower address is valid
2- validate content based on the referenced schema using schema format.

```
Example:
```json=
Private_Content { // Draft-Channel is private entry in source-chain
 content:{
     title:"Holochain in Action",
     category:1
     createdat:"01-01-2021 12:30",
     description:"empty"
 },
 schema:"HNsj6tQ51s1SPrCBkedbNf0Tp0GbM",
 owner:"o23KMBAuJGSYnRmoBZM3lMfTKevIkA"
}
```
**Outlet layer(MVC Pattern)**
* **Model**: concerete model of application. This model can be changed during the software life cycle. Model would be apply to DNA as an entry and recieved a Hash address. so all generated content related to each specific model should connect to this address. 
* **View**: all UIs and ViewModel are located here. 
* **Controller**: all controllers to communicate to Outside world and DNA are located here. also some basic app settings and mapping can be here. like:      
    * Fetch out-side word setting from DNA and map to oracle services.
    * Some mapping between data and basic information like Category enumeration to int. 


