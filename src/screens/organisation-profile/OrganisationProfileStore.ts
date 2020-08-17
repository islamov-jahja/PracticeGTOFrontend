import {Store} from "../../components/store";
import {autobind} from "core-decorators";
import {observable} from "mobx";
import {AxiosResponse} from "axios";
import {IGetLocalAdminsResponse, IGetOrgInfoResponse} from "../../services/transport/responses";
import {ITableData} from "../../components/table";
import {getDateString} from "../../services/utils";

@autobind
export class OrganisationProfileStore extends Store {
    EMPTY_ORG_INFO = {
        id: -1,
        name: "",
        address: "",
        leader: "",
        phoneNumber: "",
        OQRN: "",
        payment_account: "",
        branch: "",
        bik: "",
        correspondent_account: "",
        countOfAllEvents: -1,
        countOfActiveEvents: -1
    };
    @observable id = -1;
    @observable data: IGetOrgInfoResponse = this.EMPTY_ORG_INFO;
    @observable admins: ITableData[] = [];

    onSuccess(response: AxiosResponse): void {
        console.log("[OrganisationProfileStore.onSuccess: ]", response);
        this.data = response.data;
    }

    onSuccessGetAdmins(response: AxiosResponse<IGetLocalAdminsResponse[]>): void {
        console.log("[OrganisationProfileStore.onSuccessGetAdmins: ]", response);
        this.admins = response.data.map(item => {
            return (
                {
                    isVisible: true,
                    data: {
                        ...item,
                        dateOfBirth: getDateString(item.dateOfBirth)
                    }
                }
            )
        })
    }

}