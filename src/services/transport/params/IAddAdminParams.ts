export interface IAddAdminParams {
    name: string,
    email: string,
    dateOfBirth: string,
    gender: number,
    [key: string]: string | number,
}