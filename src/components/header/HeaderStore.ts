import {observable} from "mobx";
import {Store} from "../store";

export class HeaderStore extends Store {
    @observable isMenuVisible = false;
}