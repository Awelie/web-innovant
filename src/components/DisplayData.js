import React from 'react'
import Icon from '@mdi/react'

export class DisplayData extends React.Component {
    render() {
        const { icon, value, title, goal, loaded, component } = this.props
        return (
            <div className={loaded ? "displayData" : "displayData is-loading"}>
                <Icon path={icon} size={1} color='var(--primary)' />
                <div className="infos">
                    <div className="text">
                        <div className="title">{title}</div>
                        <div className="goal">{value} - {goal}</div>
                    </div>
                </div>
                {component}
            </div>
        )
    }
}