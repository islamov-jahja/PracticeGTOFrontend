import {PopupStore} from "./PopupStore";
import {IPopupProps} from "./IPopupProps";
import {autobind} from "core-decorators";

@autobind
export class PopupController {
    private readonly store: PopupStore;

    constructor(store: PopupStore) {
        this.store = store;
    }

    onComponentDidMount(props: IPopupProps): void {
        this.store.isVisible = props.isVisible;
    }

    onComponentDidUpdate(props: IPopupProps, prevProps: IPopupProps): void {
        if (props.isVisible == prevProps.isVisible) return;

        this.store.isVisible = props.isVisible;
    }

    handleCloseClick(): void {
        this.store.isVisible = false;
    }
}