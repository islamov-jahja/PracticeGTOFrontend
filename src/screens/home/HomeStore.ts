import {EPath} from "../../EPath";

export interface ICard {
    title: string;
    link: string;
    className: string;
}
export class HomeStore {
    cards: ICard[] = [
        {title: "участникам", link: EPath.CALCULATOR, className: "participant"},
        {title: "организаторам", link: "", className: "organizer"},
        {title: "командам", link: "", className: "team"},
        {title: "гостям", link: "", className: "judge"}
    ];
}