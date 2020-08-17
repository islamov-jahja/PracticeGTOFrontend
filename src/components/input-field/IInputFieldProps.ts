import {ERegExp} from "./ERegExp";
import * as React from "react";

export interface IInputFieldProps {
    defaultValue?: string;
    className?: string;
    type?: string;
    mask?: ERegExp;
    maxLength?: number;
    name?: string;
    placeholder?: string;
    accessKey?: string;
    isReadOnly?: boolean;
    value?: string;
    id?: string;

    onKeyPress?(event: React.KeyboardEvent<HTMLInputElement>): void;

    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;

    setValue?(value: string): void;
}