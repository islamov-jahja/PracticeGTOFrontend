import React from "react";
import {RegistrationStore} from "./RegistrationStore";
import {RegistrationController} from "./RegistrationController";
import {observer} from "mobx-react";
import {autobind} from "core-decorators";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {EGender} from "../calculator/EGender";
import {Radio} from "../../components/radio-button";
import classNames from "classnames";

@observer
@autobind
export class Registration extends React.Component {
    private readonly store = new RegistrationStore();
    private readonly controller = new RegistrationController(this.store);

    render(): React.ReactNode {
        let date = this.store.formValues.dateOfBirth == "" ? new Date() : new Date(this.store.formValues.dateOfBirth);

        return (
            <div className={"login"}>
                <div className={"form"}>
                    <form className={"form__content"} onSubmit={this.controller.onSubmit}>
                        {
                            this.store.message !== "" && !this.store.isError
                                ? void 0 //успешно зарегестрировались
                                : (
                                    <div>
                                        <h1 className={"header"}>Регистрация</h1>
                                        <p className={"sub-header"}>Заполните поля для регистрации</p>
                                        <div>
                                            <p className={"field-name"}>Email</p>
                                            <input name={"email"} className={"input__field"}
                                                   onChange={this.controller.handleInputChange}
                                                   value={this.store.formValues.email}/>
                                        </div>
                                        <div>
                                            <p className={"field-name"}>Имя</p>
                                            <input type={"text"} className={"input__field"}
                                                   onChange={this.controller.handleInputChange}
                                                   name={"name"} value={this.store.formValues.name}/>
                                        </div>
                                        <div className={"date"}>
                                            <p className={"field-name"}>Дата рожджения:</p>
                                            <DatePicker
                                                onChange={this.controller.setDateOfBirth}
                                                selected={date}
                                                className="input__field"
                                                maxDate={new Date()}
                                            />
                                        </div>
                                        <div>
                                            <p className={"field-name"}>Пол:</p>
                                            <Radio values={[EGender.MALE, EGender.FEMALE]}
                                                   onChange={this.controller.onRadioChange}/>
                                        </div>
                                        <input type={"submit"} className={"login__button"} value={"Зарегестрироваться"}/>
                                    </div>
                                )
                        }
                        {
                            this.store.message !== ""
                                ? <div className={classNames({
                                    "message": true,
                                    "-error": this.store.isError
                                })}>{this.store.message}</div>
                                : void 0
                        }
                    </form>
                </div>
            </div>
        )
    }
}