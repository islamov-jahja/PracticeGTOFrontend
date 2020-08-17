import * as React from "react";

export interface ITableColumn {
    title: string;
    accessor: string;
    className?: string;

    cell?(data: object): React.ReactNode;
}