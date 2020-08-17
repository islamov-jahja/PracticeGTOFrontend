import {LoginStore} from "./LoginStore";
import {autobind} from "core-decorators";

@autobind
export class LoginController {
    private readonly store: LoginStore;

    constructor(store: LoginStore) {
        this.store = store;
    }

    onSubmit(): void {
        const params = {
            email: this.store.email,
            password: this.store.password
        };
        this.store.transport
            .login(params)
            .then(this.store.onSuccess)
            .catch(this.store.onError);
    }
}