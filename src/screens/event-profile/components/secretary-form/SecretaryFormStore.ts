import {autobind} from "core-decorators";
import {Store} from "../../../../components/store";
import {observable} from "mobx";
import {IAddSecretaryParams} from "../../../../services/transport/params";
import {getFormattedDate} from "../../../../services/utils";
import {AxiosError, AxiosResponse} from "axios";
import {attempt} from "lodash";

@autobind
export class SecretaryFormStore extends Store {
    EMPTY_FORM_VALUES = {
        name: "",
        email: "",
        dateOfBirth: getFormattedDate(new Date()),
        gender: 0
    };
    orgId = -1;
    eventId = -1;
    onSuccessImpl?: () => void;
    onErrorProp?: (error: string) => void;
    @observable isAddChecked = false;
    @observable email = "";
    @observable formValues: IAddSecretaryParams = this.EMPTY_FORM_VALUES;

    onSuccess(response: AxiosResponse): void {
        attempt(this.onSuccessImpl!);
        console.log("[SecretaryFormStore.onSuccess]: ", response);
    }

    onError(error: AxiosError): void {
        let errors = error.response ? error.response.data.errors : [];
        let message = errors.length > 0 ? errors[0].description : "";
        attempt(this.onErrorProp!, message)
    }
}