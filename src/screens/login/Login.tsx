import React from "react";
import "./Login.scss";
import {InputField} from "../../components/input-field";
import {LoginStore} from "./LoginStore";
import {autobind} from "core-decorators";
import {LoginController} from "./LoginController";
import {EPath} from "../../EPath";
import classNames from "classnames";
import {observer} from "mobx-react";

@autobind
@observer
export class Login extends React.Component {
    private readonly store = new LoginStore();
    private readonly controller = new LoginController(this.store);

    render(): React.ReactNode {
        return (
            <div className={"login"}>
                <div className={"form"}>
                    <div className={"form__content"}>
                        <h1 className={"header"}>Вход</h1>
                        <p className={"sub-header"}>Заполните поля для входа</p>
                        <div>
                            <p className={"field-name"}>Email</p>
                            <InputField setValue={this.store.setEmail}/>
                        </div>
                        <div>
                            <p className={"field-name"}>Пароль</p>
                            <InputField type={"password"} setValue={this.store.setPassword}/>
                        </div>
                        <div className={"login__button"} onClick={this.controller.onSubmit}>Войти</div>
                        <a className={"link"} href={EPath.REGISTRATION}>Регистрация</a>
                        {
                            this.store.message !== ""
                                ? <div className={classNames({
                                    "message": true,
                                    "-error": this.store.isError
                                })}>{this.store.message}</div>
                                : void 0
                        }
                    </div>
                </div>
            </div>
        )
    }
}