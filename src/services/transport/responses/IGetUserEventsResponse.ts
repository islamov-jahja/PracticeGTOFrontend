export interface IGetUserEventsResponse {
    id: number,
    idOrganization: number,
    name: string,
    startDate: string,
    expirationDate: string,
    description: string,
    status: string,
    userConfirmed: boolean
}