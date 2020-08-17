import * as React from "react";
import {ERoles, UserStore} from "../../components/user-store";
import Select from "react-select";
import "./Profile.scss";
import {autobind} from "core-decorators";
import {observer} from "mobx-react";
import {EPath} from "../../EPath";
import {AdminProfile} from "./components/admin-profile";
import {LocalAdminProfile} from "./components/local-admin-profile";
import {UserProfile} from "./components/user-profile";
import {SecretaryProfile} from "./components/secretary-profile";
import {render} from "react-dom";
import {CoachProfile} from "./components/coach-profile";
import {ProfileStore} from "./ProfileStore";

@autobind
@observer
export class Profile extends React.Component {
    private readonly store = new ProfileStore();

    componentDidMount(): void {
        this.store.transport
            .getUserProfileInfo()
            .then(this.store.onSuccess)
            .catch(this.store.onError);
    }

    render(): React.ReactNode {
        if (!UserStore.getInstance().isLogin()) {
            window.location.replace(EPath.LOGIN);
            return void 0;
        }
        let profile: React.ReactNode = <div/>;
        switch (localStorage.getItem("role")) {
            case ERoles.ADMIN:
                profile = <AdminProfile/>;
                break;
            case ERoles.LOCAL_ADMIN:
                profile = <LocalAdminProfile/>;
                break;
            case ERoles.USER:
                profile = <UserProfile/>;
                break;
            case ERoles.SECRETARY:
                profile = <SecretaryProfile/>;
                break;
            case ERoles.COACH:
                profile = <CoachProfile/>;
                break;
            default:
                profile = <div/>;
        }

        return (
            <div className={"container profile"}>
                <h2 className={"profile-info-item"}>{this.store.name}</h2>
                <p className={"profile-info-item"}>{UserStore.getInstance().role}</p>
                {profile}
            </div>
        )
    }
}