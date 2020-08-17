import {UserStore} from "../../components/user-store";
import {IRegistrationParams} from "../../services/transport/params";
import {autobind} from "core-decorators";
import {getQueryParams} from "../../services/utils";
import {isUndefined, isEmpty} from "lodash";
import {EPath} from "../../EPath";
import {ConfirmRegistrationStore} from "./ConfirmRegistrationStore";

interface IRegistrationQueryParams {
    email: string,
    token: string
}

@autobind
export class ConfirmRegistrationController {
    private readonly store: ConfirmRegistrationStore;
    constructor(store: ConfirmRegistrationStore) {
        this.store = store;
    }

    onComponentWillMount(): void {
        let params = getQueryParams(window.location.search) as IRegistrationQueryParams;
        if (isUndefined(params.email) || isUndefined(params.token)) {
            return;
        }
        history.replaceState("", "", EPath.CONFIRM_REGISTRATION);
        UserStore.getInstance().token = params.token;
        this.store.email = params.email;
    }

    onSubmit(): void {
        const params: IRegistrationParams = {
            password: this.store.password
        };

        if (!this.validateForm()) {
            this.store.isError = true;
            return;
        }

        this.store.transport
            .register(params)
            .then(this.store.onSuccessRegister)
            .catch(this.store.onError);
    }

    private validateForm(): boolean {
        if (isEmpty(this.store.email)) {
            this.store.message = "Не указана почта";
            return false;
        }

        if (isEmpty(this.store.password)) {
            this.store.message = "Введите пароль";
            return false;
        }

        if (this.store.password !== this.store.repeatPassword) {
            this.store.message = "Пароли не совпадают";
            return false;
        }
        const MIN_LEN = 6;
        if (this.store.password.length < MIN_LEN) {
            this.store.message = `Слишком короткий пароль. Минимальная длина ${MIN_LEN} символов`;
            return false;
        }

        return true;
    }
}