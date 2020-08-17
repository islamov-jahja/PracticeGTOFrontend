import {autobind} from "core-decorators";
import {SecretaryProfileStore} from "./SecretaryProfileStore";

@autobind
export class SecretaryProfileController {
    protected store: SecretaryProfileStore;

    constructor(store: SecretaryProfileStore) {
        this.store = store;
    }

    onComponentDidMount(): void {
        this.store.transport
            .getSecretaryEvents()
            .then(this.store.onSuccessGetEvents)
            .catch(this.store.onError)
    }
}