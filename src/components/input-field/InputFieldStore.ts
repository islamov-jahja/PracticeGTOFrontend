import {autobind} from "core-decorators";
import {observable} from "mobx";

@autobind
export class InputFieldStore {
    @observable value = "";
    @observable defaultValue?: string;
}