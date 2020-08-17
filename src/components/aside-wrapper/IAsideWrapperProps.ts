import * as React from "react";

export interface IAsideWrapperProps {
    component: React.ReactNode;
    isVisible: boolean;
    title: string;

    onClose?: () => void;
    onShow?: () => void;
}