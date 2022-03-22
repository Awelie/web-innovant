import React from "react";
import { Navbar } from '../components/navbar'

export class About extends React.Component {
    render() {
        return (
            <>
                <div className="fitness-app-container"
                style={{
                    color: "white"
                }}
                >
			        A propos mdr
                </div>
                <Navbar />
            </>
        )
    }
}