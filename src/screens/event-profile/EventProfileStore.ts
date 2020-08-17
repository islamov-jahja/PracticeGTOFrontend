import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {AxiosError, AxiosResponse} from "axios";
import {
    IGetEventParticipantsResponse, IGetEventResponse, IGetOrgEventsListResponse, IGetSecretaries,
    IGetTeamsResponse
} from "../../services/transport/responses";
import {ITableData} from "../../components/table";
import {ERoles, UserStore} from "../../components/user-store";
import {EFormTypes} from "../../EFormTypes";
import {IGetUserEventsResponse} from "../../services/transport/responses/IGetUserEventsResponse";
import {getDateString, getFormattedDate} from "../../services/utils";

@autobind
export class EventProfileStore extends Store {
    @observable event: IGetEventResponse = {
        id: -1,
        organizationId: -1,
        name: "",
        startDate: "",
        expirationDate: "",
        description: "",
        status: ""
    };
    @observable orgId = -1;
    @observable eventId = -1;
    @observable isVisible = false;
    @observable showChangeStartDate = false;
    @observable showChangeExpirationDate = false;
    @observable isAddTeamFormVisible = false;
    @observable isPopupVisible = false;
    @observable popupText = "";
    @observable teamName = "";
    @observable isParticipant = true;
    @observable isConfirmed = true;
    @observable secretariesData: ITableData[] = [];
    @observable teamsData: ITableData[] = [];
    @observable participantData: ITableData[] = [];
    @observable formType = EFormTypes.USER;
    @observable canEditEvent = false;
    @observable startDate = this.event.startDate;
    @observable expirationDate = this.event.expirationDate;
    @observable isChangingName = false;
    @observable newName = "";

    onSuccessGetSecretaries(response: AxiosResponse<IGetSecretaries[]>): void {
        console.log("[EventProfileStore.onSuccessGetSecretaries]: ", response);
        this.secretariesData = response.data.map(item => {
            return (
                {
                    isVisible: true,
                    data: {
                        ...item,
                        dateOfBirth: getDateString(item.dateOfBirth)
                    }
                }
            )
        });
    }

    onSuccessGetTeams(response: AxiosResponse<IGetTeamsResponse[]>): void {
        console.log("[EventProfileStore.onSuccessGetTeams]: ", response);
        this.teamsData = response.data.map(item => {
            return (
                {
                    isVisible: true,
                    data: item
                }
            )
        });
    }

    onSuccessGetEvent(response: AxiosResponse<IGetEventResponse>): void {
        console.log("[EventProfileStore.onSuccessGetEvent]: ", response);
        this.event = response.data;
        this.startDate = getFormattedDate(new Date(response.data.startDate));
        this.expirationDate = getFormattedDate(new Date(response.data.expirationDate));
        this.newName = response.data.name;
    }

    onSuccessGetUserEvents(response: AxiosResponse<IGetUserEventsResponse[]> | AxiosResponse<IGetOrgEventsListResponse[]>): void {
        response.data.forEach((value: IGetUserEventsResponse | IGetOrgEventsListResponse) => {
            if (value.id == this.eventId) {
                this.canEditEvent = true;
            }
        })
    }

    canEdit(): boolean {
        return (UserStore.getInstance().role == ERoles.LOCAL_ADMIN || UserStore.getInstance().role == ERoles.SECRETARY)
            && this.canEditEvent;
    }

    onSuccessDeleteSecretary(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessDeleteSecretary]: ", response);
    }

    onSuccessChangeExpirationDate(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessChangeExpirationDate]: ", response);
        this.showChangeExpirationDate = false;
    }

    onSuccessChangeName(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessChangeName]: ", response);
        this.isChangingName = false;
    }

    onSuccessChangeStartDate(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessChangeExpirationDate]: ", response);
        this.showChangeStartDate = false;
    }

    onSuccessAccept(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessAccept]: ", response);
    }

    onSuccessSendEventRequest(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessSendEventRequest]: ", response);
        this.isError = false;
        this.popupText = "Заявка успешно отправлена и будет рассмотрена.";
        this.isPopupVisible = true;
    }

    onSuccessAddTeam(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessAddTeam]: ", response);
        this.isError = false;
        this.teamName = "";
        this.isPopupVisible = true;
        this.popupText = "Команда успешно добавлена.";
    }



    onErrorImpl(error: string | AxiosError): void {
        let errText = '';

        if (typeof error === "string") {
            errText = error
        } else {
            let errors = error.response ? error.response.data.errors : [];
            errText = errors && errors.length > 0 ? errors[0].description : "";
        }

        this.isError = true;
        this.popupText = `Произошла ошибка. Статус: ${errText}`;
        this.isPopupVisible = true;
    }

    onSuccessGetEventParticipants(response: AxiosResponse<IGetEventParticipantsResponse[]>): void {
        console.log("[EventProfileStore.onSuccessGetEventParticipants]: ", response);
        this.isParticipant = false;
        this.participantData = response.data.map(item => {
            if (item.userId == UserStore.getInstance().id) {
                this.isParticipant = true;
                this.isConfirmed = item.isConfirmed;
            }
            return (
                {
                    isVisible: true,
                    data: {
                        _isConfirmed: item.isConfirmed ? "подтвержден" : "не подтвержден",
                        ...item
                    }
                }
            )
        }).filter(value => value.data.teamId === null)
    }
}