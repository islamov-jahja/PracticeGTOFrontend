import * as React from "react";
import {MenuStore} from "./MenuStore";
import {autobind} from "core-decorators";
import "./Menu.scss";
import {IMenuProps} from "./IMenuProps";
import {UserStore} from "../user-store";
import {observer} from "mobx-react";
import classNames from "classnames";

@autobind
@observer
export class Menu extends React.Component<IMenuProps> {
    private readonly store = new MenuStore();

    render(): React.ReactNode {
        return (
            <div className={classNames({"menu": true, "-show": this.props.isVisible})}>
                <div className={"menu__items"}>
                    {this.getItems()}
                </div>
            </div>
        )
    }

    private getItems(): React.ReactNode {
        return (
            this.store.items.map((item, index) => (
                <a className={"menu-item"} key={index} href={item.link}>
                   {item.title}
                </a>
            ))
        )
    }
}