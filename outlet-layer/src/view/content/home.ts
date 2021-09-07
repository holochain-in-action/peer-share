import { BaseContent } from "../BaseContent";
import { customElement } from "lit/decorators.js";
import { html } from "lit";
@customElement("app-home")
export class Home extends BaseContent {
    authorized(): boolean {
        return true;
    }
    render_me(): unknown {
        return html`<h1>This is Home content</h1>`

    }


}