import {CommonProfileStore} from "./CommonProfileStore";
import {autobind} from "core-decorators";

@autobind
export class CommonProfileController {
    protected store?: CommonProfileStore;
}