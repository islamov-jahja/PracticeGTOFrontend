import React from "react";
import Select from "react-select";
import {OrgFormStore} from "./OrgFormStore";
import {OrgFormController} from "./OrgFormController";
import {IOrgFormProps} from "./IOrgFormProps";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import "./Form.scss";
import classNames from "classnames";

@autobind
@observer
export class OrgForm extends React.Component<IOrgFormProps> {
    protected readonly store = new OrgFormStore();
    protected readonly controller = new OrgFormController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount(this.props);
    }

    render(): React.ReactNode {
        return (
            <section className={"invite-section"}>
                <form className={"form"} onSubmit={this.controller.handleSubmit}>
                    {
                        this.store.isEditForm ?
                            <Select
                                isSearchable={true}
                                options={
                                    this.store.orgsList.map(item => {
                                        return {
                                            value: item.id, label: item.name
                                        }
                                    })
                                }
                                className="react-select-container"
                                classNamePrefix="react-select"
                                placeholder={"Выберите организацию"}
                                onChange={this.controller.onChange}
                            />
                            : void 0
                    }
                    <label className={"form__name label"}>
                        Название:
                        <input name="name" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.name}/>
                    </label>
                    <label className={"form__address label"}>
                        Адрес:
                        <input name="address" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.address}/>
                    </label>
                    <label className={"form__leader label"}>
                        Ответственное лицо:
                        <input name="leader" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.leader}/>
                    </label>
                    <label className={"label"}>
                        Номер телефона:
                        <input name="phoneNumber" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.phoneNumber}/>
                    </label>
                    <label className={"label"}>
                        ОГРН:
                        <input name="oqrn" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.oqrn}/>
                    </label>
                    <label className={"label"}>
                        Лицевой счёт:
                        <input name="paymentAccount" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.paymentAccount}/>
                    </label>
                    <label className={"label"}>
                        Филиал:
                        <input name="branch" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.branch}/>
                    </label>
                    <label className={"label"}>
                        БИК:
                        <input name="bik" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.bik}/>
                    </label>
                    <label className={"label"}>
                        Расчётный счёт:
                        <input name="correspondentAccount" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.correspondentAccount}/>
                    </label>

                    <input type={"submit"} className={"form__button"} value="Сохранить"/>
                    {
                        this.store.isPopupVisible ?
                            <div className={"popup-wrapper"}>
                                <div className={classNames({
                                    "popup": true,
                                    "-type-error": this.store.isError
                                })}>
                                    {this.store.popupText}
                                    <div className={"popup__close-icon"} onClick={this.controller.handleCloseClick}/>
                                </div>
                            </div>
                            : void 0
                    }
                </form>
            </section>
        )
    }
}