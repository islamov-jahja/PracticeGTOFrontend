export interface IRadioProps {
    values: string[],

    onChange?(value: string): void;
}