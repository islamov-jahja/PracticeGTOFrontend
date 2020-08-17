import {ERoles} from "../user-store";
import {EFormTypes} from "../../EFormTypes";

export interface IUserFormProps {
    successMessage: string;
    formType: EFormTypes;
    id: number;
    onSuccess?: () => void;
}