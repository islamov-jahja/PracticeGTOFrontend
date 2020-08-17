import * as React from 'react';
import {Route, Switch} from "react-router";
import {BrowserRouter} from 'react-router-dom';
import {Home} from "./screens/home";
import {NotFound} from "./screens/not-found";
import {Header} from "./components/header";
import "./App.scss";
import {UserResult} from "./screens/user-result";
import {Login} from "./screens/login/Login";
import {Profile} from "./screens/profile";
import {Calculator} from "./screens/calculator";
import {EPath} from "./EPath";
import {EventProfile} from "./screens/event-profile";
import {OrganisationProfile} from "./screens/organisation-profile";
import {ConfirmRegistration} from "./screens/confirm-registration";
import {Registration} from "./screens/registration";
import {AllEvents} from "./screens/all-events";
import {TeamProfile} from "./screens/team-profile";

class App extends React.Component {
    render(): React.ReactNode {
        return (
            <>
                {<Header/>}
                <BrowserRouter>
                    <Switch>
                        <Route exact path={EPath.HOME} component={Home}/>
                        <Route exact path={EPath.LOGIN} component={Login}/>
                        <Route exact path={EPath.PROFILE} component={Profile}/>
                        <Route exact path={EPath.CONFIRM_REGISTRATION} component={ConfirmRegistration}/>
                        <Route exact path={EPath.REGISTRATION} component={Registration}/>
                        <Route path={EPath.USER_RESULT} component={UserResult}/>
                        <Route path={EPath.CALCULATOR} component={Calculator}/>
                        <Route path={EPath.EVENT_PROFILE} component={EventProfile}/>
                        <Route path={EPath.TEAM_PROFILE} component={TeamProfile}/>
                        <Route path={EPath.ORGANISATION_PROFILE} component={OrganisationProfile}/>
                        <Route path={EPath.EVENTS} component={AllEvents}/>
                        <Route component={NotFound}/>
                    </Switch>
                </BrowserRouter>
                {/*<Footer/>*/}
            </>
        );
    }
}

export default App;
