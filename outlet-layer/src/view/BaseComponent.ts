import { css, LitElement } from "lit";
import { property } from "lit/decorators.js";
import { Subscription } from "rxjs";
import { State, Store } from "../AppState";
import { pluck } from "rxjs/operators";
export class BaseComponent extends LitElement {
    @property()
    state!: State;

    @property()
    store!: Store;

    @property()
    subscription: Subscription;

    constructor() {
        super();
        this.store = Store.getInstance();
        this.subscription = new Subscription();
    }

    connectedCallback() {
        super.connectedCallback();
        const sub = this.store
            .getStore()
            .pipe(pluck("state"))
            .subscribe((x: State) => this.__updateState(x));
        this.subscription.add(sub);
    }

    __updateState(val: State) {
        this.state = val;
    }

    setState(val: State) {
        this.store.setState(val);
    }

    createRenderRoot() {
        return this;
    }
}
