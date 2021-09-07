import { BehaviorSubject } from "rxjs";

export interface State {
    loggedin: boolean;
    agentkey: string,
    isadmin: boolean
}

export class Store {
    subject: any;
    state: any;
    private static instance: Store;
    static getInstance(): Store {
        if (!this.instance) {
            this.instance = new this();
        }
        return this.instance;
    }
    constructor() {
        this.subject = new BehaviorSubject({
            state: {
                loggedin: false,
                agentkey: "",
                isadmin: false,
            },
        });

        this.state = this.subject.asObservable();
    }

    getStore() {
        return this.state;
    }

    setState(value: State) {
        const state = { state: value };
        this.subject.next({ ...this.subject.value, ...state });
    }

}