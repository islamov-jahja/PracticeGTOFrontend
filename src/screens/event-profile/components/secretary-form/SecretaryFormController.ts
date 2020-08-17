import {autobind} from "core-decorators";
import {SecretaryFormStore} from "./SecretaryFormStore";
import * as React from "react";
import {getFormattedDate} from "../../../../services/utils";
import {EGender} from "../../../calculator/EGender";
import {isEmpty, attempt} from "lodash";
import {ISecretaryFormProps} from "./ISecretaryFormProps";
import {AxiosError} from "axios";

@autobind
export class SecretaryFormController {
    private readonly store: SecretaryFormStore;

    constructor(store: SecretaryFormStore) {
        this.store = store;
    }

    setDateOfBirth(date: Date | null, event: React.SyntheticEvent<any> | undefined): void {
        if (date === null) return;

        this.store.formValues.dateOfBirth = getFormattedDate(date);
    }

    handleInputEmailChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.store.email = event.target.value;
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.store.formValues[name] = value;
    }

    onComponentDidMount(props: ISecretaryFormProps): void {
        this.store.eventId = props.eventId;
        this.store.orgId = props.orgId;
        this.store.onSuccessImpl = props.onSuccess;
        this.store.onErrorProp = props.onError;
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (this.store.isAddChecked) {
            this.addNewSecretary();
        } else {
            this.addExistingSecretary();
        }
    }

    private addExistingSecretary(): void {
        if (isEmpty(this.store.email)) {
            attempt(this.store.onErrorImpl!, "Введите почту.");
            return;
        }

        this.store.transport
            .addExistingSecretary(this.store.email, this.store.orgId, this.store.eventId)
            .then(this.store.onSuccess)
            .catch(this.store.onError);
    }

    private addNewSecretary(): void {
        if (!this.validateForm()) {
            attempt(this.store.onErrorImpl!, "Все поля должны быть заполнены");
            return;
        }
        this.store.transport
            .inviteUser(this.store.formValues)
            .then(() => {
                this.store.transport
                    .addExistingSecretary(this.store.formValues.email, this.store.orgId, this.store.eventId)
                    .then(this.store.onSuccess)
                    .catch(this.store.onError);
            })
            .catch(this.store.onError);
    }

    validateForm(): boolean {
        return !isEmpty(this.store.formValues.name) && !isEmpty(this.store.formValues.email)
            && !isEmpty(this.store.formValues.dateOfBirth)
    }

    onChangeGender(value: string): void {
        this.store.formValues.gender = value == EGender.MALE ? 0 : 1;
    }

    onChangeRadio(): void {
        this.store.isAddChecked = !this.store.isAddChecked;
    }
}