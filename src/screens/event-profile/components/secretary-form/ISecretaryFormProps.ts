import {AxiosError} from "axios";

export interface ISecretaryFormProps {
    orgId: number;
    eventId: number;

    onSuccess?: () => void;
    onError?: (error: string) => void;
}