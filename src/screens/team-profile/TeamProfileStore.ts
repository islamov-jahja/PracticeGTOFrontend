import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {AxiosResponse} from "axios";
import {
    IGetEventParticipantsResponse, IGetTeamCoachesResponse, IGetTeamInfoResponse,
    IGetTeamsResponse
} from "../../services/transport/responses";
import {ITableData} from "../../components/table";
import {EFormTypes} from "../../EFormTypes";

@autobind
export class TeamProfileStore extends Store {
    @observable teamId = -1;
    @observable coaches: ITableData[] = [];
    @observable participants: ITableData[] = [];
    @observable isVisible = false;
    @observable canEditEvent = false;
    @observable formType = EFormTypes.TEAM_USER;
    @observable name = "";
    @observable newName = "";
    @observable isChangingName = false;

    onSuccessChangeName(response: AxiosResponse): void {
        console.log("[EventProfileStore.onSuccessChangeName]: ", response);
        this.isChangingName = false;
    }

    onSuccess(response: AxiosResponse<IGetTeamCoachesResponse[]>) {
        console.log("[TeamProfileStore.onSuccess]: ", response);
        this.coaches = response.data.map(item => {
            return {
                isVisible: true,
                data: item,
            }
        })
    }

    onSuccessGetInfo(response: AxiosResponse<IGetTeamInfoResponse>) {
        console.log("[TeamProfileStore.onSuccessGetInfo]: ", response);
        this.name = response.data.name;
        this.newName = this.name;
    }

    onSuccessGetUserTeams(response: AxiosResponse<IGetTeamsResponse[]>) {
        console.log("[TeamProfileStore.onSuccessGetUserTeams]: ", response);
        response.data.forEach(value => {
            if (this.teamId == value.id) {
                this.canEditEvent = true;
            }
        })
    }

    onSuccessAccept(response: AxiosResponse): void {
        console.log("[TeamProfileStore.onSuccessAccept]: ", response);
    }

    onSuccessDelete(response: AxiosResponse): void {
        console.log("[TeamProfileStore.onSuccessDelete]: ", response);
    }

    onSuccessGetParticipants(response: AxiosResponse<IGetEventParticipantsResponse[]>) {
        console.log("[TeamProfileStore.onSuccessGetParticipants]: ", response);
        this.participants = response.data.map(item => {
            return {
                isVisible: true,
                data: {
                    ...item,
                    status: item.isConfirmed ? "подтвержден" : "не подтвержден"
                },
            }
        })
    }
}