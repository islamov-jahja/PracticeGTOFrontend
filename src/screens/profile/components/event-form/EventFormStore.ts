import {Store} from "../../../../components/store";
import {observable} from "mobx";
import {IAddEventParams} from "../../../../services/transport/params";
import {autobind} from "core-decorators";
import {AxiosError, AxiosResponse} from "axios";
import {getErrorMessage, getFormattedDate} from "../../../../services/utils";

@autobind
export class EventFormStore extends Store {
    EMPTY_FORM_VALUES: IAddEventParams = {
        name: "",
        startDate: getFormattedDate(new Date()),
        expirationDate: getFormattedDate(new Date()),
        description: ""
    };
    @observable formValues: IAddEventParams = this.EMPTY_FORM_VALUES;
    @observable isPopupVisible = false;
    @observable popupText = "";

    onSuccess(response: AxiosResponse): void {
        console.log("[EventFormStore.onSuccess]: ", response);
        this.isPopupVisible = true;
        this.popupText = "Мероприятие успешно добавлено."
    }

    onError(error: AxiosError): void {
        console.error(error);
        this.isError = true;
        let message = getErrorMessage(error);
        this.popupText = `Произошла ошибка. Статус: ${message}`;
        this.isPopupVisible = true;
    }
}