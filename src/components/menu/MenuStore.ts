import {observable} from "mobx";
import {IMenuItem} from "./IMenuItem";
import {EPath} from "../../EPath";

export class MenuStore {
    items: IMenuItem[] = [
        {title: "Личный кабинет", link: EPath.PROFILE},
        {title: "Результаты", link: "#"},
        {title: "Информация", link: EPath.EVENTS},
        {title: "Сми", link: "#"},
        {title: "Калькулятор", link: EPath.CALCULATOR},
        {title: "Партнерам", link: "#"},
    ];
}