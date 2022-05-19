import React from 'react'
import Icon from '@mdi/react'
import { NavLink } from "react-router-dom";

import {
	mdiHome,
	mdiAccount,
} from '@mdi/js'


export class Navbar extends React.Component {
    render() {
        return (
            <nav style={{
                width: "100%",
                justifyContent: "space-evenly",
                background: "rgba(0, 0, 0, .44)",
                marginBottom: "var(--nav-margin)"
            }}>
                <NavLink to="/" activeClassName="active">
                    <Icon path={mdiHome} size={1.5} color='var(--primary)'/>
                </NavLink>
                <NavLink to="/about" activeClassName="active">
                    <Icon path={mdiAccount} size={1.5} color='var(--primary)'/>
                </NavLink>
            </nav>
        )
    }
}