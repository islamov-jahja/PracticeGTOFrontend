import React from "react";
import {InputField} from "../../components/input-field";
import {observer} from "mobx-react";
import {autobind} from "core-decorators";
import {ConfirmRegistrationStore} from "./ConfirmRegistrationStore";
import {ConfirmRegistrationController} from "./ConfirmRegistrationController";
import classNames from "classnames";

@observer
@autobind
export class ConfirmRegistration extends React.Component {
    private readonly store = new ConfirmRegistrationStore();
    private readonly controller = new ConfirmRegistrationController(this.store);

    componentWillMount(): void {
      this.controller.onComponentWillMount();
    }

    render(): React.ReactNode {
        return (
            <div className={"login"}>
                <div className={"form"}>
                    <div className={"form__content"}>
                        <h1 className={"header"}>Регистрация</h1>
                        <p className={"sub-header"}>Заполните поля для завершения регистрации</p>
                        <div>
                            <p className={"field-name"}>Email</p>
                            <input className={"input__field read-only"} readOnly={true} value={this.store.email}/>
                        </div>
                        <div>
                            <p className={"field-name"}>Пароль</p>
                            <InputField type={"password"} setValue={this.store.setPassword}/>
                        </div>
                        <div>
                            <p className={"field-name"}>Повторите пароль</p>
                            <InputField type={"password"} setValue={this.store.setRepeatPassword}/>
                        </div>
                        <div onClick={this.controller.onSubmit} className={"button"}>Зарегестрироваться</div>
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