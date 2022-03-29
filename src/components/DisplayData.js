import React from 'react'
import Icon from '@mdi/react'

export class DisplayData extends React.Component {
    render() {
        const { icon, img, value, title, goal, loaded, component, clickHandler } = this.props
        return (
            <div className={`displayData ${loaded == false && "is-loading"} ${clickHandler !== undefined && "clickable"}`} onClick={clickHandler}>
                {icon !== "" && <Icon path={icon} size={1} color='var(--primary)' />}
                {img !== "" && <img src={img} height="36px" alt="" color='var(--primary)' />}
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