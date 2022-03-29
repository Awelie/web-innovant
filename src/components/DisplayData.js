import React from 'react'
import Icon from '@mdi/react'

export class DisplayData extends React.Component {
    render() {
        const { icon, value, title, goal, loaded, component, clickHandler } = this.props
        return (
            <div className={loaded ? "displayData" : "displayData is-loading"} onClick={clickHandler}>
                <Icon path={icon} size={1} color='var(--primary)' />
                <div className="infos">
                    <div className="text">
                        <div className="title">{title}</div>
                        {value !== "" && goal !== "" && <div className="goal">{value} - {goal}</div>}
                    </div>
                </div>
                {component}
            </div>
        )
    }
}