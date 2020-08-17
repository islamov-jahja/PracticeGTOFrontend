import React from "react";
import "./Header.scss";
import {Menu} from "../menu";
import {observer} from "mobx-react";
import {HeaderStore} from "./HeaderStore";
import {autobind} from "core-decorators";
import {HeaderController} from "./HeaderController";
import EventListener from "react-event-listener";
import {EPath} from "../../EPath";
import {UserStore} from "../user-store";

@observer
@autobind
export class Header extends React.Component {
    private readonly store = new HeaderStore();
    private readonly controller = new HeaderController(this.store);

    render(): React.ReactNode {
        return (
            <div>
                <Menu isVisible={this.store.isMenuVisible}/>
                <div className={"header"}>
                    <div className={"header__container"}>
                        <div className="header__menu icon" onClick={this.controller.onMenuClick}/>
                        <div className="header__logo">
                            <a href={EPath.HOME} className={"header__logo-link"}/>
                            <div className="header__logo-icon"/>
                            <span className="header__logo-text">ГТО - СЕРВИС</span>
                        </div>
                        <div>
                            {
                                UserStore.getInstance().isLogin()
                                    ?
                                    <div className={"header__controls"}>
                                        <a href={EPath.LOGIN} className="header__login icon"/>
                                        <a href={EPath.PROFILE} className="header__profile icon"/>
                                        {/*<span onClick={this.controller.logout} className="header__logout icon"/>*/}
                                    </div>
                                    : <a href={EPath.LOGIN} className="header__login icon"/>
                            }
                        </div>
                    </div>
                </div>
                <EventListener target={document} onClick={this.controller.onMenuOutsideClick}/>
            </div>
        )
    }
}