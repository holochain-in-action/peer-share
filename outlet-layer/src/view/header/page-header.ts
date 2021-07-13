import { html } from "lit";
import { BaseComponent } from "../BaseComponent";
import "./right-header";
import { customElement } from "lit/decorators.js";

@customElement("page-header")
class PageHeader extends BaseComponent {
  render() {
    return html`
      <div class="page-title">
        <div class="row">
          <div class="col-12 col-md-6 order-md-1 order-last">
            <h1 id="header">Holochain in Action (PeerShare)</h1>
            <!-- <p class="text-subtitle text-muted">
            Multiple form layout you can use
          </p> -->
          </div>
          <div class="col-12 col-md-6 order-md-2 order-first">
            <nav
              aria-label="breadcrumb"
              class="breadcrumb-header float-start float-lg-end"
            >
              <right-header></right-header>
            </nav>
          </div>
        </div>
      </div>
      <style>
        h1#header {
          border-bottom: 4px solid #57c4d0;
          padding: 0 0 5px 0;
        }
        .page-title {
          padding: 0 0 50px 0 !important;
        }
      </style>
    `;
  }
}
