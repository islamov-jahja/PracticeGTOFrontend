import {UserFormStore} from "./UserFormStore";
import {autobind} from "core-decorators";
import {isEmpty, attempt, isUndefined} from "lodash";
import * as React from "react";
import {getFormattedDate} from "../../services/utils";
import {EGender} from "../../screens/calculator/EGender";
import {ERoles} from "../user-store";
import {EFormTypes} from "../../EFormTypes";

@autobind
export class UserFormController {
    private readonly store: UserFormStore;

    constructor(store: UserFormStore) {
        this.store = store;
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        if (this.store.isAddChecked) {
            this.addNewUser();
        } else {
            this.addExistingUser();
        }
    }

    private addNewUser(): void {
        if (!this.validateForm()) {
            this.store.isError = true;
            this.store.message = "Все поля должны быть заполнены.";
            return;
        }
        this.store.transport
            .inviteUser(this.store.formValues)
            .then(this.addExistingUser)
            .catch(this.store.onError);
    }

    private addExistingUser(): void {
        if (isUndefined(this.store.formType)) return;
        switch (this.store.formType) {
            case EFormTypes.TEAM_USER:
                this.addUser();
                break;
            case EFormTypes.USER:
                this.addPersonalUser();
                break;
            case EFormTypes.COACH:
                this.addCoach();
                break;
        }
    }

    addPersonalUser(): void {
        this.store.transport
            .addPersonalParticipant(this.store.id, this.store.formValues.email)
            .then(this.store.onSuccess)
            .catch(this.store.onError)
    }

    addCoach(): void {
        this.store.transport
            .addCoach(this.store.id, this.store.formValues.email)
            .then(this.store.onSuccess)
            .catch(this.store.onError)
    }

    addUser(): void {
        this.store.transport
            .addTeamParticipant(this.store.id, this.store.formValues.email)
            .then(this.store.onSuccess)
            .catch(this.store.onError);
    }

    validateForm(): boolean {
        return !isEmpty(this.store.formValues.name) && !isEmpty(this.store.formValues.email)
            && !isEmpty(this.store.formValues.dateOfBirth)
    }

    onChangeRadio(): void {
        this.store.isAddChecked = !this.store.isAddChecked;
        this.store.formValues.email = "";
    }

    onChangeGender(value: string): void {
        this.store.formValues.gender = value == EGender.MALE ? 0 : 1;
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.store.formValues[name] = value;
    }

    handleInputEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.store.formValues.email = event.target.value;
    }

    setDateOfBirth(date: Date | null, event: React.SyntheticEvent<any> | undefined): void {
        if (date === null) return;

        this.store.formValues.dateOfBirth = getFormattedDate(date);
    }

    handleClose(): void {
        this.store.isPopupVisible = false;

        if (!this.store.isError) {
            this.store.formValues = this.store.EMPTY_FORM_VALUES;
        }

        this.store.isError = false;
    }
}