export interface IAddEventParams {
    name: string,
    startDate: string,
    expirationDate: string,
    description: string

    [key:string]: string;
}