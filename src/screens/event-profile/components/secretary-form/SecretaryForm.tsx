import * as React from "react";
import {autobind} from "core-decorators";
import {EGender} from "../../../calculator/EGender";
import {Radio} from "../../../../components/radio-button";
import {SecretaryFormStore} from "./SecretaryFormStore";
import {SecretaryFormController} from "./SecretaryFormController";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {observer} from "mobx-react";
import {ISecretaryFormProps} from "./ISecretaryFormProps";

@autobind
@observer
export class SecretaryForm extends React.Component<ISecretaryFormProps> {
    private readonly store = new SecretaryFormStore();
    private readonly controller = new SecretaryFormController(this.store);

    componentDidMount(): void {
       this.controller.onComponentDidMount(this.props);
    }

    render(): React.ReactNode {
        let date = this.store.formValues.dateOfBirth == "" ? new Date() : new Date(this.store.formValues.dateOfBirth);

        return (
            <div>
                <form className={"form -type-secretary"} onSubmit={this.controller.handleSubmit}>
                    <div className={"form-toggle"}>
                        <label>
                            Пригласить нового пользователя
                            <input type={"radio"} checked={this.store.isAddChecked}
                                   onChange={this.controller.onChangeRadio}/>
                        </label>
                        <label>
                            Выбрать существующего пользователя
                            <input type={"radio"} checked={!this.store.isAddChecked}
                                   onChange={this.controller.onChangeRadio}/>
                        </label>
                    </div>
                    {
                        this.store.isAddChecked
                            ?
                            <div className={"label__container"}>
                                <div className={"gender"}>
                                    <span>Пол: </span>
                                    <Radio values={[EGender.MALE, EGender.FEMALE]}
                                           onChange={this.controller.onChangeGender}/>
                                </div>
                                <label className={"label"}>
                                    ФИО:
                                    <input className={"form__input"} name="name"
                                           onChange={this.controller.handleInputChange}
                                           value={this.store.formValues.name}/>
                                </label>
                                <label className={"form__address label"}>
                                    Дата рожджения:
                                    <DatePicker
                                        onChange={this.controller.setDateOfBirth}
                                        selected={date}
                                    />
                                </label>
                                <label className={"label"}>
                                    Почта:
                                    <input className={"form__input"} name="email" type={"email"}
                                           onChange={this.controller.handleInputChange}
                                           value={this.store.formValues.email}/>
                                </label>
                            </div>
                            : <label className={"label"}>
                                E-mail:
                                <input name="email" type={"email"}
                                       onChange={this.controller.handleInputEmailChange}
                                       value={this.store.email}/>
                            </label>
                    }
                    <input className={"label form__button"} type={"submit"} value={"Сохранить"}/>
                </form>
            </div>
        )
    }
}