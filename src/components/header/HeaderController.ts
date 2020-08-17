import {HeaderStore} from "./HeaderStore";
import {autobind} from "core-decorators";
import {ERoles, UserStore} from "../user-store";

@autobind
export class HeaderController {
    private readonly store: HeaderStore;

    constructor(store: HeaderStore) {
        this.store = store;
    }

    logout(): void {
        localStorage.clear();
        if (window.location.pathname) {

        }
    }

    onMenuOutsideClick(event: MouseEvent): void {
        const target: unknown = event.target;
        const menu = document.getElementsByClassName("menu");
        const menuIcon = document.getElementsByClassName("header__menu");
        if (!menu || !menuIcon) {
            return;
        }
        if (!menu[0].contains(target as Node) && !menuIcon[0].contains(target as Node)) {
           this.store.isMenuVisible = false;
        }
    }

    onMenuClick(): void {
        this.store.isMenuVisible = !this.store.isMenuVisible;
    }
}