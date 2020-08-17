import {observable} from "mobx";
import {IRadioItem} from "./IRadioItem";

export class RadioStore {
    @observable items: IRadioItem[] = [];
}