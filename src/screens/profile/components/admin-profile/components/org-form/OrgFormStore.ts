import {observable} from "mobx";
import {AxiosError, AxiosResponse} from "axios";
import {autobind} from "core-decorators";
import * as React from "react";
import {IAddAdminParams, IAddOrgParams} from "../../../../../../services/transport/params";
import {IGetOrgsListResponse} from "../../../../../../services/transport/responses";
import {CommonProfileStore} from "../../../common-profile/CommonProfileStore";


@autobind
export class OrgFormStore extends CommonProfileStore {
    EMPTY_FORM_VALUES: IAddOrgParams = {
        name: "",
        address: "",
        leader: "",
        phoneNumber: "",
        oqrn: "",
        paymentAccount: "",
        branch: "",
        bik: "",
        correspondentAccount: "",
    };

    @observable selectedOrgId = -1;
    @observable isPopupVisible = false;
    @observable formValues: IAddOrgParams = this.EMPTY_FORM_VALUES;
    @observable orgsList: IGetOrgsListResponse[] = [];
    @observable isEditForm? = false;
    @observable popupText = "";

    onSuccessGetOrgsList(response: AxiosResponse<IGetOrgsListResponse[]>): void {
        console.log("[OrgFormStore.onSuccessGetOrgsList]:", response);
        this.orgsList = response.data;
    }

    onSuccess(response: AxiosResponse): void {
        console.log("[OrgFormStore.onSuccess]:", response);
        this.popupText = this.isEditForm ? "Данные успешно изменены." : "Организация успешно добавлена.";
        this.isPopupVisible = true;
    }

    onErrorImpl(error: AxiosError): void {
        this.isPopupVisible = true;
        this.popupText = "Произошла ошибка. Статус: " + this.message;
    }
}