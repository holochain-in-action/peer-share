import { Orchestrator } from "@holochain/tryorama";

let orchestrator = new Orchestrator();
// require("./am_i_developer")(orchestrator);
// orchestrator.run();

// orchestrator = new Orchestrator();
// require("./who_am_i")(orchestrator);
// orchestrator.run();

// orchestrator = new Orchestrator();
// require("./progenitor")(orchestrator);
// orchestrator.run();

orchestrator = new Orchestrator();
require("./schema-tests")(orchestrator);
orchestrator.run();

// orchestrator = new Orchestrator();
// require("./test2agents")(orchestrator);
// orchestrator.run();
