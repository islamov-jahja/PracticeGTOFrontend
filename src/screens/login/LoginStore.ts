import {observable} from "mobx";
import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {ERoles, UserStore} from "../../components/user-store";
import {Store} from "../../components/store";
import {ILoginResponse} from "../../services/transport/responses";
import {setProfileData} from "../../services/utils";
import {EPath} from "../../EPath";

@autobind
export class LoginStore extends Store {
    @observable email = "";
    @observable password = "";

    setEmail(value: string) {
        this.email = value;
    }

    setPassword(value: string) {
        this.password = value;
    }

    onSuccess(response: AxiosResponse<ILoginResponse>): void {
        console.log("Login.onSuccess", response);
        setProfileData(response.data);
        window.location.replace(EPath.PROFILE);
    }
}