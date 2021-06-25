import { AppWebsocket } from "@holochain/conductor-api";

window.Buffer = require("buffer/").Buffer; // hack

class Index {
  constructor() {
    let btn = document.getElementById("btnCallZomeFn");
    btn?.addEventListener("click", (e) => this.click(e));
  }

  async click(e) {
    const appid = document.getElementById("txt_appid").value;
    const port = document.getElementById("txt_port").value;
    const fnname = document.getElementById("txt_fn").value;
    const payload = document.getElementById("txt_payload").value;

    const result = await this.call_zome_fn(port, appid, fnname, payload);

    console.log(result);
  }

  async call_zome_fn(port, appid, fnname, payload = null) {
    const appConnection = await AppWebsocket.connect("ws://localhost:" + port);
    const appInfo = await appConnection.appInfo({
      installed_app_id: appid,
    });
    const cellId = appInfo.cell_data[0].cell_id;
    // try {
    const param = {
      cap: null,
      cell_id: cellId,
      zome_name: "peershare",
      fn_name: fnname,
      provenance: cellId[1],
    };

    // add Payload to Param if there is a value to send to zome
    if (payload && !/\s/.test(payload)) param.payload = payload;

    const message = await appConnection.callZome(param);
    return message;
    // } catch (error) {
    //   return error;
    // }
  }
}

new Index();
