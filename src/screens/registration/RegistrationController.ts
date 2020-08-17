import {RegistrationStore} from "./RegistrationStore";
import * as React from "react";
import {autobind} from "core-decorators";
import {getFormattedDate} from "../../services/utils";
import {EGender} from "../calculator/EGender";

@autobind
export class RegistrationController {
    private readonly store: RegistrationStore;

    constructor(store: RegistrationStore) {
        this.store = store;
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.store.formValues[name] = value;
    }

    onSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        this.store.transport
            .inviteUser(this.store.formValues)
            .then(this.store.onSuccess)
            .catch(this.store.onErrorImpl)
    }

    onRadioChange(value: string): void {
        this.store.formValues.gender = value == EGender.MALE ? 0 : 1;
    }

    private validateForm(): boolean {
        return true;
    }

    setDateOfBirth(date: Date | null, event: React.SyntheticEvent<any> | undefined): void {
        if (date === null) return;

        this.store.formValues.dateOfBirth = getFormattedDate(date);
    }
}