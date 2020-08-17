import {TabsStore} from "./TabsStore";
import {autobind} from "core-decorators";
import {computed} from "mobx";

@autobind
export class TabsController {
    private readonly store: TabsStore;

    constructor(store: TabsStore) {
        this.store = store;
    }

    switchTab(id?: string): void {
        if (!id) return;

        this.store.tabs.map(item =>{
            item.isActive = id === item.id;
        })
    }
}