import React from "react";
import {CommonProfileController} from "./CommonProfileController";
import {CommonProfileStore} from "./CommonProfileStore";
import {autobind} from "core-decorators";

@autobind
export class CommonProfile extends React.Component {
    protected readonly store = new CommonProfileStore();
    protected readonly controller = new CommonProfileController();

    componentDidMount(): void {
    }
}