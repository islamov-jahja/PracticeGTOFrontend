import {CommonProfileStore} from "../../../common-profile/CommonProfileStore";
import {IGetOrgsListResponse} from "../../../../../../services/transport/responses";
import {ITableColumn, ITableData} from "../../../../../../components/table";
import {AxiosResponse} from "axios";
import {autobind} from "core-decorators";
import {observable} from "mobx";

@autobind
export class OrgsListStore extends CommonProfileStore {
    @observable orgColumns: ITableColumn[] = [];
    @observable orgData: ITableData[] = [];

    onSuccessGetOrgsList(response: AxiosResponse<IGetOrgsListResponse[]>): void {
        console.log("[ProfileStore.onSuccessGetOrgsList]:", response);
        this.orgData = response.data.map(item => {
            return {
                isVisible: true,
                data: {orgName: item.name, orgAddress: item.address, orgId: item.id}
            }
        });
    }

}