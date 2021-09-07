import { html } from "lit";
import { BaseComponent } from "../BaseComponent";
import { customElement } from "lit/decorators.js";

@customElement("sidebar-navi")
class SidebarNavi extends BaseComponent {
  constructor() {
    super();
  }
  renderScript() {
    let script = document.createElement("script");
    script.src = "assets/js/main.js";
    return script;
  }

  render() {
    return html`
      <div id="sidebar" class="active">
        <div class="sidebar-wrapper active">
          <div class="sidebar-header">
            <div class="d-flex justify-content-between">
              <div class="logo">
                <a href="index.html"
                  ><img src="assets/images/logo/logo.png" alt="Logo" srcset=""
                /></a>
              </div>
              <div class="toggler">
                <a href="#" class="sidebar-hide d-xl-none d-block"
                  ><i class="bi bi-x bi-middle"></i
                ></a>
              </div>
            </div>
          </div>
          <div class="sidebar-menu">
            <ul class="menu">
              <li class="sidebar-title">Menu</li>

              <li class="sidebar-item">
                <a href="/" class="sidebar-link" data-link>
                  <i class="bi bi-grid-fill"></i>
                  <span>Home</span>
                </a>
              </li>
              <li class="sidebar-item">
                <a href="/search" class="sidebar-link" data-link>
                  <i class="bi bi-search"></i>
                  <span>Search</span>
                </a>
              </li>
              ${this.state.loggedin
        ? html`
                    <li class="sidebar-item">
                      <a href="/mychannels" class="sidebar-link" data-link>
                        <i class="bi bi-cast"></i>
                        <span>My Channels</span>
                      </a>
                    </li>
                    <li class="sidebar-item">
                      <a href="/subs" class="sidebar-link" data-link>
                        <i class="bi bi-view-list"></i>
                        <span>Subscriptions</span>
                      </a>
                    </li>
                    <li class="sidebar-item">
                      <a href="/account" class="sidebar-link" data-link>
                        <i class="bi bi-gear"></i>
                        <span>My Account</span>
                      </a>
                    </li>
                  `
        : ""}
              ${this.state.loggedin && this.state.isadmin
        ? html`
                    <li class="sidebar-item">
                      <a href="/payoptions" class="sidebar-link" data-link>
                        <i class="bi bi-credit-card"></i>
                        <span>Payment Options</span>
                      </a>
                    </li>

                    <li class="sidebar-item">
                      <a href="/adminpanel" class="sidebar-link" data-link>
                        <i class="bi bi-person-circle"></i>
                        <span>Admin Panel</span>
                      </a>
                    </li>
                  `
        : ""}
            </ul>
          </div>
          <button class="sidebar-toggler btn x">
            <i data-feather="x"></i>
          </button>
        </div>
      </div>
      ${this.renderScript()}
    `;
  }
}
