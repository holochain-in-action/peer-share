import { html } from "lit";
import { BaseComponent } from "../BaseComponent";
import { customElement } from "lit/decorators.js";

@customElement("right-header")
class RightHeader extends BaseComponent {
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
  }
  render() {
    return html`
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          ${this.state.loggedin
        ? html` <button
                type="button"
                class="btn btn-outline-danger"
                @click="${this._signoutclick}"
              >
                Sign Out
              </button>`
        : html`
                <button
                  type="button"
                  class="btn btn-outline-success"
                  data-bs-toggle="modal"
                  data-bs-target="#inlineForm"
                >
                  Sign In
                </button>
              `}
        </li>
      </ol>

      <div
        class="modal fade text-left"
        id="inlineForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel33"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel33">Login Form</h4>
              <button
                type="button"
                class="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <i data-feather="x"></i>
              </button>
            </div>
            <form action="#">
              <div class="modal-body">
                <label>Email: </label>
                <div class="form-group">
                  <input
                    id="email"
                    type="text"
                    placeholder="Email Address"
                    class="form-control"
                  />
                </div>
                <label>Password: </label>
                <div class="form-group">
                  <input
                    type="password"
                    placeholder="Password"
                    class="form-control"
                  />
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-light-secondary"
                  data-bs-dismiss="modal"
                  id="closemodal"
                >
                  <i class="bx bx-x d-block d-sm-none"></i>
                  <span class="d-none d-sm-block">Close</span>
                </button>
                <button
                  type="button"
                  class="btn btn-primary ml-1"
                  @click="${this._loginclick}"
                >
                  <i class="bx bx-check d-block d-sm-none"></i>
                  <span class="d-none d-sm-block">login</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  _loginclick(e: any) {
    let email = (<HTMLInputElement>document.getElementById("email")).value;
    let isAdmin = false;
    if (email == "hedayat") isAdmin = true;
    this.setState({
      loggedin: true,
      agentkey: "eg432fgES67hgs452dfg",
      isadmin: isAdmin,
    });
    (<HTMLInputElement>document.getElementById("closemodal")).click();
  }
  _signoutclick(e: any) {
    this.setState({
      loggedin: false,
      agentkey: "",
      isadmin: false,
    });
    document.location.href = "/";
  }
}
