export interface IEditOrgParams {
    name: string;
    address: string;
    leader: string;
    phoneNumber: string;
    oqrn: string;
    paymentAccount: string;
    branch: string;
    bik: string;
    correspondentAccount: string;
    [key: string]: string;
}