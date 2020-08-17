import {Store} from "../../../../components/store";
import {autobind} from "core-decorators";
import {AxiosResponse} from "axios";
import {observable} from "mobx";
import {ITableData} from "../../../../components/table";
import {IGetTeamsResponse} from "../../../../services/transport/responses";

@autobind
export class CoachProfileStore extends Store {
    @observable data: ITableData[] = [];

    onSuccessGetTeams(response: AxiosResponse<IGetTeamsResponse[]>) {
        console.log("[CoachProfileStore.onSuccessGetTeams]: ", response);
        this.data = response.data.map(item => {
            return(
                {
                    isVisible: true,
                    data: item
                }
            )
        })
    }
}