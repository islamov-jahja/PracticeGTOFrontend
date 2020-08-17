import {autobind} from "core-decorators";
import React from "react";
import {IPopupProps} from "./IPopupProps";
import classNames from "classnames";
import {PopupStore} from "./PopupStore";
import {PopupController} from "./PopupController";
import {attempt} from "lodash";
import {observer} from "mobx-react";

@autobind
@observer
export class Popup extends React.Component<IPopupProps> {
    private readonly store = new PopupStore();
    private readonly controller = new PopupController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount(this.props);
    }

    componentDidUpdate(prevProps: IPopupProps): void {
        this.controller.onComponentDidUpdate(this.props, prevProps);
    }

    render(): React.ReactNode {
        return (
            this.store.isVisible
                ? <div className={"popup-wrapper"}>
                    <div className={classNames({
                        "popup": true,
                        "-type-error": this.props.isError
                    })}>
                        {this.props.popupText}
                        <div className={"popup__close-icon"} onClick={this.handleCloseClick}/>
                    </div>
                </div>
                : <div/>
        )
    }

    private handleCloseClick(): void {
        attempt(this.props.onClose!);
        this.controller.handleCloseClick();

    }
}