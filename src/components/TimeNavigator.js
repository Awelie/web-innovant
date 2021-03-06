import React from 'react'
import Icon from '@mdi/react'

import {
	mdiArrowLeft,
	mdiArrowRight
} from '@mdi/js'

export class TimeNavigator extends React.Component {
    render() {
        const { date, after, before, changeState } = this.props;
        let d = new Date(date);
        let months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        return (
            <div className="timeNavigator">
                {before ? <Icon path={mdiArrowLeft} size={1} color='var(--primary)' onClick={() => changeState(+1)}/> : <div style={{minWidth: "24px",minHeight: "24px"}}></div>}
                <div>{d.getDate()} {months[d.getMonth()]} {d.getFullYear()}</div>
                {after ? <Icon path={mdiArrowRight} size={1} color='var(--primary)' onClick={() => changeState(-1)}/> : <div style={{minWidth: "24px",minHeight: "24px"}}></div>}
            </div>
        )
    }
}