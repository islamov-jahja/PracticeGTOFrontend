import * as React from "react";
import {CalculatorStore} from "./CalculatorStore";
import {autobind} from "core-decorators";
import {isNil} from "lodash";
import {EGender} from "./EGender";
import {ICompetitionResult} from "../../services/transport/responses";
import {IGetCalculationResultParams} from "../../services/transport/params";
import {action} from "mobx";

@autobind
export class CalculatorController {
    private readonly store: CalculatorStore;

    constructor(store: CalculatorStore) {
        this.store = store;
    }

    @action
    onSearchButtonClick(): void {
        const res = +this.store.old;
        if (isNil(res) || this.store.old === "") {
            return;
        }
        this.store.inputValues.clear();
        this.store.data.splice(0, this.store.data.length);
        const genderId = this.store.gender === EGender.MALE ? 1 : 0; //TODO: Поправить
        this.store.transport.getTrials({gender: genderId, age: res})
            .then(this.store.onSuccessGetTrials)
            .catch(this.store.onError);
    }

    onKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
        if (event.key != "Enter")
        {
            return;
        }
        this.onSearchButtonClick();
    }

    setOld(value: string): void {
        this.store.old = value;
    }

    onRadioChange(value: string): void {
        this.store.gender = value as EGender;
    }

    onComponentDidMount(): void {
        this.store.transport
            .getCategories()
            .then(this.store.onSuccessGetCategories)
            .catch(this.store.onError);
    }

    onClickVisible(id: string): void {
        this.store.data = this.store.data.map(item => {
            const data = item.data as ICompetitionResult;
            return {
                data,
                isVisible: data.trial_id === id ? false : item.isVisible
            }

        })
    }

    onBlurInput(event: React.FocusEvent<HTMLInputElement>): void {
        const trialId = +event.target.accessKey;
        this.store.inputValues.set(event.target.accessKey, event.target.value);
        const primaryResult = +(event.target.value.replace(",", "."));
        if (isNaN(primaryResult) || event.target.value === "" || isNaN(trialId)) {
            return;
        }
        this.getCalculationResult(trialId, primaryResult);
    }

    private getCalculationResult(trial_id: number, primary_result: number): void {
        this.store.activeId = trial_id;
        const params: IGetCalculationResultParams = {
            primary_result,
            trial_id,
            gender_id: this.store.gender === EGender.MALE ? 1 : 0,
        };
        this.store.transport
            .getCalculationResult(params)
            .then(this.store.onSuccessCalculate)
            .then(this.store.setInputValues)
            .catch(this.store.onError);
    }
}