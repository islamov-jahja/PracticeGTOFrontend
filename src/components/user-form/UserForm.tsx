import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {EGender} from "../../screens/calculator/EGender";
import classNames from "classnames";
import {UserFormStore} from "./UserFormStore";
import {IUserFormProps} from "./IUserFormProps";
import {UserFormController} from "./UserFormController";
import {Radio} from "../radio-button";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import {Popup} from "../popup/Popup";

@autobind
@observer
export class UserForm extends React.Component<IUserFormProps> {
    private readonly store = new UserFormStore();
    private readonly controller = new UserFormController(this.store);

    componentDidMount(): void {
        this.store.formType = this.props.formType;
        this.store.successMessage = this.props.successMessage;
        this.store.id = this.props.id;
        this.store.onSuccessImpl = this.props.onSuccess;
    }

    componentDidUpdate(prevProps: IUserFormProps): void {
        if (prevProps.formType == this.store.formType) return;
        this.store.formType = this.props.formType;
    }

    render(): React.ReactNode {
        let date = this.store.formValues.dateOfBirth == "" ? new Date() : new Date(this.store.formValues.dateOfBirth);
        return (
            <form className={"form -type-admin"} onSubmit={this.controller.handleSubmit}>
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
                        ? <div className={"label__container"}>
                            <label>
                                ФИО:
                                <input className={"form__input"} name="name"
                                       onChange={this.controller.handleInputChange}
                                       value={this.store.formValues.name}/>
                            </label>
                            <div className={"gender"}>
                                <span>Пол: </span>
                                <Radio values={[EGender.MALE, EGender.FEMALE]} onChange={this.controller.onChangeGender}/>
                            </div>
                            <label className={"form__address label"}>
                                Дата рожджения:
                                <DatePicker
                                    onChange={this.controller.setDateOfBirth}
                                    selected={date}
                                />
                            </label>
                            <label>
                                Почта:
                                <input className={"form__input"} name="email"
                                       onChange={this.controller.handleInputChange}
                                       type={"email"} value={this.store.formValues.email}/>
                            </label>
                        </div>
                        :
                        <label className={"label"}>
                            E-mail:
                            <input name="email" type={"email"}
                                   onChange={this.controller.handleInputEmailChange}
                                   value={this.store.formValues.email}/>
                        </label>
                }

                <input className={"label form__button"} type={"submit"} value="Сохранить"/>
                <Popup
                    isVisible={this.store.isPopupVisible}
                    isError={this.store.isError}
                    popupText={this.store.message}
                    onClose={this.controller.handleClose}
                />
            </form>
        )
    }
}