import React from "react";
import {observer} from "mobx-react";
import {autobind} from "core-decorators";
import {TabsStore} from "./TabsStore";
import {ITabsProps} from "./ITabsProps";
import {isEmpty} from "lodash";
import "./Tabs.scss";
import {TabsController} from "./TabsController";
import classNames from "classnames";

@observer
@autobind
export class Tabs extends React.Component<ITabsProps> {
    private readonly store = new TabsStore();
    private readonly controller = new TabsController(this.store);

    componentDidMount(): void {
        this.store.tabs = this.props.tabs.map(item => {
            let id = item.id;
            if (isEmpty(id)) {
                id = (~~(Math.random() * 1e8)).toString(16)
            }

            return {
                id: id,
                ...item
            }
        });
    }

    render(): React.ReactNode {
        let propsClass = this.props.classNameHeading || "";
        let tabClasses = classNames({
            [propsClass]: true,
            "tabs__heading": true,
            "main": this.props.isMain
        });

        return (
            <div className={"tabs"}>
                <div className={tabClasses}>
                    {
                        this.store.tabs.map(item => {
                            return (
                                <div
                                    className={item.isActive ? "tab -active" : "tab"}
                                    onClick={() => this.controller.switchTab(item.id)}
                                    key={item.id}
                                >{item.name}
                                </div>
                            )
                        })
                    }
                </div>
                {
                    this.store.tabs.map(item => {
                        return (
                            item.isActive
                                ? <div
                                    className={"tab__body"}
                                    key={item.id}
                                >
                                    {item.component}
                                </div>
                                : void 0
                        );
                    })
                }
            </div>
        )
    }
}