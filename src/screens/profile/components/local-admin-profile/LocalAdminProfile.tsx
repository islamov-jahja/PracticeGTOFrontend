import React from "react";
import {Tabs} from "../../../../components/tabs";
import {Events} from "../events";

export class LocalAdminProfile extends React.Component {
    render() {
        return (
            <Tabs
                tabs={[
                    {name: "Мероприятия", component: <Events/>, isActive: true}
                ]}
                isMain={true}
            />
        )
    }
}