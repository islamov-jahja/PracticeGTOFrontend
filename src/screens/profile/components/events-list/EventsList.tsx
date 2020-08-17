import React from "react";
import {Table} from "../../../../components/table/index";
import {autobind} from "core-decorators";
import {EventsListStore} from "./EventsListStore";
import {EventsListController} from "./EventsListController";
import {observer} from "mobx-react";
import {EPath} from "../../../../EPath";

@autobind
@observer
export class EventsList extends React.Component {
    private readonly store = new EventsListStore();
    private readonly controller = new EventsListController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            <section className={"event-list-section"}>
                <Table
                    columns={[
                        {accessor: "_eventName", title: "Название", className: "name", cell: this.setNameCell},
                        {accessor: "eventStartDate", title: "Дата начала"},
                        {accessor: "desc", title: "Описание"},
                        {accessor: "delete", title: "", cell: this.setCell},
                    ]}
                    data={this.store.eventsList}/>
            </section>
        )
    }

    private setNameCell(data: any): React.ReactNode {
        return <a
            href={EPath.EVENT_PROFILE.replace(":orgId", data.data.orgId).replace(":eventId", data.data.id)}>{data.data.eventName}</a>
    }

    //TODO.. fix type
    private setCell(data: any): React.ReactNode {
        return <span onClick={() => this.controller.deleteEvent(data.data.orgId, data.data.id)}
                     className={"delete-icon"}/>
    }
}