import * as React from "react";

export interface ITab {
    id?: string;
    name: string;
    component: React.ReactNode;
    isActive?: boolean;
}