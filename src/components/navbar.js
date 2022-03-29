import React from 'react'
import Icon from '@mdi/react'
import { Link } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction} from '@mui/material'

import {
	mdiHome,
	mdiAccount,
} from '@mdi/js'


export class Navbar extends React.Component {
    render() {
        return (
            <BottomNavigation style={{
                width: "100%",
                justifyContent: "space-evenly",
                background: "rgba(0, 0, 0, .44)",
                marginBottom: "var(--nav-margin)"
            }}>
                <BottomNavigationAction style={{paddingTop: "8px"}} component={Link} to="/" icon={<Icon path={mdiHome} size={1.5} color='var(--primary)'/>} />
                <BottomNavigationAction style={{paddingTop: "8px"}} component={Link} to="/about" icon={<Icon path={mdiAccount} size={1.5} color='var(--primary)'/>} />
            </BottomNavigation>
        )
    }
}