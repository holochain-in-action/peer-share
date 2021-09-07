import "../src/view/navigation/sidebar-navi";
import "./view/header/page-header";
import "./view/content/home";
import "./router";

import { Store } from "./AppState";

Store.getInstance().setState({
    loggedin: false,
    isadmin: false,
    agentkey: ""
});