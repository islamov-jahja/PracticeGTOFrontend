import {AxiosResponse} from "axios";
import {IRole} from "../../../components/user-store";

export interface IGetRolesResponse extends AxiosResponse {
    roles: IRole[]
}