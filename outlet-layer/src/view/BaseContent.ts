import { RouterLocation } from "@vaadin/router";
import { html } from "lit"
import { BaseComponent } from "./BaseComponent"
import { property } from "lit/decorators.js";
export abstract class BaseContent extends BaseComponent {

    @property()
    location!: RouterLocation;
    abstract authorized(): boolean;
    abstract render_me(): unknown;

    render() {
        if (this.authorized() == true) { return this.render_me(); }
        else {
            return html`Access is Denied`;
        }

    }

    public onBeforeEnter(routerlocation: RouterLocation) {
        this.location = routerlocation;
    }

    getUrlParam(name: string) {
        const section = this.location.params.section;
        return new URLSearchParams(location.search).get(name);
    }

}