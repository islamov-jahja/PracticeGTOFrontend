import {autobind} from "core-decorators";
import {CoachProfileStore} from "./CoachProfileStore";

@autobind
export class CoachProfileController {
    protected store: CoachProfileStore;

    constructor(store: CoachProfileStore) {
        this.store = store;
    }

    onComponentDidMount(): void {
        this.store.transport
            .getUserTeams()
            .then(this.store.onSuccessGetTeams)
            .catch(this.store.onError)
    }
}