import React from 'react'

export class GlobalData extends React.Component {
    render() {
        const { icon, title, goal } = this.props
        return (
            <div className="globalData">
                <img height="80px" src={icon} alt="global"/>
                <div className="infos">
                    <div className="text">
                        <div className="title">{title}/{goal}</div>
                    </div>
                </div>
            </div>
        )
    }
}