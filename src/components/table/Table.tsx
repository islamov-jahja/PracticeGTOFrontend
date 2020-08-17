import * as React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {TableStore} from "./TableStore";
import {get, attempt} from "lodash";
import "./Table.scss";
import {ITableProps} from "./ITableProps";
import {isUndefined, isEqual} from "lodash";

@autobind
@observer
export class Table extends React.Component<ITableProps> {
    private readonly store = new TableStore();

    componentDidMount() {
        if (isUndefined(this.props.columns) || isUndefined(this.props.data)) {
            return;
        }
        this.store.columns = this.props.columns;
        this.store.data = this.props.data;
    }

    componentDidUpdate(): void {
        if (isUndefined(this.props.columns) || isUndefined(this.props.data)) {
            return;
        }
        if (!isEqual(this.store.columns, this.props.columns)) {
            this.store.columns = this.props.columns;
        }
        if (!isEqual(this.store.data, this.props.data)) {
            this.store.data = this.props.data;
        }
    }

    render(): React.ReactNode {
        return (
            <div className={"table"}>
                <div className={"table__header"}>
                    {this.getColumns()}
                </div>
                <div className={"table-body"}>
                    {this.getLines()}
                </div>
            </div>
        )
    }

    private getColumns(): React.ReactNode {
        return (
            this.store.columns.map((column, index) => {
                return (
                    <div key={index} className={`table-item ${column.className}`}>
                        {column.title}
                    </div>
                )
            })
        )
    }

    private getLines(): React.ReactNode {
        return (
            this.store.data.map((line, index) => {
                if (isUndefined(get(line, "header"))) {
                    if (get(line, "isVisible")) {
                        return (
                            <div key={index} className={"table__line"}>
                                {
                                    this.store.columns.map((column, index) => {

                                            return (
                                                <div key={index} className={`table-item ${column.className || ""}`}>
                                                    {get(get(line, "data"), column.accessor)}
                                                    {Table.getCell(line, column.cell)}
                                                </div>
                                            )
                                        }
                                    )
                                }
                            </div>
                        )
                    } else {
                        return void 0
                    }
                }
                return <div className={"table__sub-header"}>{get(line, "header")}</div>
            })
        )
    }

    private static getCell(data: object, cell?: (data: object) => React.ReactNode): React.ReactNode {
        if (!cell) {
            return void 0;
        }
        return cell(data);
    }
}
