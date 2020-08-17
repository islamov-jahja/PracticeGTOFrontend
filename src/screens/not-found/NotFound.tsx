import * as React from "react";

export class NotFound extends React.Component {
    render(): React.ReactNode {
        return (
            <div>
                <p>Page not found</p>
                <a href={"/"}>Go to Home Page</a>
            </div>
        )
    }
}