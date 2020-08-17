import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {EventFormStore} from "./EventFormStore";
import {EventFormController} from "./EventFormController";
import {Popup} from "../../../../components/popup/Popup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

@autobind
@observer
export class EventForm extends React.Component {
    protected readonly store = new EventFormStore();
    protected readonly controller = new EventFormController(this.store);

    render(): React.ReactNode {
        let startDate = this.store.formValues.startDate == "" ? new Date() : new Date(this.store.formValues.startDate);
        let expirationDate = this.store.formValues.expirationDate == "" ? new Date() : new Date(this.store.formValues.expirationDate);
        return (
            <section className={"add-event-section"}>
                <form className={"form"} onSubmit={this.controller.handleSubmit}>
                    <label className={"form__name label"}>
                        Название:
                        <input name="name" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.name}/>
                    </label>
                    <label className={"form__address label"}>
                        Дата начала:
                        <DatePicker
                            onChange={this.controller.setStartDate}
                            selected={startDate}
                        />
                    </label>
                    <label className={"form__leader label"}>
                        Дата окончания:
                        <DatePicker
                            onChange={this.controller.setExpirationDate}
                            selected={expirationDate}
                        />
                    </label>
                    <label className={"label form__description"}>
                        Описание:
                        <textarea rows={5} name="description" onChange={this.controller.handleInputChange}
                               value={this.store.formValues.description}/>
                    </label>

                    <input className={"form__button"} type={"submit"} value="Сохранить"/>
                    <Popup
                        isVisible={this.store.isPopupVisible}
                        isError={this.store.isError}
                        popupText={this.store.popupText}
                        onClose={this.controller.handleClose}
                    />
                </form>
            </section>
        )
    }
}