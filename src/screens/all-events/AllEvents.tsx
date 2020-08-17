import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {AllEventsStore} from "./AllEventsStore";
import {AllEventsController} from "./AllEventsController";
import "./AllEvents.scss";
import {Tabs} from "../../components/tabs";
import {Table} from "../../components/table";
import classNames from "classnames";
import {Popup} from "../../components/popup/Popup";
import {EPath} from "../../EPath";
import {isEmpty} from "lodash";

@autobind
@observer
export class AllEvents extends React.Component {
    private readonly store: AllEventsStore = new AllEventsStore();
    private readonly controller: AllEventsController = new AllEventsController(this.store);

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            <div className={"container all-events"}>
                {
                    this.store.orgsList.map(item => {
                        let events = this.store.events.get(item.data.id);
                        return (
                            <div className={classNames({"org-item": true, "-open": item.isVisible})} key={item.data.id}>
                                <div className={"org-item__heading"}
                                     onClick={() => this.controller.onItemClick(item.data.id)}>
                                    {item.data.name}
                                </div>
                                <div className={"org-item__body"}>
                                    {isEmpty(events)
                                        ? <p>У организации пока нет мероприятий</p>
                                        : <Table
                                            columns={
                                                [
                                                    {
                                                        accessor: "_name",
                                                        title: "Название",
                                                        className: "name",
                                                        cell: this.setNameCell
                                                    },
                                                    {accessor: "startDate", title: "Дата начала"},
                                                    {accessor: "description", title: "Описание"},
                                                    {accessor: "", title: "", cell: this.setCell},
                                                ]
                                            }
                                            data={this.store.events.get(item.data.id)}
                                        />
                                    }
                                </div>
                            </div>
                        )
                    })
                }
                <Popup
                    isVisible={this.store.popupText !== ""}
                    isError={this.store.isError}
                    popupText={this.store.popupText}
                    onClose={this.controller.handleClose}
                />
            </div>
        )
    }

    private setCell(data: any): React.ReactNode {
        return <span style={{cursor: "pointer"}}
                     onClick={() => this.controller.sendRequest(data.data.id)}>Подать заявку</span>
    }

    private setNameCell(data: any): React.ReactNode {
        return (
            <a href={EPath.EVENT_PROFILE.replace(":orgId", data.data.organizationId).replace(":eventId", data.data.id)}>
                {data.data.name}
            </a>
        )
    }
}