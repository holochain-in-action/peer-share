import { Orchestrator } from "@holochain/tryorama";

let orchestrator = new Orchestrator();
require("./who_am_i")(orchestrator);
orchestrator.run();