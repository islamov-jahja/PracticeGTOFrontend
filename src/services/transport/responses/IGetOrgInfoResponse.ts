export interface IGetOrgInfoResponse {
    id: number,
    name: string,
    address: string,
    leader: string,
    phoneNumber: string,
    OQRN: string,
    payment_account: string,
    branch: string,
    bik: string,
    correspondent_account: string,
    countOfAllEvents: number,
    countOfActiveEvents: number
}