import {Store} from "../store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {getFormattedDate} from "../../services/utils";
import {IAddUserParams} from "../../services/transport/params";
import {AxiosResponse} from "axios";
import {ERoles} from "../user-store";
import {attempt} from "lodash";
import {EFormTypes} from "../../EFormTypes";

@autobind
export class UserFormStore extends Store {
    EMPTY_FORM_VALUES = {
        name: "",
        email: "",
        dateOfBirth: getFormattedDate(new Date()),
        gender: 0
    };
    @observable isAddChecked = false;
    @observable formValues: IAddUserParams = this.EMPTY_FORM_VALUES;
    @observable isPopupVisible = false;
    formType?: EFormTypes;
    successMessage = "Успешно.";
    id = -1;
    onSuccessImpl?: () => void;

    onSuccess(response: AxiosResponse): void {
        this.isError = false;
        this.formValues = this.EMPTY_FORM_VALUES;
        this.isPopupVisible = true;
        this.message = this.successMessage;

        attempt(this.onSuccessImpl!);
    }

    onErrorImpl(): void {
        this.isPopupVisible = true;
    }
}