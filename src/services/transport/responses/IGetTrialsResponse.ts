export interface ITrial {
    trialName: string;
    resultForBronze: number;
    resultForSilver: number;
    resultForGold: number;
    trialId: number;
    secondResult?: number;
    typeTime?: boolean;
    firstResult?: number;
}

export interface IGetTrialsResponse {
    groups: IGroup[]
    ageCategory: string;
}

export interface IGroup {
    necessary: boolean;
    group: ITrial[]
}