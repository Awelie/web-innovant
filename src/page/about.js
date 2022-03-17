import React from "react";

export class About extends React.Component {
    constructor(props) {
        super(props);
		this.state = {
			data: {},
			user: {},
			selected: null,
			loaded: false,
		};
		//this.getData();
		this.getData.bind(this)
    }
 
    render() {
        return (
            <div className="fitness-app">
			lol
            </div>
        )
    }
}