import { BaseContent } from "../BaseContent";
import { html } from "lit";
import { customElement } from "lit/decorators.js";
@customElement("my-channels")
export class Channels extends BaseContent {
    authorized(): boolean {
        return this.state.loggedin;
    }
    render_me(): unknown {
        return html`
       <div class="col-xl-12 col-md-12 col-sm-12">
        <div class="card">
          <div class="card-content">
            <div class="card-body">
              <h4 class="card-title">My Channels</h4>
              <p>This is the list of channels</p>
              <table>
                <tr>
                  <td>Id:1</td>
                  <td>
                    <a href="/mychannel/1?extraparam=anyData">Go TO Channel Id: 1</a>
                  </td>
                </tr>
                <tr>
                  <td>Id:2</td>
                  <td>
                    <a href="/mychannel/2?extraparam=2">Go TO Channel Id: 2</a>
                  </td>
                </tr>
                <tr>
                  <td>Id:3</td>
                  <td>
                    <a href="/mychannel/3?extraparam=3">Go TO Channel Id: 3</a>
                  </td>
                </tr>
                <tr>
                  <td>Id:4</td>
                  <td>
                    <a href="/mychannel/4?extraparam=4">Go TO Channel Id: 4</a>
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
       `;

    }

}