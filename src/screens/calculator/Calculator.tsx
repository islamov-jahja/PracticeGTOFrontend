import * as React from "react";
import {InputField} from "../../components/input-field";
import {Radio} from "../../components/radio-button";
import "./Calculator.scss";
import {ERegExp} from "../../components/input-field/ERegExp";
import {CalculatorController} from "./CalculatorController";
import {Table} from "../../components/table";
import {CalculatorStore} from "./CalculatorStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {get} from "lodash";
import {ICompetitionResult, ITrial} from "../../services/transport/responses";
import {EGender} from "./EGender";
import "react-selectize/themes/index.css";

@autobind
@observer
export class Calculator extends React.Component {
    private readonly store = new CalculatorStore();
    private readonly controller = new CalculatorController(this.store);

    componentDidMount(): void {
        this.store.cell = this.setCell;
        this.store.nameCell = this.setNameCell;
        this.setColumns();
    }

    setColumns(): void {
        this.store.columns = [
            {accessor: "trialName", title: "Соревнование", className: "name", cell: this.store.nameCell},
            {accessor: "resultForGold", title: "золото"},
            {accessor: "resultForSilver", title: "серебро"},
            {accessor: "resultForBronze", title: "бронза"},
            {accessor: "primary_result", title: "Первичный результат", cell: this.store.cell},
            {accessor: "secondResult", title: "Приведенный результат"}
        ]
    }

    render(): React.ReactNode {
        return (
            <div className={"calculator"}>
                <div className={"calculator__user-data"}>
                    <div className={"gender"}>
                        <span>Пол: </span>
                        <Radio values={[EGender.MALE, EGender.FEMALE]} onChange={this.controller.onRadioChange}/>
                    </div>
                    <label>Возраст:
                        <InputField
                            mask={ERegExp.ONLY_NUMBERS}
                            maxLength={3}
                            setValue={this.controller.setOld}
                            onKeyPress={this.controller.onKeyPress}
                        />
                        (полных лет)
                    </label>
                    <div className={"button"} onClick={this.controller.onSearchButtonClick}>Получить</div>
                    {
                        this.store.ageCategory
                            ? (
                                <div className={"age-category"}>
                                    Ваша возрастная ступень: {this.store.ageCategory}
                                </div>
                            )
                            : void 0
                    }
                </div>
                <Table columns={this.store.columns} data={this.store.data}/>
            </div>
        )
    }

    private getOptions(): { value: string, label: string }[] {
        const res: { value: string, label: string }[] = [];
        this.store.categories.forEach(item => {
            const genderId = this.store.gender === EGender.MALE ? 1 : 2;
            if (item.gender_id === genderId) {

            }
        });
        return res;
    }

    private setNameCell(data: object): React.ReactNode {
        const result = get(data, "data") as ICompetitionResult;
        return (
            <div
                className={"visible-control"}
                onClick={() => this.controller.onClickVisible(result.trial_id)}
            >
                Скрыть
            </div>
        )
    }

    private setCell(data: object): React.ReactNode {
        const result = get(data, "data") as ITrial;
        return (
            <InputField
                onBlur={this.controller.onBlurInput}
                placeholder={"Введите"}
                accessKey={result.trialId.toString()}
                mask={ERegExp.ONLY_DOUBLE}
                maxLength={10}
                id={`input-${result.trialId}`}
            />
        )
    }
}