import React from 'react'
import Icon from '@mdi/react'
import { Link } from "react-router-dom";

import {
	mdiHome,
	mdiAccount,
} from '@mdi/js'


export class Navbar extends React.Component {
    render() {
        return (
            <nav>
                <Link to="/"><Icon path={mdiHome} size={1.5} color='var(--primary)'/></Link>
                <Link to="/about"><Icon path={mdiAccount} size={1.5} color='var(--primary)'/></Link>
            </nav>
        )
    }
}