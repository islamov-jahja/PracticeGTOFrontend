import {ITableColumn} from "./ITableColumn";
import {ITableData} from "./ITableData";

export interface ITableProps {
    columns?: ITableColumn[];
    data?: ITableData[];
}