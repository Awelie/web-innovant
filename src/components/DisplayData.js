import React from 'react'
import Icon from '@mdi/react'
import { CircularProgressWithLabel } from './atom/CircularProgressWithLabel'

export class DisplayData extends React.Component {
    render() {
        const { icon, value, percentage, title, goal } = this.props
        return (
            <div className="displayData">
                <Icon path={icon} size={1} color='var(--primary)' />
                <div className="infos">
                    <div className="text">
                        <div className="title">{title}</div>
                        <div className="goal">{value} - {goal}</div>
                    </div>
                </div>
                <CircularProgressWithLabel value={percentage} />
            </div>
        )
    }
}