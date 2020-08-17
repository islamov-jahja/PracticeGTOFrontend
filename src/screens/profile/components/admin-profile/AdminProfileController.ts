import {CommonProfileController} from "../common-profile/CommonProfileController";
import {AdminProfileStore} from "./AdminProfileStore";
import {autobind} from "core-decorators";
import * as React from "react";

@autobind
export class AdminProfileController extends CommonProfileController {
    protected store: AdminProfileStore;

    constructor(store: AdminProfileStore) {
        super();
        this.store = store;
    }
}