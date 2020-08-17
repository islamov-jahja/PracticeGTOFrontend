export interface IPopupProps {
    popupText: string;
    isVisible: boolean;
    isError?: boolean;

    onClose?: () => void;
}