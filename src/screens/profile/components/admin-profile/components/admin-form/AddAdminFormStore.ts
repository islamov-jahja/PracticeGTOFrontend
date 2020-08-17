import {Store} from "../../../../../../components/store";
import {observable} from "mobx";
import {IGetOrgsListResponse} from "../../../../../../services/transport/responses";
import {IAddAdminParams} from "../../../../../../services/transport/params";
import {AxiosError, AxiosResponse} from "axios";
import {autobind} from "core-decorators";
import {EGender} from "../../../../../calculator/EGender";
import {getErrorMessage, getFormattedDate} from "../../../../../../services/utils";

@autobind
export class AddAdminFormStore extends Store {
    EMPTY_ADMIN_VALUES: IAddAdminParams = {
        name: "",
        email: "",
        dateOfBirth: getFormattedDate(new Date()),
        gender: 0,
    };
    @observable orgsList: IGetOrgsListResponse[] = [];
    @observable adminValues: IAddAdminParams = this.EMPTY_ADMIN_VALUES;
    @observable email = "";
    @observable selectedOrgId = -1;
    @observable selectedAdminId = -1;
    @observable popupText = "";
    @observable isPopupVisible = false;
    @observable isAddChecked = true;
    @observable gender = EGender.MALE;

    onSuccess(response: AxiosResponse): void {
        console.log("[AddAdminFormStore.onSuccess]:", response);
        this.popupText = "Администратор добавлен";
        this.isPopupVisible = true;
    }

    onSuccessGetOrgsList(response: AxiosResponse<IGetOrgsListResponse[]>): void {
        console.log("[AddAdminFormStore.onSuccessGetOrgsList]:", response);
        this.orgsList = response.data;
    }

    onErrorImpl(error: AxiosError): void {
        this.popupText = `Произошла ошибка. Статус: ${this.message}`;
        this.isPopupVisible = true;
    }
}