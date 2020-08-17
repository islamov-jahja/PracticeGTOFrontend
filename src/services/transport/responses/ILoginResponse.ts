export interface ILoginResponse {
    accessToken: string,
    refreshToken: string,
    role: string,
    userId: number,
    organizationId?: number
}