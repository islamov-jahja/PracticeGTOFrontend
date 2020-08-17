import {autobind} from "core-decorators";
import * as React from "react";
import {CommonProfileController} from "../../../common-profile/CommonProfileController";
import {OrgFormStore} from "./OrgFormStore";
import {IOrgFormProps} from "./IOrgFormProps";
import {isEmpty} from "lodash";

@autobind
export class OrgFormController extends CommonProfileController {
    protected store: OrgFormStore;

    constructor(store: OrgFormStore) {
        super();
        this.store = store;
    }

    onComponentDidMount(props: IOrgFormProps): void {
        this.store.isEditForm = props.isEditForm;

        if (!this.store.isEditForm) return;
        this.getOrgsList();
    }

    getOrgsList() {
        this.store.transport
            .getOrgsList()
            .then(this.store.onSuccessGetOrgsList)
            .catch(this.store.onError);
    }

    onChange(selectedOption: any): void {
        let id = selectedOption.value;
        let value = this.store.orgsList.find((item) => item.id == id);
        this.store.selectedOrgId = id;

        if (!value) return;

        this.store.formValues = {
            phoneNumber: value.phone_number,
            oqrn: value.OQRN,
            paymentAccount: value.payment_account,
            correspondentAccount: value.correspondent_account,
            name: value.name,
            bik: value.bik,
            branch: value.branch,
            address: value.address,
            leader: value.leader
        }
    }

    handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.store.formValues[name] = value;
    }

    handleCloseClick(): void {
        this.store.isPopupVisible = false;
        if (!this.store.isError) {
            this.store.formValues = this.store.EMPTY_FORM_VALUES;
        }
        this.store.popupText = "";
        this.store.isError = false;
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!this.validateForm()) {
            this.store.isError = true;
            this.store.popupText = "Все поля должны быть заполнены.";
            this.store.isPopupVisible = true;
            return;
        }

        if (this.store.isEditForm) {
            if (this.store.selectedOrgId === -1) {
                this.store.isError = true;
                this.store.popupText = "Не выбрана организация.";
                this.store.isPopupVisible = true;
                return;
            }

            this.store.transport
                .editOrgInfo(this.store.formValues, this.store.selectedOrgId)
                .then(this.store.onSuccess)
                .then(this.getOrgsList)
                .catch(this.store.onError);
        } else {
            this.store.transport
                .inviteOrg(this.store.formValues)
                .then(this.store.onSuccess)
                .catch(this.store.onError);
        }
    }

    deleteOrg(id: number): void {
        this.store.transport.deleteOrg(id).then(this.store.onSuccess).catch(this.store.onError);

        if (this.store.isError) return;
        this.getOrgsList();
    }

    validateForm(): boolean {
        let values = this.store.formValues;
        return !isEmpty(values.leader) && !isEmpty(values.address)
            && !isEmpty(values.branch) && !isEmpty(values.bik)
            && !isEmpty(values.name) && !isEmpty(values.oqrn)
            && !isEmpty(values.correspondentAccount) && !isEmpty(values.phoneNumber)
            && !isEmpty(values.paymentAccount)
    }
}