import * as React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {Redirect} from "react-router";
import {OrganisationProfileStore} from "./OrganisationProfileStore";
import {OrganisationProfileController} from "./OrganisationProfileController";
import {IOrganisationProfileProps} from "./IOrganisationProfileProps";
import {Table} from "../../components/table";

@autobind
@observer
export class OrganisationProfile extends React.Component<IOrganisationProfileProps> {
    private readonly store: OrganisationProfileStore = new OrganisationProfileStore();
    private readonly controller: OrganisationProfileController = new OrganisationProfileController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        return (
            this.store.id == -1
                ? <Redirect to={"/"}/>
                : (
                    <div className={"container event-profile"}>
                        <h1>{this.store.data.name}</h1>
                        <p>Всего мероприятий: {this.store.data.countOfAllEvents}</p>
                        <p>Активных мероприятий: {this.store.data.countOfActiveEvents}</p>
                        <h3>Локальные администраторы</h3>
                        <Table
                            columns={[
                                {accessor: "name", title: "Имя", className: "name"},
                                {accessor: "dateOfBirth", title: "Дата рождения"},
                                {accessor: "email", title: "Почта"},
                                {accessor: "delete", title: "", cell: this.setCell},
                            ]}
                            data={this.store.admins}/>
                        {/*
                            this.store.isPopupVisible ?
                                <div className={"popup-wrapper"}>
                                    <div className={classNames({
                                        "popup": true,
                                        "-type-error": this.store.isError
                                    })}>
                                        {this.store.popupText}
                                        <div className={"popup__close-icon"} onClick={this.controller.handleCloseClick}/>
                                    </div>
                                </div>
                                : void 0
                        */}
                    </div>
                )
        )
    }

    //TODO.. fix type
    private setCell(data: any): React.ReactNode {
        return <span onClick={() => this.controller.deleteAdmin(data.data.organizationId, data.data.localAdminId)}
                     className={"delete-icon"}/>
    }
}