import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { BaseContent } from "../BaseContent";

@customElement("not-found")
export class NotFound extends BaseContent {
    authorized(): boolean {
        return true;
    }

    render_me(): unknown {
        return html` <h1>404</h1>
      <p>
        You've tried to open
        <span style="color:red"> ${this.location.pathname} </span> which is not
        exist :(
      </p>`;
    }
}
