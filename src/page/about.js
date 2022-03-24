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
			        <Link to="/logout">Déconnection</Link>
                </div>
                <Navbar />
            </>
        )
    }
}