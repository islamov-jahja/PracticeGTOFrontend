import {string} from "prop-types";
import {ILoginResponse} from "../transport/responses";
import {ERoles, UserStore} from "../../components/user-store";
import {AxiosError, AxiosResponse} from "axios";

export function GetIdFromPathname(): number {
    const parts = window.location.pathname.split("/");
    const MIN_LEN = 3;

    if (parts.length < MIN_LEN) return -1;

    let id = +parts[MIN_LEN - 1];
    if (isNaN(id)) return -1;

    return id;
}

export function getFormattedDate(date: Date): string {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let formattedMonth = month < 10 ? "0" + month : month.toString();
    let formattedDay = day < 10 ? "0" + day : day.toString();
    return `${year}-${formattedMonth}-${formattedDay}`
}

export function getDateString(date: string): string {
    const dateLen = 10;
    let dateParts = date.slice(0, dateLen).split("-");
    if (dateParts.length !== 3) return date;
    return `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;
}

interface IParams {
    [key: string]: string
}

export function getQueryParams(path: string): object {
    let parts = path.split("?");
    if (parts.length < 2) return {};

    let paramsStr = parts[1];
    let params = paramsStr.split('&');
    let paramsMap: IParams = {};

    params.map(item => {
        let paramParts = item.split("=");
        if (paramParts.length < 2) return;

        paramsMap[paramParts[0]] = paramParts[1];
    });

    return paramsMap;
}

export function setProfileData(data: ILoginResponse): void {
    UserStore.getInstance().token = data.accessToken;
    UserStore.getInstance().refreshToken = data.refreshToken;
    UserStore.getInstance().organizationId = data.organizationId || -1;
    UserStore.getInstance().role = data.role == "Простой пользователь" ? ERoles.USER : data.role as ERoles;
    UserStore.getInstance().id = data.userId;
}

export function getErrorMessage(error: AxiosError): string {
    let errors = error.response ? error.response.data.errors : [];
    return errors && errors.length > 0 ? errors[0].description : "";
}

export function getErrorCode(error: AxiosError): number {
    return error.response ? error.response.status : -1;
}
