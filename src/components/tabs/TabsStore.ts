import {autobind} from "core-decorators";
import {observable} from "mobx";
import {ITab} from "./ITab";

@autobind
export class TabsStore {
    @observable tabs: ITab[] = [];
}