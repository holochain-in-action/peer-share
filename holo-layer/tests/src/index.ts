import { Orchestrator } from "@holochain/tryorama";

let orchestrator = new Orchestrator();
require("./who_am_i")(orchestrator);
orchestrator.run();

orchestrator = new Orchestrator();
require("./progenitors")(orchestrator);
orchestrator.run();