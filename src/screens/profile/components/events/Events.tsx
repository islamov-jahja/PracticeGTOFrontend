import React from "react";
import {Tabs} from "../../../../components/tabs";
import {EventsList} from "../events-list";
import {EventForm} from "../event-form";

export class Events extends React.Component {
    render(): React.ReactNode {
        return (
            <Tabs
                tabs={[
                    {name: "Добавить мероприятие", isActive: true, component: <EventForm/>},
                    {name: "Показать мои мероприятия", component: <EventsList/>}
                ]}
                classNameHeading = "-links"
            />
        )
    }
}