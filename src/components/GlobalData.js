import React from 'react'
import Icon from '@mdi/react'

export class GlobalData extends React.Component {
    render() {
        const { icon, title, goal } = this.props
        return (
            <div className="globalData">
                <Icon path={icon} size={2} color='var(--primary)' />
                <div className="infos">
                    <div className="text">
                        <div className="title">{title}/{goal}</div>
                    </div>
                </div>
            </div>
        )
    }
}