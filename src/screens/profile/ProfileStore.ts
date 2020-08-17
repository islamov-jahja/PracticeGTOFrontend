import {Store} from "../../components/store";
import {AxiosResponse} from "axios";
import {IGetUserProfileInfo} from "../../services/transport/responses";
import {observable} from "mobx";
import {autobind} from "core-decorators";

@autobind
export class ProfileStore extends Store {
    @observable name = "";
    @observable email = "";

    onSuccess(response: AxiosResponse<IGetUserProfileInfo>): void {
        console.log("[ProfileStore.onSuccess]: ", response);
        this.name = response.data.name;
        this.email = response.data.email;
    }
}