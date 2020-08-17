import {isUndefined, attempt, isEqual} from "lodash";
import {InputFieldStore} from "./InputFieldStore";

export class InputFieldController {
    private readonly store: InputFieldStore;

    constructor(store: InputFieldStore) {
        this.store = store;
    }

    onComponentDidMount(defaultValue?: string, setValue?: (value: string) => void): void {
        if (isUndefined(defaultValue)) {
            return;
        }
        this.store.defaultValue = defaultValue;
        attempt(setValue!, this.store.value);
    }

    onComponentDidUpdate(newDefVal?: string): void {
        if (isEqual(newDefVal, this.store.defaultValue)) {
            return;
        }
        this.store.value = newDefVal || "";
    }
}