import React from "react";
import { Navbar } from '../components/navbar'
import { Link } from 'react-router-dom'
export class About extends React.Component {
    render() {
        return (
            <>
                <div className="container"
                style={{
                    color: "white"
                }}
                >
                    <h1>Profile</h1>
                    <div className="displayData">
                        <h2>John Keller</h2>
                        <h3>Homme 35kg 185cm</h3>
                        <button>Modifier</button>
                    </div>
                    <div>
                        <h3>Dark Mode</h3>
                    </div>
                    <div>
                        <h3>Notifications</h3>
                        <h3>Privacy</h3>
                        <h3>Security</h3>
                    </div>
                    <div>
                        <h3>Account</h3>
                        <h3>Aid</h3>
                        <h3>About</h3>
                    </div>
			        <Link to="/logout">Deconnection</Link>
                </div>
                <Navbar />
            </>
        )
    }
}