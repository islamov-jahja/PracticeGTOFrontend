import React from "react";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {TeamProfileStore} from "./TeamProfileStore";
import {TeamProfileController} from "./TeamProfileController";
import {ITeamProfileProps} from "./ITeamProfileProps";
import {ITableColumn, Table} from "../../components/table";
import {AsideWrapper} from "../../components/aside-wrapper";
import {UserForm} from "../../components/user-form/UserForm";
import {ERoles, UserStore} from "../../components/user-store";
import {EFormTypes} from "../../EFormTypes";
import {isEmpty} from "lodash";
import classNames from "classnames";

@autobind
@observer
export class TeamProfile extends React.Component<ITeamProfileProps> {
    private readonly store = new TeamProfileStore();
    private readonly controller = new TeamProfileController(this.store);

    componentWillMount(): void {
        this.controller.onComponentWillMount(this.props);
    }

    componentDidMount(): void {
        this.controller.onComponentDidMount();
    }

    render(): React.ReactNode {
        let wrapperTitle = this.store.formType == EFormTypes.COACH ? "Добавить тренера" : "Добавить участника";
        let successMessage = this.store.formType == EFormTypes.COACH ? "Тренер успешно добавлен" : "Участник успешно добавлен";
        return (
            <div className={"container"}>
                {
                    this.store.isChangingName
                        ?
                        <div>
                            <input onChange={this.controller.setNewName} className={"input__field -name"}
                                   value={this.store.newName}/>
                            <div className={"button -small"} onClick={this.controller.changeTeamName}>Сохранить</div>
                            <div className={"button -small"} onClick={this.controller.cancelNameChanging}>Отменить</div>
                        </div>
                        : <h1
                            onClick={this.controller.editName}
                            className={classNames({"event-name": true, "-editable": this.store.canEditEvent})}>
                            {this.store.name}
                        </h1>

                }
                {
                    this.store.canEditEvent
                        ? <div>
                            <div className={"button-container"}>
                                <div className={"button -fixed"} onClick={this.controller.showUserForm}>
                                    Добавить участника
                                </div>
                                {
                                    UserStore.getInstance().role == ERoles.LOCAL_ADMIN || UserStore.getInstance().role == ERoles.SECRETARY
                                        ? (
                                            <div className={"button -fixed"} onClick={this.controller.showCoachForm}>
                                                Добавить тренера
                                            </div>
                                        )
                                        : void 0
                                }
                            </div>
                            <AsideWrapper
                                title={wrapperTitle}
                                isVisible={this.store.isVisible}
                                component={
                                    <UserForm
                                        formType={this.store.formType}
                                        successMessage={successMessage}
                                        id={this.store.teamId}
                                        onSuccess={this.controller.onSuccessAdd}
                                    />
                                }
                                onClose={this.controller.closeForm}
                            />
                        </div>
                        : void 0
                }
                <h2>Тренеры</h2>
                {
                    isEmpty(this.store.coaches)
                        ? <p>У команды пока нет тренеров.</p>
                        : <Table columns={
                            this.store.canEditEvent &&
                            (UserStore.getInstance().role == ERoles.LOCAL_ADMIN || UserStore.getInstance().role == ERoles.SECRETARY)
                                ? [
                                    {accessor: "name", title: "Имя", className: "name"},
                                    {accessor: "email", title: "Почта"},
                                    {accessor: "", title: "", cell: this.setDeleteCoachCell},
                                ]
                                : [
                                    {accessor: "name", title: "Имя", className: "name"},
                                    {accessor: "email", title: "Почта"},
                                ]} data={this.store.coaches}/>
                }

                <h2>Участники</h2>
                {
                    isEmpty(this.store.participants)
                        ? <p>В команде пока нет участников.</p>
                        : <div>
                            <Table columns={this.getColumns()} data={this.store.participants}/>
                            {
                                this.store.canEditEvent &&
                                (UserStore.getInstance().role == ERoles.LOCAL_ADMIN || UserStore.getInstance().role == ERoles.SECRETARY)
                                    ? <div className={"button"} onClick={this.controller.acceptAllTeam}>
                                        Подтвердить всех
                                    </div>
                                    : void 0
                            }
                        </div>
                }
            </div>
        )
    }

    private getColumns(): ITableColumn[] {
        if (this.store.canEditEvent) {
            if (UserStore.getInstance().role == ERoles.SECRETARY || UserStore.getInstance().role == ERoles.LOCAL_ADMIN) {
                return ([
                    {accessor: "name", title: "Имя", className: "name"},
                    {accessor: "email", title: "Почта"},
                    {accessor: "status", title: "Статус"},
                    {accessor: "", title: "Подтвердить", cell: this.setParticipantAcceptCell},
                    {accessor: "delete", title: "", cell: this.setParticipantCell}
                ])
            } else if (UserStore.getInstance().role == ERoles.COACH) {
                return ([
                    {accessor: "name", title: "Имя", className: "name"},
                    {accessor: "email", title: "Почта"},
                    {accessor: "status", title: "Статус"},
                    {accessor: "delete", title: "", cell: this.setDeleteParticipantCell},
                ])
            }
        }
        return [
            {accessor: "name", title: "Имя", className: "name"},
            {accessor: "email", title: "Почта"},
            {accessor: "status", title: "Статус"},
        ]
    }

    private setDeleteParticipantCell(data: any): React.ReactNode {
        if (data.data.isConfirmed) {
            return <span>удаление недоступно</span>
        }
        return <span onClick={() => this.controller.deleteParticipant(data.data.EventParticipantId)}
                     className={"delete-icon"}/>
    }

    private setDeleteCoachCell(data: any): React.ReactNode {
        return <span onClick={() => this.controller.deleteCoach(data.data.teamLeadId)}
                     className={"delete-icon"}/>
    }

    private setParticipantCell(data: any): React.ReactNode {
        return <span onClick={() => this.controller.deleteParticipant(data.data.EventParticipantId)}
                     className={"delete-icon"}/>
    }

    private setParticipantAcceptCell(data: any): React.ReactNode {
        if (!data.data) return;
        if (data.data.isConfirmed) return <span>Подтвержден</span>;
        return <span onClick={() => this.controller.acceptParticipant(data.data.EventParticipantId)}
                     style={{cursor: "pointer"}}>Подтвердить</span>
    }
}