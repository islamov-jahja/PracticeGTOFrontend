import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {Table} from "../../../../components/table";
import {EPath} from "../../../../EPath";
import {SecretaryProfileStore} from "./SecretaryProfileStore";
import {SecretaryProfileController} from "./SecretaryProfileController";

@autobind
@observer
export class SecretaryProfile extends React.Component {
    private readonly store = new SecretaryProfileStore();
    private readonly controller = new SecretaryProfileController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount()
    }

    render(): React.ReactNode {
        return (
            <div>
                <h3>Мои мероприятия</h3>
                <Table
                    columns={[
                        {accessor: "_name", title: "Название", className: "name", cell: this.setNameCell},
                        {accessor: "startDate", title: "Дата начала"},
                        {accessor: "description", title: "Описание"},
                    ]}
                    data={this.store.data}/>
            </div>
        )
    }

    private setNameCell(data: any): React.ReactNode {
        return <a href={EPath.EVENT_PROFILE.replace(":orgId", data.data.idOrganization).replace(":eventId", data.data.id)}>{data.data.name}</a>
    }
}