import * as React from "react";
import {action, computed, observable} from "mobx";
import {ITableData, ITableColumn} from "../../components/table";
import {autobind} from "core-decorators";
import {AxiosError, AxiosResponse} from "axios";
import {get} from "lodash";
import {EGender} from "./EGender";
import {Store} from "../../components/store";
import {
    ICalculateResponse, IGetCategoriesResponse, IGetTrialsResponse,
    ITrial
} from "../../services/transport/responses";
import {IGroup} from "../../services/transport/responses/IGetTrialsResponse";
import {string} from "prop-types";

interface IInputValue {
    accessKey: string,
    value: string,
}
@autobind
export class CalculatorStore extends Store {
    @observable data: ITableData[] = [];
    @observable cell?: (data: object) => React.ReactNode;
    @observable nameCell?: (data: object) => React.ReactNode;
    @observable columns: ITableColumn[] = [];
    @observable gender = EGender.MALE;
    @observable old = "";
    @observable ageCategory = "";
    @observable categories: IGetCategoriesResponse[] = [];
    @observable activeId = -1;
    inputValues = new Map;

    onSuccessGetTrials(response: AxiosResponse<IGetTrialsResponse>): void {
        console.log("CalculatorStore.onSuccessGetTrials", response);
        const data = get(response, "data");
        data.groups.forEach((group: IGroup) => {
            group.group.forEach((trial: ITrial) => {
                this.data.push({data: trial, isVisible: true})
            })
        });
        this.ageCategory = data.ageCategory;
    }

     onSuccessCalculate(response: AxiosResponse<ICalculateResponse>): void {
        console.log("CalculatorStore.onSuccessCalculate", response);
         let newData = this.data.map((item => {
            let line = item.data as ITrial;
            if (line.trialId != this.activeId) {
                return item;
            }
            line.secondResult = response.data.secondResult;
            return {data: line, isVisible: true};
        }));
         this.data.splice(0, this.data.length);
         newData.forEach(item => this.data.push(item))
     }

    onSuccessGetCategories(response: AxiosResponse<IGetCategoriesResponse[]>): void {
        this.categories = response.data;
    }

    setInputValues(): void {
        this.inputValues.forEach((value, key) => {
            let input = document.getElementById(`input-${key}`) as HTMLInputElement;
            if (!input) {
                return;
            }
            input.value = value;
        })
    }
}