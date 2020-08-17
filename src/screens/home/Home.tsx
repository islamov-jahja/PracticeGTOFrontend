import * as React from "react";
import {autobind} from "core-decorators";
import "./Home.scss";
import {HomeStore} from "./HomeStore";

@autobind
export class Home extends React.Component {
    private readonly store = new HomeStore();

    render(): React.ReactNode {
        return (
            <div className={"home"}>
                <div className={"cards"}>
                    {
                        this.store.cards.map((item, index) =>
                            <div key={index} className={`card ${item.className}`}>
                                <a className={"card__link"} href={item.link}/>
                                <div className={"card__content"}>
                                    <div className={`card__img ${item.className}`}/>
                                    <div className={"card__title"}>{item.title}</div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    }
}