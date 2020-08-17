import {UserProfileStore} from "./UserProfileStore";
import {autobind} from "core-decorators";

@autobind
export class UserProfileController {
    protected store: UserProfileStore;

    constructor(store: UserProfileStore) {
        this.store = store;
    }

    onComponentDidMount(): void {
        this.store.transport
            .getUserEvents()
            .then(this.store.onSuccessGetEvents)
            .catch(this.store.onError)
    }
}