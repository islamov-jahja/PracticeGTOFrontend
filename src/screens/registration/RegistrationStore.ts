import {Store} from "../../components/store";
import {observable} from "mobx";
import {IAddAdminParams} from "../../services/transport/params";
import {getFormattedDate} from "../../services/utils";
import {autobind} from "core-decorators";
import {AxiosError, AxiosResponse} from "axios";

@autobind
export class RegistrationStore extends Store {
    EMPTY_VALUES: IAddAdminParams = {
        name: "",
        gender: 0,
        email: "",
        dateOfBirth: getFormattedDate(new Date())
    };

    @observable formValues: IAddAdminParams = this.EMPTY_VALUES;
    @observable message = "";

    onSuccess(response: AxiosResponse): void {
        console.log("[RegistrationStore.onSuccess]: ", response);
        this.isError = false;
        this.message = "Вы успешно зарегистрировались. Пройдите по ссылке из письма для завершения регистрации.";
    }

    onErrorImpl(error: AxiosError): void {
        this.isError = true;
        let errors = error.response ? error.response.data.errors : [];
        let message = errors.length > 0 ? errors[0].description : "";
        this.message = `Произошла ошибка. ${message}`
    }
}