import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {OrgsListController} from "./OrgsListController";
import {OrgsListStore} from "./OrgsListStore";
import {Table} from "../../../../../../components/table";
import {EPath} from "../../../../../../EPath";

@autobind
@observer
export class OrgsList extends React.Component {
    protected readonly store = new OrgsListStore();
    protected readonly controller = new OrgsListController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
        this.setColumns();
    }

    setColumns(): void {
        this.store.orgColumns = [
            {accessor: "_orgName", title: "Название", className: "name", cell: this.setNameCell},
            {accessor: "orgAddress", title: "Адрес"},
            {accessor: "orgId", title: "ID"},
            {accessor: "delete", title: "", cell: this.setCell},
        ]
    }

    render(): React.ReactNode {
        return (
            <section className={"org-list-section"}>
                <Table columns={this.store.orgColumns} data={this.store.orgData}/>
            </section>
        )
    }

    //TODO.. fix type
    private setCell(data: any): React.ReactNode {
        return <span onClick={() => this.controller.deleteOrg(data.data.orgId)} className={"delete-icon"}/>
    }

    private setNameCell(data: any): React.ReactNode {
        return <a href={EPath.ORGANISATION_PROFILE.replace(":id", data.data.orgId)}>{data.data.orgName}</a>
    }
}