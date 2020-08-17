import React from "react";
import {IRadioProps} from "./IRadioProps";
import {autobind} from "core-decorators";
import {RadioStore} from "./RadioStore";
import {isEmpty, isEqual} from "lodash";
import "./Radio.scss";
import classNames from "classnames";
import {observer} from "mobx-react";

@autobind
@observer
export class Radio extends React.Component<IRadioProps> {
    private readonly store = new RadioStore();

    componentDidMount(): void {
        this.store.items = this.props.values.map(value => {
            return {title: value, isChecked: false}
        });
        if (isEmpty(this.store.items)) {
            return;
        }
        this.store.items[0].isChecked = true;
    }

    render(): React.ReactNode {
        return (
            <div className={"radio-form"}>
                {
                    this.store.items.map((item, index) => (
                            <div key={index} className={"radio-form__item"} onClick={() => this.onClickItem(index)}>
                                <div className={classNames({
                                    "radio-form__button": true,
                                    "checked": item.isChecked,
                                })}/>
                                <span>{item.title}</span>
                            </div>
                        )
                    )
                }
            </div>
        )
    }

    onClickItem(selectedIndex: number): void {
        this.store.items.map((item, index) =>
            item.isChecked = selectedIndex === index
        );
        if (!this.props.onChange) {
            return;
        }
        this.props.onChange(this.store.items[selectedIndex].title);
    }
}