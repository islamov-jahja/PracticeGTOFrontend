import {Table} from "../../components/table";
import * as React from "react";
import {Transport} from "../../services/transport";
import {AxiosError, AxiosResponse} from "axios";
import {IGetUserInfoResponse, ICompetitionResult} from "../../services/transport/responses";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {UserResultStore} from "./UserResultStore";
import {get} from "lodash";
import "./UserResult.scss";

@autobind
@observer
export class UserResult extends React.Component {
    private readonly transport: Transport;
    private readonly store = new UserResultStore();

    constructor(props: {}) {
        super(props);
        this.transport = new Transport();
    }

    componentDidMount(): void {
        const id = window.location.pathname.split("/")[2];
        this.transport.getParticipantInfo(id).then(this.onSuccess).catch(this.onError)
    }

    private onSuccess(response: AxiosResponse<IGetUserInfoResponse>): void {
        const data = get(response, "data");
        const result = get(data, "message");
        this.store.data = result.map((item: ICompetitionResult) => {
            const date = item.date_of_competition.split("T")[0];
            return {
                data: {
                    ...item,
                    date_of_competition: date
                },
                isVisible: true,
            }
        })
    }

    private onError(error: AxiosError): void {
        if (!error.response) {
            return;
        }
        this.store.error = error.response.data.title;
    }

    render(): React.ReactNode {
        return (
            <div className={"user-result"}>
                {
                    this.store.error !== ""
                        ? (
                            <div className={"error"}>
                                {this.store.error}
                            </div>
                        )
                        : <Table columns={this.store.columns} data={this.store.data}/>
                }
            </div>
        )
    }
}