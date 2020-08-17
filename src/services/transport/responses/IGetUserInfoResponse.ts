import {ICompetitionResult} from "./ICompetitionResult";

export interface IGetUserInfoResponse {
    data: {
        message: ICompetitionResult[]
    };
}