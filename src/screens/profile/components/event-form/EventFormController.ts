import {EventFormStore} from "./EventFormStore";
import {autobind} from "core-decorators";
import * as React from "react";
import {UserStore} from "../../../../components/user-store";
import {isEmpty} from "lodash";
import {getFormattedDate} from "../../../../services/utils";

@autobind
export class EventFormController {
    private readonly store: EventFormStore;

    constructor(store: EventFormStore) {
        this.store = store;
    }

    setExpirationDate(date: Date | null, event: React.SyntheticEvent<any> | undefined): void {
        if (date === null) return;

        this.store.formValues.expirationDate = getFormattedDate(date);
    }

    setStartDate(date: Date | null, event: React.SyntheticEvent<any> | undefined): void {
        if (date === null) return;

        this.store.formValues.startDate = getFormattedDate(date);
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (!this.validateForm()) {
            this.store.isError = true;
            this.store.isPopupVisible = true;
            this.store.popupText = "Все поля должны быть заполнены.";
            return;
        }

        this.store.transport
            .addEvent(this.store.formValues, UserStore.getInstance().organizationId)
            .then(this.store.onSuccess)
            .catch(this.store.onError);

    }

    private validateForm(): boolean {
        return !isEmpty(this.store.formValues.description) && !isEmpty(this.store.formValues.expirationDate)
            && !isEmpty(this.store.formValues.startDate) && !isEmpty(this.store.formValues.name)
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.store.formValues[name] = value;
    }

    handleClose(): void {
        this.store.isPopupVisible = false;

        if (!this.store.isError) {
            this.store.formValues = this.store.EMPTY_FORM_VALUES;
        }

        this.store.isError = false;
    }
}