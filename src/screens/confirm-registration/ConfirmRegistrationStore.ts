import {observable} from "mobx";
import {autobind} from "core-decorators";
import {AxiosError, AxiosResponse} from "axios";
import {UserStore} from "../../components/user-store";
import {EPath} from "../../EPath";
import {ILoginResponse, IValidateToken} from "../../services/transport/responses";
import {Store} from "../../components/store";
import {setProfileData} from "../../services/utils";

@autobind
export class ConfirmRegistrationStore extends Store {
    @observable email: string = "";
    @observable name: string = "";
    @observable password: string = "";
    @observable repeatPassword: string = "";

    setName(value: string): void {
        this.name = value;
    }

    setPassword(value: string): void {
        this.password = value;
    }

    setRepeatPassword(value: string): void {
        this.repeatPassword = value;
    }

    onSuccessRegister(response: AxiosResponse): void {
        console.log("[RegistrationStore.onSuccessRegister]: ", response);
        this.transport.login({
            email: this.email,
            password: this.password
        }).then(this.onSuccessLogin).catch(this.onError);

        this.isError = false;
        this.message = "Вы успешно зарегистрировались и будете перенаправлены в профиль";
    }

    private onSuccessLogin(response: AxiosResponse<ILoginResponse>): void {
        console.log("ConfirmRegistrationStore.onSuccessLogin", response);
        setProfileData(response.data);
        setTimeout(() => window.location.replace(EPath.PROFILE), 3000);
    }
}