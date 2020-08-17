import React from "react";
import {CommonProfile} from "../common-profile";
import {AdminProfileController} from "./AdminProfileController";
import {AdminProfileStore} from "./AdminProfileStore";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {Tabs} from "../../../../components/tabs";
import {Events} from "../events";
import {Organisations} from "./components/organisations";

@autobind
@observer
export class AdminProfile extends CommonProfile {
    protected readonly store = new AdminProfileStore();
    protected readonly controller = new AdminProfileController(this.store);

    render() {
        return (
            <Tabs
                tabs={[
                    {name: "Организации", component: <Organisations/>, isActive: true},
                ]}
                isMain={true}
            />
        )
    }
}