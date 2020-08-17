import {observable} from "mobx";
import {ITableColumn} from "./ITableColumn";

export class TableStore {
    @observable columns: ITableColumn[] = [];
    @observable data: object[] = []
}